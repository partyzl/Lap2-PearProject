const router = require('express').Router();
const Post = require('../Models/Post.js');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.all;
        res.json({posts});
    } catch(err) {
        console.error(err);
        res.status(500).json({err});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(parseInt(req.params.id));
        res.json(post);
    } catch(err) {
        console.error(err);
        res.status(404).json({err});
    }
});

router.post('/', async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.json(post);
    } catch(err) {
        console.error(err);
        res.status(404).json({err});
    }
});


module.exports = router;
