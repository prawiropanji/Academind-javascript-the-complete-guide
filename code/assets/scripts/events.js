const buttons = document.querySelectorAll('button');

const clickHandler = (event) => {
  alert('button was clicked!');
  console.log(event.target);
};

for (const button of buttons) {
  button.addEventListener('click', clickHandler);
}
