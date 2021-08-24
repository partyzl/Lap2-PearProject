const Post = require('../models/Post');

async function all(req, res){
    try {
        const posts = await Post.all;
        res.status(200).json({posts});
    } catch (error) {
        console.warn("Could not find the posts you are looking for");
        res.status(500).json({error})
    }
}

async function getById(req, res){
    try {
        const post = await Post.getById(req.params.id);
        res.status(200).json({post});
    } catch (error) {
        console.warn("Could not find a post with this id");
        res.status(500).json({error});
    }
}

async function create(req,res){
    try {
        const post = Post.create(req.params.body);
        res.status(201).json(post);
    } catch (error) {
        console.warn("There was an error creating this dog");
        res.status(422).json({error});
    }
}

module.exports = {
    all,
    getById,
    create
}