const express = require('express');
const server = express();
const helmet = require('helmet');

server.use(helmet());
server.use(express.json());

module.exports = server;
