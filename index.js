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
const port = 8080;

module.exports.config = {
    APIKEY: "f2b0c24f-916f-47be-bd62-fbab213699ae",
    DBPASS: "4c7gFDdn6u7ieWJYe72VZedd9auZB6xb2vaVpKDecTU6v2x5rUo",
    DBNAME: "cummuncher6942069",
    DBCLUSTER: "hypixelapi",
    PORT: 8080,
    NODE_ENV: "dev"
};


const api = require('./api')


const server = app.listen(port, ()=>{
    console.log(color.blue.bold(`[nodeJS]`), `Server is listening on port: ${port}`);
});

app.use(express.static(path.join(__dirname, "/build")))
// Basic web server setup (serves static files)
app.set('trust proxy', 1);
// app.use(morgan('dev'));
// app.use(helmet());
// app.use(cors());

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