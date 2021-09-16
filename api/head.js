const express = require('express');
const router = express.Router();
const baseURL = `https://crafatar.com/avatars/`;
const fetch = require('node-fetch');
const {DB} = require('./playerData')
const url = require('../index').config.NODE_ENV === 'dev' ? 'http://localhost:8080' : `http://hypixel.freeman.dev/`;

router.get('/', (req, res, next)=>
{
    next(new Error("No username was supplied. Usage: api/v1/uuid/username"))
})

router.get('/:uuid', async(req, res, next)=>
{
    if(!DB.connected()) return res.json({"error": "Connecting to DB"})
    try
    {
        let uuid = req.params.uuid;

        const valid = /([0-9A-Z]{32})/i.test(uuid);
        if(!valid)
        {
            console.log(url)
            let fetchuuid = await fetch(`${url}/api/v1/uuid/${uuid}`).then(res=>res.json())

            uuid = fetchuuid['id']
        }

        if(!uuid) throw Error('uuid does not exist')

        const cursor = await DB.tablequery("heads", {uuid: uuid});
        const data = await cursor.toArray();
        const arr = data[0] !== undefined ? data[0]['data']['buffer'] : await fetch(`${baseURL}${uuid}`).then(res=>res.buffer());

        if(!data[0])
        {
            DB.insertinto("searches", {name: req.params.uuid,id: uuid, timestamp: Date.now(), head: arr});
            DB.insertinto("heads", {uuid: uuid, data: arr})
        }
        
        if(!data[0]) DB.insertinto("heads", {uuid: uuid, data: arr})
        res.json({blob: arr})
    }catch(error)
    {
        next(error)
    }
})

module.exports = router;