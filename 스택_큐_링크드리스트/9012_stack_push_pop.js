const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const T = parseInt(input[0]);

for (let i = 1; i <= T; i++) {
  const ps = input[i];
  console.log(isVPS(ps) ? "YES" : "NO");
}

function isVPS(ps) {
  const stack = [];
  for (let i = 0; i < ps.length; i++) {
    const char = ps[i];
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.length === 0) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
}
