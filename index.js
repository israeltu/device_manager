const express = require("express");
const app = express();
require("dotenv").config();
const gracefulShutdown = require('http-graceful-shutdown');
const health = require("./routes/health_route.js");
const devices= require("./routes/devices_route.js");
const _=require("lodash");

validateEnvParams();
configureServer();
initServer();

function configureServer() {
    app.use(express.json());
    app.use("/health", health);
    app.use("/devices", devices);
}

function initServer() {
    const port = process.env.HTTP_PORT;
    server = app.listen(port, () => console.log(`Listening on port ${port}`));
    // this enables the graceful shutdown with advanced options
    gracefulShutdown(server,
        {
            signals: 'SIGINT SIGTERM',
            timeout: 5000,
            development: false,
            forceExit: true,
            finally: () => (console.log('The server was shutdown gracefully')),
        }
    );
}

function validateEnvParams() {
    if (!process.env.HTTP_PORT || !process.env.DEVICES_JSON || !process.env.CRANES_JSON) {
        console.log('one or more environment variable is missing, exiting system');
        process.exit(1);
    }
}
