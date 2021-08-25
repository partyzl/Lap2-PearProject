const form = document.querySelector('#new-post-form');
const postsList = document.querySelector('table');

form.addEventListener('submit', myFun);
// form.addEventListener('submit', postPost);

getAll();

function getAll() {
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
        headers: { "Content-Type": "application/json" },
    }

    fetch('http://localhost:3000/post', options)
    .then(resp => resp.json())
    .then(appendPost)
    .then(() => e.target.reset())
    .catch(console.warn)
}
// async function postPost(e){
//     e.preventDefault();
//     try {
//         const options = {
//             method: 'POST',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
//         }
        
//         const response = await fetch('http://localhost:3000/post', options);
//         const { id, err } = await response.json();
//         if(err) { 
//             throw Error(err) 
//         } else {
//             window.location.hash = `#post/${id}`
//         }
//     } catch (err) {
//         console.warn(err);
//     }
// }

function appendPosts(data) {
    data.posts.forEach(appendPost);
}

function appendPost(postData) {
    const newRow = document.createElement('tr');
    //newRow.classList('align-middle')
    const postLi = formatPostTr(postData, newRow);
    postsList.append(postLi);
}

function formatPostTr(post, tr) {
    const nameTd = document.createElement('td');
    const titleTd = document.createElement('td');
    const bodyTd = document.createElement('td');

    nameTd.textContent = post.title;
    titleTd.textContent = post.name;
    bodyTd.textContent = post.body;

    tr.append(nameTd);
    tr.append(titleTd);
    tr.append(bodyTd);

    return tr;
}
