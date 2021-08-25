const form = document.querySelector('form');
const postsList = document.querySelector('table');

form.addEventListener('submit', submitPost);

getAllPosts();

function getAllPosts() {
    fetch('http://localhost:3000/posts')
    .then(resp => resp.json())
    .then(appendPosts)
    .catch(console.error)
};

function submitPost(e) {
    e.preventDefault();

    const postData = {
        pseudonym: e.target.pseudonym.value,
        title: e.target.title.value,
        body: e.target.body.value
    }

    const options = {
        method: 'POST', 
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json"}
    }

    fetch('http://localhost:3000/posts', options)
    .then(resp => resp.json())
    .then(appendPost)
    .then(() => e.target.reset())
    .catch(console.error)
}

// function updatePost(id, tr) {
//     console.log('Updating', id);

//     const options = {method: 'PATCH'};

//     fetch(`http://localhost:3000/Posts/${id}`, options)
//     .then(r => r.json())
//     .then(data => {
//         const {Post} = data;
//         tr.querySelectorAll('td')[2].textContent = Post.height;
//     })
//     .catch(console.error)
// }

// function deletePost(id, tr) {
//     console.log('Deleting', id);

//     const options = {method: 'DELETE'};

//     fetch(`http://localhost:3000/Posts/${id}`, options)
//     .then(tr.remove())
//     .catch(console.error)
// }

function appendPosts(data) {
    data.posts.forEach(appendPost);
}

function appendPost(postData) {
    const newRow = document.createElement('tr');
    const postLi = formatPostTr(postData, newRow);
    postsList.append(postLi);
}

function formatPostTr(post, tr) {
    const pseudonymTd = document.createElement('td');
    const titleTd = document.createElement('td');
    const bodyTd = document.createElement('td');

    // const uptTd = document.createElement('td');
    // const delTd = document.createElement('td');
    // const uptBtn = document.createElement('button');
    // const delBtn = document.createElement('button');

    pseudonymTd.textContent = post.pseudonym;
    titleTd.textContent = post.title;
    bodyTd.textContent = post.body;

    // uptBtn.setAttribute('class', 'update');
    // delBtn.setAttribute('class', 'delete');
    // uptBtn.onclick = () => updatePost(Post.id, tr);
    // delBtn.onclick = () => deletePost(Post.id, tr);
    // uptBtn.textContent = '+';
    // delBtn.textContent = 'X';
    // uptTd.append(uptBtn);
    // delTd.append(delBtn);

    tr.append(pseudonymTd);
    tr.append(titleTd);
    tr.append(bodyTd);
    // tr.append(uptBtn);
    // tr.append(delTd);

    return tr;
}
