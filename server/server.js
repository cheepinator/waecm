"use strict";

if (process.env.NODE_ENV === "production")
  require("newrelic");

const PORT = process.env.PORT || 3333;

const os = require("os");
const http2 = require("spdy");
const express = require("express");
const fs = require("fs");
const RoutesConfig = require("./config/routes.conf");
const DBConfig = require("./config/db.conf");
const Routes = require("./routes/index");

const cors = require('cors');
const bodyParser = require('body-parser');

const socketioServer = require('socket.io');

const app = express();


let io;
let getIOInstance = function(){
  return io;
};

const opts = {
  key: fs.readFileSync(__dirname + "/cert/server.key"),
  cert: fs.readFileSync(__dirname + "/cert/server.crt")
};


const server = http2.createServer(opts, app);

io = socketioServer.listen(server);
io.on('connection', function(socket) {
  console.log('a user connected');
});

server.listen(PORT, () => {
  console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
  console.log(`enviroment: ${process.env.NODE_ENV}`);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

RoutesConfig.init(app);
DBConfig.init();
Routes.init(app, express.Router(),getIOInstance);

//todo

module.exports = server;
