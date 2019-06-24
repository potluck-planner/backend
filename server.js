const express = require('express');
const server = express();
const helmet = require('helmet');
const userRouter = require('./users/usersRouter');
const eventRouter = require('./event/eventRouter');

server.use(helmet());
server.use(express.json());

server.use('/users', userRouter);
server.use('/event', eventRouter);

module.exports = server;