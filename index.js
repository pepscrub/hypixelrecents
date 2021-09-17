require('dotenv').config();
const express = require('express');           // HTTP server module
const app = express();                        // HTTP server entry point
const color = require('chalk');               // Colored terminal (used for errors primarily)
const morgan = require('morgan');             // Man in the middle
const helmet = require('helmet');             // input parser
const cors = require('cors');
const mongo = require('mongodb');
const middlewares = require('./api/middlewares');
const path = require('path');

module.exports.config = {
    APIKEY: process.env.APIKEY,
    DBPASS: process.env.DBPASS,
    DBNAME: process.env.DBNAME,
    DBCLUSTER: process.env.DBCLUSTER,
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || "production"
};

const api = require('./api')

console.log(this.config.PORT)

const server = app.listen(this.config.PORT, ()=>{
    console.log(color.blue.bold(`[nodeJS]`), `Server is listening on port: ${this.config.PORT}`);
});

app.use(express.static(path.join(__dirname, "/build")))
// Basic web server setup (serves static files)
app.set('trust proxy', 1);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/api/v1', api)

app.get('/*', (req, res) =>{
    console.log(path.join(__dirname, '../frontend/build/index.html'))
    // res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    res.sendFile(path.join(__dirname, '/build/index.html'));
})

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = {
    app
};