const form = document.querySelector('form');
const postsList = document.querySelector('table');

form.addEventListener('submit', submitPost);

getAllPosts();

function getAllPosts() {
    fetch(`http://localhost:3000/post`)
    .then(r => r.json())
    .then(appendPosts)
    .catch(console.warn)
}

function getById(id) {
    fetch(`http://localhost:3000/post/${id}`)
    .then(r => r.json())
    .then(appendPost)
    .catch(console.warn)
}

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
        headers: { "Content-Type": "application/json" }
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
    const pseudonymTd = document.createElement('td');
    const titleTd = document.createElement('td');
    const bodyTd = document.createElement('td');

    pseudonymTd.textContent = post.pseudonym;
    titleTd.textContent = post.title;
    bodyTd.textContent = post.body;

    tr.append(pseudonymTd);
    tr.append(titleTd);
    tr.append(bodyTd);

    return tr;
}
