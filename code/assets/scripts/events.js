const button = document.querySelector('button');

const clickHandler = (event) => {
  alert('button was clicked!');
  console.log(event);
  console.log(event.target);
  //   event.target.disabled = true;
};

// for (const button of buttons) {
//   button.addEventListener('click', clickHandler);
// }

const section = document.querySelector('section');
const div = document.querySelector('div');

// button.addEventListener('click', function (event) {
//   console.log(event);
//   console.log('clicked from button');
//   event.stopPropagation();
// });

section.addEventListener('click', (event) => {
  //   console.dir(event.target);
  //   console.log(event.currentTarget);
  console.log('clicked from section');

  //   console.log(event.target.closest('li'));

  if (event.target.closest('li')) {
    event.target.closest('li').classList.toggle('highlight');
  }
});

// div.addEventListener('click', (event) => {
//   console.log(event);
//   console.log('clicked from DIV');
// });
