const db = require('../dbConfig');

class Post {
    constructor(data){
        this.title = data.title;
        this.name = data.pseudonym;
        this.body = data.body;
    }

    static get all(){
        return new Promise(async (res, rej)=>{
            try{
                const result = await db.query(`SELECT * FROM posts;`);
                const postData = result.rows.map(p => new Post(p));
                res(postData)
            }catch(err){
                rej("There was an error displaying your posts")
            }

        })
    }

    static getById(id){
        return new Promise(async (res, rej)=>{
            try {
                const result = await db.query(`SELECT * FROM posts WHERE id = $1;`, [id]);
                let postData = new Post(result.rows[0])
                res(postData)
            } catch (error) {
                rej("There was an error retrieving an entry with this id")
            }
        })
    }

    static create(title, name, body){
        return new Promise(async (res, rej)=>{
            try {
                const result = await db.query(`INSERT INTO posts (title, pseudonym, body)
                                                VALUES($1, $2, $3);` [title, name, body]);
                const postData = new Post(result.rows[0]);
                res(postData);
            } catch (error) {
                rej("Error creating your post")
            }
        })
    }
}

module.exports = Post;