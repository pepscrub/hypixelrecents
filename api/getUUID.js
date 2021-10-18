const express = require('express');
const router = express.Router();
const baseURL = `https://api.mojang.com/users/profiles/minecraft/`;
const fetch = require('node-fetch')


router.get('/', (req, res, next)=>
{
    throw Error('No username was supplied. Usage: api/v1/uuid/username');
})

/**
 * @swagger
 * /api/v1/uuid:
 *  get: 
 *      description: Use to get UUID connected to the players username
 *      responses:
 *          '200':
 *              description: Sucessfully was able to get the player ID.
 *          '400':
 *              description: Unable to get the player ID or some error occured.
 */
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
