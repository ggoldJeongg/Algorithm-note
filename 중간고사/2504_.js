let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();

function bracketValue(input) {
  const stack = [];

  let value = 0;
  let temp = 1;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (stack.length === 0 || stack[stack.length - 1] !== "(") {
    }
    if (char === "(") {
      stack.push(char);
      temp *= 2;
    } else if (char === "[") {
      stack.push(char);
      temp *= 3;
    } else if (char === ")") {
      if (stack.length === 0 || stack[stack.length - 1] !== "(") {
        return 0;
      }
      if (input[i - 1] === "(") {
        value += temp;
      }
      stack.pop();
      temp /= 2;
    } else if (char === "]") {
      if (stack.length === 0 || stack[stack.length - 1] !== "[") {
        return 0;
      }
      if (input[i - 1] === "[") {
        value += temp;
      }
      stack.pop();
      temp /= 3;
    }
  }
  if (stack.length !== 0) {
    return 0;
  }
  return value;
}

console.log(bracketValue(input));
