const db = require('../dbConfig.js');

class Post {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.pseudonym = data.pseudonym;
        this.body = data.body;
    }

    static get all() {
        return new Promise(async (res, rej) => {
            try {
                const postData = await db.query('SELECT * FROM posts;');
                const posts = postData.rows.map(post => new Post(post));
                res(posts);
            } catch(err) {
                console.error(err);
                rej('Error retrieving the posts');
            }
        })
    }

    static findById(id) {
        return new Promise(async (res, rej) => {
            try {
                const postData = await db.query(`SELECT * FROM posts WHERE id = $1;`, [id]);
                const post = new Post(postData.rows[0]);
                res(post);
            } catch(err) {
                console.error(err);
                rej('Post not found');
            }
        })
    }

    static create(data) {
        return new Promise(async (res, rej) => {
            try {
                const postData = await db.query(`INSERT INTO posts (title, pseudonym, body) VALUES ($1, $2, $3) RETURNING *;`, [data.title, data.pseudonym, data.body]);
                const newPost = new Post(postData.rows[0]);
                res(newPost);
            } catch(err) {
                console.error(err);
                rej('Error creating post');
            }
        })
    }
}

module.exports = Post;
