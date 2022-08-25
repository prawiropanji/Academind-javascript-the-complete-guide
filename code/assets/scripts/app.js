let xhr = new XMLHttpRequest();

const listPostsElement = document.querySelector('.posts');
const templateListItemElement = document.querySelector('template');

function sendHttpRequest(method, url, data) {
  //promisifying xhr
  const promise = new Promise((resolve, reject) => {
    xhr.open(method, url); // configure request method and requst url
    xhr.send(data); // initiate request
    xhr.responseType = 'json'; // parse format of response from json to native javascript
    xhr.onload = () => {
      // event listener, if the request is success then this handler will trigger
      resolve(xhr.response);
    };
  });

  return promise;
}

let deletePost = (id) => {
  sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${id}`);
};

let fetchPost = async () => {
  const response = await sendHttpRequest(
    'GET',
    'https://jsonplaceholder.typicode.com/posts'
  );

  const listPosts = response;
  for (const post of listPosts) {
    const postItemElement = document.importNode(
      templateListItemElement.content,
      true
    );
    postItemElement.querySelector('h2').textContent = post.title.toUpperCase();
    postItemElement.querySelector('p').textContent = post.body;
    postItemElement.querySelector('li').id = post.id;

    listPostsElement.appendChild(postItemElement);
  }
};

listPostsElement.addEventListener('click', (event) => {
  // console.dir(event.target);
  if (event.target.tagName === 'BUTTON') {
    let id = event.target.closest('li').id;
    deletePost(id);
    console.log('duluan mana hayo?? (harusnya ini terkahir)');
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
    'POST',
    'https://jsonplaceholder.typicode.com/posts',
    JSON.stringify(dataPayload)
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
