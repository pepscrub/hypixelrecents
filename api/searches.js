const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const url = require('../index').config.NODE_ENV === 'dev' ? 'http://localhost:8080/' : `http://hypixel.freeman.dev/`;
const {DB, speedLimiter, limiter} = require('./playerData');


router.get('/', speedLimiter, limiter, async (req, res)=>
{
    if(!DB.connected()) return res.json({"error": "connecting to DB"});
    const cursor = await DB.tablequery("searches");
    const array = await cursor.toArray();

    const out = {};

    array.map(async (k,i)=>
    {
        const name = k.name;
        const head = k['head']['buffer'] || await fetch(`${url}api/v1/head/${name}`).then(res=>res.buffer());
        out[name] = !head ? null : 'data:image/jpg;base64,'+Buffer.from(head).toString('base64');
    })
    res.json(out);
})
module.exports = router;