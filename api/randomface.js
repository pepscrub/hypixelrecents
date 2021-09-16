const express = require('express');
const router = express.Router();
const {DB, speedLimiter, limiter} = require('./playerData');


router.get('/', async(req,res)=>
{
    if(!DB.connected()) return res.json({"error":"connecting to DB"});
    const cursor = await DB.tablequery(`settings`);
    const array = await cursor.toArray();

    const face = array[0]['faces'][Math.floor(Math.random() * array[0]['faces'].length)];
    const reaction = array[0]['reactions'][Math.floor(Math.random() * array[0]['reactions'].length)];
    res.json({"face":face,"reaction":reaction})
})

module.exports = router
