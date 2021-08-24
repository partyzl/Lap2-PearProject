const form = document.querySelector('form');
const postsList = document.querySelector('table');

form.addEventListener('submit', myFun);

getAll();

function getAll() {
    fetch(`http://localhost:3000/posts`)
    .then(r => r.json())
    .then(appendPosts)
    .catch(console.warn)
}

function getById(id) {
    fetch(`http://localhost:3000/posts/${id}`)
    .then(r => r.json())
    .then(appendPost)
    .catch(console.warn)
}

function myFun(e) {
    e.preventDefault();

    const postData = {
        name: e.target.name.value,
        title: e.target.title.value,
        body: e.target.body.value
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-title": "application/json" },
    }

    fetch('http://localhost:3000/post', options)
    .then(resp => resp.json())
    .then(appendPost)
    .then(() => e.target.reset())
    .catch(console.error)
}

function appendPosts(data) {
    data.posts.forEach(appendPost);
}

function appendPost(postData) {
    const newRow = document.createElement('tr');
    const postLi = formatPostTr(postData, newRow);
    postsList.append(postLi);
}

function formatPostTr(post, tr) {
    const nameTd = document.createElement('td');
    const titleTd = document.createElement('td');
    const bodyTd = document.createElement('td');

    nameTd.textContent = post.name;
    titleTd.textContent = post.name;
    bodyTd.textContent = post.body;

    tr.append(nameTd);
    tr.append(titleTd);
    tr.append(bodyTd);

    return tr;
}
