const express = require('express');
const cors = require('cors');
const { json } = require('express');

const server = express();

server.use(cors());
server.use(express.json());

// Root route
server.get('/', (req, res) => res.send('Hello, world!'));

const postRoutes = require('./controllers/post');

server.use('/post', postRoutes);

module.exports = server;