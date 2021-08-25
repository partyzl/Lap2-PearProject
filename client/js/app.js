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
        title: e.target.title.value,
        pseudonym: e.target.pseudonym.value,
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

    tr.append(titleTd);
    tr.append(pseudonymTd);
    tr.append(bodyTd);

    return tr;
}
