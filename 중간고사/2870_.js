const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input.shift());

solution(N, input);

function solution(N, words) {
  const numbers = [];
  words.forEach((word) => {
    for (let num of word.split(/[^0-9]/)) {
      if (num === "") continue;

      numbers.push(num.replace(/^0+/, "") || "0");
    }
  });

  const sorted = numbers.sort((a, b) => {
    if (a.length === b.length) {
      const numA = BigInt(a);
      const numB = BigInt(b);
      if (numA < numB) return -1;
      if (numA > numB) return 1;
      return 0;
    }
    return a.length - b.length;
  });

  console.log(sorted.join("\n"));
}
