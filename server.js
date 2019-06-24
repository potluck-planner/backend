const express = require('express');
const server = express();
const helmet = require('helmet');
const userRouter = require('./users/usersRouter');

server.use(helmet());
server.use(express.json());

server.use('/users', userRouter);

module.exports = server;