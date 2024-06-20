let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().trim();

function solve(board) {
  const n = board.length;
  let result = "";
  let i = 0;

  while (i < n) {
    if (board[i] === ".") {
      result += ".";
      i++;
    } else {
      let j = i;
      while (j < n && board[j] === "X") {
        j++;
      }
      const length = j - i;

      if (length % 2 !== 0) {
        return "-1";
      }

      const aCount = Math.floor(length / 4);
      const bCount = (length % 4) / 2;

      result += "AAAA".repeat(aCount) + "BB".repeat(bCount);
      i = j;
    }
  }

  return result;
}

const result = solve(data);
console.log(result);
