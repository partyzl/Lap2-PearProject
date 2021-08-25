const Post = require('../models/Post');

const router = require('express').Router();

router.get('/', async(req, res)=>{
    try {
        const posts = await Post.all;
        res.status(200).json({posts});
    } catch (error) {
        console.warn("Could not find the posts you are looking for");
        res.status(500).json({error})
    }
})

router.get('/:id', async(req, res)=>{
    try {
        const post = await Post.getById(req.params.id);
        res.status(200).json({post});
    } catch (error) {
        console.warn("Could not find a post with this id");
        res.status(500).json({error});
    }
})

router.post('/', async(req,res)=>{
    try {
        const post = await Post.create(req.body.title, req.body.name, req.body.body);
        res.status(201).json(post);
    } catch (error) {
        console.warn("There was an error creating this dog");
        res.status(422).json({error});
    }
})

module.exports = router;