// const add = (num1, num2) => {
//   return num1 + num2;
// };

// console.log(add(9, 1));

// const addRandom = (num1) => num1 + Math.random() * 10;

// console.log(addRandom(1));

const createTaxCalculator = (tax) => {
  const calculateTax = (amount) => {
    return amount * tax;
  };

  return calculateTax;
};

const calculateAVTax = createTaxCalculator(0.1);
const calculateIncomeTax = createTaxCalculator(0.05);

console.log(calculateAVTax(100));
console.log(calculateAVTax(200));
console.log(calculateIncomeTax(100));
