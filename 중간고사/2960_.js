let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split(" ");

const N = Number(input[0]);
const K = Number(input[1]);

const prime = Array(N + 1).fill(true);
prime[0] = prime[1] = false;

const count = 0;
const KthRemoveNumber = 0;

for (let P = 2; P <= N; P++) {
  if (prime[P]) {
    for (let j = P; j <= N; j += P) {
      if (prime[j]) {
        prime[j] = false;
        count++;
        if (count === K) {
          KthRemoveNumber = j;
          break;
        }
      }
    }
  }
  if (KthRemoveNumber !== 0) break;
}

console.log(KthRemoveNumber);
