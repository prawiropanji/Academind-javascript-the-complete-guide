const button = document.querySelector('button');
const output = document.querySelector('p');

function trackUserHandler() {
  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     setTimeout(() => {
  //       console.log(position);
  //     }, 2000);
  //   },
  //   (data) => console.log(data)
  // );
  let posData;
  getPosition()
    .then((data) => {
      posData = data;

      return setTimer(2000);
    })
    .then((data) => {
      console.log(data, posData);
    });
}

button.addEventListener('click', trackUserHandler);

// let counter = 0;
// for (let i = 0; i < 100000000; i++) {
//   counter += i;
// }

// console.log(counter);

const getPosition = () => {
  let promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => console.log(error)
    );
  });
  return promise;
};

const setTimer = (time) => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: 'success' });
    }, time);
  });
  return promise;
};
