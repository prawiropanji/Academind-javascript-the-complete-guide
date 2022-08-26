let xhr = new XMLHttpRequest();

const listPostsElement = document.querySelector('.posts');
const templateListItemElement = document.querySelector('template');

function sendHttpRequest(url, method, data) {
  //promisifying xhr
  // const promise = new Promise((resolve, reject) => {
  //   xhr.open(method, url); // configure request method and requst url
  //   xhr.send(data); // initiate request
  //   xhr.responseType = 'json'; // parse format of response from json to native javascript
  //   xhr.onload = () => {
  //     // event listener, if the request is success then this handler will trigger
  //     resolve(xhr.response);
  //   };
  // });

  // return promise;

  return fetch(url, { method: method, body: JSON.stringify(data) });
}

let deletePost = (id) => {
  sendHttpRequest(`https://jsonplaceholder.typicode.com/posts/${id}`, 'DELETE');
};

let fetchPost = async () => {
  try {
    const responseObj = await sendHttpRequest(
      'https://jsonplaceholder.typicode.com/pos'
    );
    if (!responseObj.ok) {
      throw new Error('location not found');
    }
    const response = await responseObj.json();
    const listPosts = response;
    for (const post of listPosts) {
      const postItemElement = document.importNode(
        templateListItemElement.content,
        true
      );
      postItemElement.querySelector('h2').textContent =
        post.title.toUpperCase();
      postItemElement.querySelector('p').textContent = post.body;
      postItemElement.querySelector('li').id = post.id;

      listPostsElement.appendChild(postItemElement);
    }
  } catch (err) {
    alert(err.message);
  }
};

listPostsElement.addEventListener('click', (event) => {
  // console.dir(event.target);
  if (event.target.tagName === 'BUTTON') {
    let id = event.target.closest('li').id;
    deletePost(id);
    event.target.closest('li').remove();
  }
});

let createPost = async (title, body) => {
  let dataPayload = {
    id: (Math.random() * 1000000).toFixed(),
    title: title,
    body: body,
  };
  let res = await sendHttpRequest(
    'https://jsonplaceholder.typicode.com/posts',
    'POST',
    dataPayload
  );
};

const fetchButton = document.querySelector('#available-posts button');
fetchButton.addEventListener('click', fetchPost);

const addPostForm = document.querySelector('#new-post form');
addPostForm.addEventListener('submit', (e) => {
  console.log(e);
  e.preventDefault();
  let formData = new FormData(addPostForm);
  let title = formData.get('title');
  let body = formData.get('content');
  createPost(title, body);
});
