const express = require('express');
const router = express.Router();

function notFound(req, res, next)
{
    res.status(404);
    const error = new Error(`Not found - ${req.originalUrl}`);
    next(error);
}

function errorHandler(err, req, res, next)
{
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    // Some code so we don't spit out error codes
    // in production
    res.json({
        status: "error",
        message: err.message,
        stack: process.env.NODE_ENV !== 'dev' ? 'uh oh' : err.stack
    });
}

module.exports = {
    notFound,
    errorHandler
}
