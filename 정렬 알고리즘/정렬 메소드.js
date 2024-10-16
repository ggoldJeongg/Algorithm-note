let arr = [1, 8, 5, 9, 21, 3, 7, 2, 15];

// (1)정수 오름차순 정렬
function compare(a, b) {
  if (a < b) return -1; //앞의 수가 뒤의 수보다 작으면 -1 반환
  else if (a > b) return 1; // 앞의 수가 뒤의 수보다 크면 1 반환
  else return 0; // 두 수가 같으면 0 반환
}

arr.sort(compare); // sort 메소드 사용

console.log(arr); // 데이터를 함수에 넣어 출력

// (2)정수 오름차순 정렬
function compare2(a, b) {
  return a - b; // a값이 b보다 작으면 음수로 반환되어 a가 앞에 위치
}

arr.sort(compare2);

console.log(arr);

// (3)비교함수를 바로 정의하고 출력
arr.sort(function (a, b) {
  return a - b;
});

console.log(arr);

// (4)정수 내림차순 정렬
function compare3(a, b) {
  // a가 b보다 클 경우
  return b - a; // 반환값이 음수가 되어 a가 앞에 위치
}

arr.sort(compare3);

console.log(arr);

// (5)문자열 오름차순 정렬
let stringArr = ["fineapple", "banana", "durian", "apple", "carrot"];
// 별도 기준 함수가 없을 경우 유니코드순으로 자동 정렬
arr.sort();
console.log(stringArr);

// (6)문자열 내림차순 정렬
function compare4(a, b) {
  if (a > b) return -1; // a와 b의 값을 비교하여
  else if (a < b) return 1; // 리턴된 값을 정의하고
  else return 0; // 리턴값을 비교하여 정렬
}

stringArr.sort(compare4);
console.log(stringArr);

// toUpperCase() : 대소문자 구분 없이 오름차순 정렬
let stringArr2 = ["fineapple", "Banana", "durian", "Apple", "carrot"];

function compare5(a, b) {
  let upperCaseA = a.toUpperCase();
  let upperCaseB = b.toUpperCase();
  if (upperCaseA < upperCaseB) return -1;
  else if (upperCaseA > upperCaseB) return 1;
  else return 0;
}
stringArr.sort(compare5);
console.log(stringArr);

// 객체를 원하는 기준으로 오름차순 정렬
let objectArr = [
  { name: "홍길동", score: 90 },
  { name: "김철수", score: 85 },
  { name: "박영희", score: 97 },
];

function compare6(a, b) {
  return b.score - a.score; //정렬 원하는 key 선택
}
objectArr.sort(compare6);

console.log(objectArr);

/* sort()
- 배열 요소를 적절한 위치에 정렬 후 배열을 반환
- 시간복잡도 : O(NlogN)
*/

/* 동작 원리 
- 정렬 기준 함수가 존재
1. 두개의 원소 a, b를 입력
2. 반환값이 음수 -> a가 우선순위가 높아서 앞에 위치
3. 반환값이 양수 -> b가 우선순위가 높아 앞에 위치
4. 반환값이 0 -> a와 b의 순서 변경 X 

- *** 정렬 기준 함수가 없으면 각 원소는 문자열 취급되고, 유니코드값 순서대로 정렬
- *** 항상 정렬 기준 함수를 명시하는것이 좋다.
*/

/* 언제 사용할까?
- 적은 데이터를 단순 조회
- 라이브러리 사용이 가능할 때 사용
- 데이터를 오름차순 or 내림차순으로 조회 */
