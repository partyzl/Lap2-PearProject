const express = require('express');
const cors = require('cors');
const { json } = require('express');

const server = express();

server.use(cors());
server.use(express(json));

const postRoutes = require('./controllers/posts');

server.use('/post', postRoutes);

// Root route
server.get('/', (req, res) => res.send('Hello, world!'));

// Routes for read by id and new posts
server.get('/:id', postRoutes.getById);
server.post('/new', postRoutes.create);

module.exports = server;
