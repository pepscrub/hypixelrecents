const e = require('express');
const express = require('express');
const router = express.Router();
const { DataBase } = require('../db');
const DB = new DataBase();
const {config} = require('../index');

console.log(config)

const key = config.APIKEY;
const url = config.NODE_ENV === 'dev' ? 'http://localhost:8080/' : `http://freeman.dev/`;

const fetch = require('node-fetch')
const baseURL = `https://api.hypixel.net/recentgames?`;

const cacheRefresh = 60 * 60 * 1000 // 1 hour

let dbConnected = false;

let whitelist = null;
DB.conn().then(async ()=>
{
    const coll = await DB.tablequery("settings");
    if(!coll) process.exit(-1);
    const doc = await coll.toArray();

    whitelist = doc[0]['whitelist'];
    dbConnected = true;
}).catch(err=>
{
    // Can't connect to DB no point
    // booting up
    process.exit(-27);
})

// Rate limiting
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const limiter = rateLimit({
    windowMs: config.NODE_ENV === 'dev' ? 0 : 1 * 60 * 1000, // 1 minute
    max: config.NODE_ENV === 'dev' ? 9999 : 6
})
// Speed limiting (1500ms per request a minute)
const speedLimiter = slowDown({
    windowMs: config.NODE_ENV === 'dev' ? 0 : 1 * 60 * 1000,
    delayAfter: config.NODE_ENV === 'dev' ? 0 : 1,
    delayMs: config.NODE_ENV === 'dev' ? 0 : 250
})

setInterval(()=>
{
    console.log("cleared cache");
    if(!dbConnected) return;
    DB.deletemany("cachedData", {"timestamp": {$lt: Date.now()}})
    DB.deletemany("cachedPlayedGames", {"timestamp": {$lt: Date.now()}})
}, cacheRefresh)

const checkCached = async (uuid) =>{
    const prevDataCursor = await DB.tablequery("cachedData", {uuid: uuid});
    const prevData = await prevDataCursor.toArray();
    return prevData[0];
}

const valid_uuid = async (uuid) =>
{
    const valid = /([0-9A-Z]{32})/i.test(uuid)
    if(!valid) 
    {
        const nameExistsCursor = await DB.tablequery("searches", {name: uuid});
        const nameExists = await nameExistsCursor.toArray();
        const data = nameExists[0] ? nameExists[0] : await fetch(`${url}api/v1/uuid/${uuid}`).then(res=>res.json());
        if(!nameExists[0])
        {
            const head = await fetch(`${url}api/v1/head/${data.id}`).then(res=>res.buffer());
            DB.insertinto("searches", {name: uuid,id: data.id, timestamp: Date.now(), head: head});
        }
        return data.id;
    }
    return uuid
}

const getOnline = async (uuid) =>
{
    const active = await fetch(`https://api.hypixel.net/status?key=${key}&uuid=${uuid}`).then(res=>res.json()).then(res=>res['session']);
    const data = await fetch(`${baseURL}key=${key}&uuid=${uuid}`).then(res=>res.json()).then(res=>res['games']);
    return [[{active,uuid:uuid}].flat(), data].flat();
}

const getgames = async (id1, id2) =>
{
    const cachedId1 = await checkCached(id1)
    const cachedId2 = await checkCached(id2)

    const data1 = cachedId1 !== undefined ? cachedId1['data'] : await getOnline(id1);
    const data2 = cachedId2 !== undefined ? cachedId2['data'] : await getOnline(id2);

    if(!cachedId1) DB.insertinto("cachedData", {uuid: id1, timestamp: Date.now(), data:data1});
    if(!cachedId2) DB.insertinto("cachedData", {uuid: id2, timestamp: Date.now(), data:data2});

    return [data1, data2];
}

const checkgames = async(games) =>
{
    const a = games[0].length > games[1].length ? 0 : 1;
    const b = a == 0 ? 1 : 0;
    const online = [];
    const bedwars = [];
    const arcade = [];
    const other = []
    const url = `https://sessionserver.mojang.com/session/minecraft/profile/`

    if(games[b].length <= 0 ) return [];

    online.push({
        active: games[a][0]['active'],
        name: await fetch(`${url}${games[a][0]['uuid']}`).then(res=>res.json()).then(res=>res['name'])
    })
    online.push({
        active: games[b][0]['active'],
        name: await fetch(`${url}${games[b][0]['uuid']}`).then(res=>res.json()).then(res=>res['name'])
    })

    await new Promise((res, rej)=>
    {
        games[a].map((k,i)=>{
            if(i === 0) return;
            games[b].map((m,l)=>
            {
                if(l === 0) return;
                if(
                    k['date'] == m['date'] &&
                    k['gameType'] == m['gameType'] &&
                    k['map'] == m['map'] &&
                    k['ended'] == m['ended']
                )
                {
                    if(m['gameType'] == 'BEDWARS') return bedwars.push(k);
                    else if(m['gameType'] == 'ARCADE') return arcade.push(k);
                    else return other.push(k);
                }
            });
            if(i === games[b].length-1) res();
        })
    })
    bedwars.sort((a,b)=>{return b['date'] - a['date']})
    arcade.sort((a,b)=>{return b['date'] - a['date']})
    other.sort((a,b)=>{return b['date'] - a['date']})
    return [online, bedwars, arcade, other];
}

router.get('/', async(req,res)=>
{
    res.json({error: "invalid input"})
})

router.get('/:id', limiter, speedLimiter, async(req, res, next)=>
{
    const url = `https://sessionserver.mojang.com/session/minecraft/profile/`
    if(!dbConnected) return next(new Error('DB is connecting'))
    let uuid = await valid_uuid(req.params.id);
    if(!uuid) return next(new Error(`User's account does not exist in mojang database`));

    const params = new URLSearchParams({
        key: key,
        uuid: uuid,
    })

    try
    {
        // Check DB for the cached data
        const prevData = await checkCached(uuid)
        const data_ = async () =>
        {
            if(prevData !== undefined) return prevData['data'];
            const dummy = [];
            const active = await fetch(`https://api.hypixel.net/status?key=${key}&uuid=${uuid}`).then(res=>res.json())
            const prev = await fetch(`${baseURL}${params}`).then(res=>res.json()).then(res=>res['games'])
            dummy.push(active['session']);
            dummy.push(prev);
            return dummy.flat()
        }
        const data = await data_();
        // Insert new data if there is none
        if(!prevData) DB.insertinto("cachedData", {uuid: uuid, timestamp: Date.now(), data:data});
        const name = await fetch(`${url}${uuid}`).then(res=>res.json()).then(res=>res['name']);
        const online = [];
        const bedwars = [];
        const arcade = [];
        const other = [];

        data.map(async (game, i)=>
        {
            console.log(game)
            if(game['online'] !== undefined) return online.push({name: name,active: game})
            if(game['gameType'] == 'BEDWARS') bedwars.push(game)
            else if(game['gameType'] == 'ARCADE') arcade.push(game);
            else other.push(game)
        })
        bedwars.sort((a,b)=>{return b.date-a.date})
        arcade.sort((a,b)=>{return b.date-a.date})
        other.sort((a,b)=>{return b.date-a.date})

        res.json([online, bedwars, arcade, other])
    }catch(error)
    {
        next(error);
    }
})

router.get('/:id1/:id2', limiter, speedLimiter, async(req, res, next)=>
{
    if(!dbConnected) return res.json({error: "db is connecting"});
    
    const {id1, id2} = req.params;

    const uuid1 = await valid_uuid(id1);
    const uuid2 = await valid_uuid(id2);

    if(!uuid1) next(new Error(`User ${uuid1} does not exist`));
    if(!uuid2) next(new Error(`User ${uuid1} does not exist`));

    // hahaha funny whitelist go brrrr
    // added random delay to response time
    // to obfuscate the fact we're whitelisting
    whitelist.map((wl,i)=>
    {
        if(
            (wl[0] == uuid1 || wl[0] == uuid2) &&
            (wl[1] == uuid2 || wl[1] == uuid2)
        )
        setTimeout(()=>
            {
                res.json([[],[],[],[]]);
        }, (Math.random() * (10000,3000) + 3000))
        return;
    })

    const allgames = await getgames(uuid1, uuid2);

    // const cache = cachedPlayedgames.find(e=>(e.uuid1 == uuid1 || e.uuid1 == uuid2) && (e.uuid2 == uuid2 || e.uuid2 == uuid1));
    const cacheCursor = await DB.tablequery("cachedPlayedGames", 
    {$and: [
        {
            $or: [{uuid1: uuid1}, {uuid2: uuid1}]
        },
        {
            $or: [{uuid1: uuid2}, {uuid2: uuid2}]
        }
    ]});
    const cache = await cacheCursor.toArray()[0];


    if(cache)
    {
        res.json(cache['data'])
    }
    else
    {
        const gamestogether = await checkgames(allgames);
        DB.insertinto("cachedPlayedGames", {uuid1: uuid1, uuid2: uuid2, timestamp: Date.now(), data:gamestogether});
        res.json(gamestogether);
    }
})


module.exports.limiter = limiter;
module.exports.speedLimiter = speedLimiter;
module.exports.router = router;
module.exports.DB = DB;
module.exports.dbConnected = dbConnected;