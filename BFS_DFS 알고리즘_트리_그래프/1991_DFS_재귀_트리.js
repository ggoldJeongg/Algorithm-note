// 문제 설명 : 이진트리를 입력받아 전위순회, 중위순회, 후위순회한 결과 출력하기
// 핵심 개념 : DFS-재귀, 이진 트리

const fs = require("fs");

// 입력처리
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input[0]);
const nodes = {}; // 노드 이름을 키로 : 값을 자식 노드로 설정하여 쉽게 탐색

// 트리 구성
for (let i = 1; i <= N; i++) {
  // 1부터 트리 노드 개수(N)만큼 반복
  const [node, left, right] = input[i].split(" "); // 구조분해할당으로 공백 기준으로 input값을 순서대로 변수 할당
  nodes[node] = { left, right }; // nodes 객체에 node(부모)를 키 : left, right(자식) 값으로 할당
}

// 전위 순회 함수
function preorder(node) {
  if (node === ".") return ""; // 노드가 없으면 빈 문자열 반환
  // 현재 노드 방문 -> 왼쪽 자식 -> 오른쪽 자식 방문
  return node + preorder(nodes[node].left) + preorder(nodes[node].right);
}

// 중위 순회 함수
function inorder(node) {
  if (node === ".") return ""; // 노드가 없으면 빈 문자열 반환
  // 왼쪽 자식 방문 -> 현재 노드 방문 -> 오른쪽 자식 방문
  return inorder(nodes[node].left) + node + inorder(nodes[node].right);
}

// 후위 순회 함수
function postorder(node) {
  if (node === ".") return ""; // 노드가 없으면 빈 문자열 반환
  // 왼쪽 자식 방문 -> 오른쪽 자식 방문 -> 현재 노드 방문
  return postorder(nodes[node].left) + postorder(nodes[node].right) + node;
}

// 루트 노드는 항상 'A'
const root = "A";

// 결과 출력
console.log(preorder(root));
console.log(inorder(root));
console.log(postorder(root));

/* 조건 요약 */

// 선택 알고리즘 : 이진 트리 순회 알고리즘
// 주어진 트리를 전위 순회(preorder traversal), 중위 순회(inorder traversal), 후위 순회(postorder traversal)하는 방식으로 동작하기 때문에

// 선택 자료구조 : 이진 트리
// 주어진 노드 정보에 따라 부모-자식 관계를 정의하여 이진 트리를 구성
// 객체: 노드와 그 자식 노드를 키-값 쌍으로 저장하여 트리 구조 표현
/* const nodes = {
    'A': { left: 'B', right: 'C' },
    'B': { left: 'D', right: '.' },
    'C': { left: 'E', right: 'F' },
    ...
}; */

// 시간복잡도 : 이진 트리의 각 노드를 한 번씩 방문하므로, O(N)

/* 순회 함수 구성
1) 현재 노드를 방문: return node
현재 노드 node를 결과 문자열에 추가. 예 : node가 'A'라면, 결과 문자열에 'A'를 추가

2) 왼쪽 자식을 방문: + preorder(nodes[node].left)
왼쪽 자식에 대해 preorder 함수를 재귀적으로 호출. 왼쪽 자식의 순회 결과를 현재 노드의 결과 문자열 뒤에 추가
예 : 'A'의 왼쪽 자식이 'B'라면, preorder(nodes['A'].left)는 'B'부터 시작하여 다시 순회

3) 오른쪽 자식을 방문: + preorder(nodes[node].right)

오른쪽 자식에 대해 preorder 함수를 재귀적으로 호출
오른쪽 자식의 순회 결과를 현재 노드와 왼쪽 자식의 결과 문자열 뒤에 추가
예 : 'A'의 오른쪽 자식이 'C'라면, preorder(nodes['A'].right)는 'C'부터 시작하여 다시 순회
*/
