const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const userRouter = require('./users/usersRouter');
const eventRouter = require('./event/eventRouter');
const authRouter = require('./auth/authRouter');
const verifyLogin = require('./auth/verifyLogin');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/users', authRouter);
server.use('/users', verifyLogin, userRouter);
server.use('/event', verifyLogin, eventRouter);

module.exports = server;
