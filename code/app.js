const button = document.querySelector('button');
const output = document.querySelector('p');

console.log('start');

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

async function trackUserHandler() {
  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     setTimeout(() => {
  //       console.log(position);
  //     }, 2000);
  //   },
  //   (data) => console.log(data)
  // );
  // let posData;
  // getPosition()
  //   .then((data) => {
  //     posData = data;

  //     return setTimer(2000);
  //   })
  //   .then((data) => {
  //     console.log(data, posData);
  //   });
  try {
    let posData = await getPosition();
    let message = await setTimer(4000);
    console.log(message, posData);
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener('click', trackUserHandler);

// let counter = 0;
// for (let i = 0; i < 100000000; i++) {
//   counter += i;
// }

// console.log(counter);

console.log('end');
