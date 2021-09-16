const express = require('express');
const router = express.Router();
const getuuid = require('./getUUID');
const playerData = require('./playerData');
const searches = require('./searches');
const head = require('./head');
const randomface = require('./randomface');
const middlewares = require('./middlewares');

router.get('/', (req, res)=>
{
    res.json({
        message: "API Hello World"
    });
});

router.use('/uuid', getuuid)
router.use('/player', playerData.router)
router.use('/searches', searches)
router.use('/head', head)
router.use('/reaction', randomface)

router.use(middlewares.notFound);
router.use(middlewares.errorHandler);

module.exports = router;