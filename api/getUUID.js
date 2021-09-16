const express = require('express');
const router = express.Router();
const baseURL = `https://api.mojang.com/users/profiles/minecraft/`;
const fetch = require('node-fetch')

router.get('/', (req, res, next)=>
{
    throw Error('No username was supplied. Usage: api/v1/uuid/username');
})

router.get('/:username', async(req, res, next)=>
{
    try
    {
        const data = await fetch(`${baseURL}${req.params.username}`).then(res=>res.json());
        res.json(data)
    }catch(error)
    {
        next(error);
    }
})

module.exports = router;
