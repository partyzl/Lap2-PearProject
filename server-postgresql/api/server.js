const express = require('express');
const cors = require('cors');
const postRoutes = require('./Controllers/posts.js');

const server = express();
server.use(cors());
server.use(express.json());

server.use('/posts', postRoutes);

server.get('/', (req, res) => res.send('Hello, world!'));

module.exports = server;
