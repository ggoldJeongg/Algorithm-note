//문제 설명 : N개의 수가 주어졌을 때, 오름차순으로 정렬
//핵심 개념 : sort 메소드를 활용한 간단한 정렬 알고리즘 구현

//fs모듈로 데이터 불러오기
const fs = require('fs');
//문자열로 변환 후 줄바꿈 기준으로 분할
const data = fs.readFileSync('/dev/stdin').toString().split('\n');

//첫번째줄 N 변수에 숫자로 저장
const N = Number(data[0]);
const numbers = []; // 두번째줄~ 배열로 선언하고 초기화
//data의 1번째 인덱스부터 (N 다음줄) N개의 길이까지 계속 증가 
for (let i = 1; i <= N; i++) {
	numbers.push(Number(data[i])); //Numbers 배열에 숫자로 저장
}

// sort 정렬 비교함수 (오름차)
function compare(a,b) {
	return a - b;
}

//정렬 함수
numbers.sort(compare);

// 정답 변수 초기화
let answer = "";
// 0번째 인덱스부터 정렬된 입력값의 총 길이만큼 증가
for (let i = 0; i < numbers.length; i++) {
    //반복문이 적용된 배열 데이터를 줄바꿈과 함께 answer 변수에 저장
	answer += numbers[i] + "\n";
}

//정답 출력
console.log(answer);
