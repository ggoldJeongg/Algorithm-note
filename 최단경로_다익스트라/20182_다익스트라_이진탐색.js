// 문제 설명 : 특정 간선의 최대 가중치를 제한하는 조건을 고려하면서 최단경로 구하기
// 핵심 개념 : 다익스트라, 이진탐색

// 특정 간선의 가중치가 최대값을 초과하지 않는 최단경로를 찾아야 함 -> 초과시 무시
// 특정 간선의 가중치가 지정된 값(mid) 이하일 때만 간선만 사용하는 다익스트라를 반복 실행
// 그래서 기존 다익스트라처럼 pq만 사용해서 풀 수 없음. 이진탐색을 해야함.

const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const INF = 1e14 + 1; // 매우 큰 값으로, 무한대처럼 사용 (최단 거리 초기화에 사용)
let [n, m, a, b, c] = input[0].split(" ").map(Number); // 첫 줄에서 정점 개수 n, 간선 개수 m, 시작점 a, 도착점 b, 제한 비용 c 읽기
a -= 1; // 0-based 인덱스 사용을 위해 a에서 1 빼기
b -= 1; // 0-based 인덱스 사용을 위해 b에서 1 빼기

let graph = Array.from({ length: n }, () => []); // n개의 정점에 대해 인접 리스트 방식으로 그래프 초기화
let costs = []; // 모든 간선의 비용을 저장할 배열


class PriorityQueue {
  constructor() {
    this.heap = []; // 우선순위 큐를 힙으로 구현
  }

  push(item) {
    this.heap.push(item); // 힙의 끝에 새 요소 추가
    this._bubbleUp(); // 힙 속성을 유지하도록 재배치
  }

  pop() {
    if (this.size() === 1) return this.heap.pop(); // 힙에 하나만 남았으면 그대로 반환
    const top = this.heap[0]; // 루트 노드(최소값)를 저장
    this.heap[0] = this.heap.pop(); // 힙의 마지막 요소를 루트로 이동
    this._bubbleDown(); // 힙 속성을 유지하도록 재배치
    return top; // 최소값 반환
  }

  size() {
    return this.heap.length; // 힙의 크기 반환
  }

  _bubbleUp() {
    let index = this.heap.length - 1; // 새 요소의 현재 위치
    const element = this.heap[index]; // 새 요소 저장

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2); // 부모 노드의 인덱스 계산
      const parent = this.heap[parentIndex]; // 부모 노드 값

      if (element[0] >= parent[0]) break; // 부모보다 크거나 같으면 멈춤 (힙 속성 유지)
      this.heap[index] = parent; // 부모를 현재 위치로 이동
      index = parentIndex; // 부모의 위치로 이동
    }

    this.heap[index] = element; // 최종 위치에 새 요소 배치
  }

  _bubbleDown() {
    let index = 0; // 루트부터 시작
    const length = this.heap.length; // 힙의 길이
    const element = this.heap[0]; // 루트 노드 저장

    while (true) {
      let leftChildIndex = 2 * index + 1; // 왼쪽 자식 노드의 인덱스
      let rightChildIndex = 2 * index + 2; // 오른쪽 자식 노드의 인덱스
      let swapIndex = null; // 교체할 노드의 인덱스 초기화

      if (leftChildIndex < length) { // 왼쪽 자식 노드가 존재하면
        if (this.heap[leftChildIndex][0] < element[0]) { // 왼쪽 자식이 현재 노드보다 작으면
          swapIndex = leftChildIndex; // 교체 후보로 설정
        }
      }

      if (rightChildIndex < length) { // 오른쪽 자식 노드가 존재하면
        if (
          (swapIndex === null && this.heap[rightChildIndex][0] < element[0]) || // 교체 후보가 없고 오른쪽 자식이 더 작으면
          (swapIndex !== null && this.heap[rightChildIndex][0] < this.heap[swapIndex][0]) // 이미 교체 후보가 있는데 오른쪽 자식이 더 작으면
        ) {
          swapIndex = rightChildIndex; // 오른쪽 자식을 교체 후보로 설정
        }
      }

      if (swapIndex === null) break; // 교체할 노드가 없으면 종료

      this.heap[index] = this.heap[swapIndex]; // 교체 노드를 현재 위치로 이동
      index = swapIndex; // 교체 노드 위치로 이동
    }

    this.heap[index] = element; // 최종 위치에 루트 노드 배치
  }
}

function dijkstra(mid) {
  const pq = new PriorityQueue(); // 우선순위 큐 초기화
  const cost = new Array(n).fill(INF); // 각 정점까지의 최소 비용을 INF로 초기화
  pq.push([0, a]); // 시작점의 비용을 0으로 설정
  cost[a] = 0; // 시작점까지의 비용을 0으로 설정

  while (pq.size() > 0) { // 큐가 빌 때까지 반복
    const [curCost, curNode] = pq.pop(); // 현재 노드와 누적 비용 추출

    if (cost[curNode] !== curCost) continue; // 이미 처리된 거리라면 무시

    for (const [nextNode, edgeCost] of graph[curNode]) { // 현재 노드의 모든 간선 확인
      if (edgeCost > mid) continue; // 간선 비용이 mid를 초과하면 무시
      if (cost[nextNode] > cost[curNode] + edgeCost) { // 더 짧은 경로 발견 시
        cost[nextNode] = cost[curNode] + edgeCost; // 거리 갱신
        if (nextNode === b && cost[nextNode] <= c) return true; // 도착점 b까지 제한 조건 만족하면 true 반환
        pq.push([cost[nextNode], nextNode]); // 갱신된 거리와 노드를 큐에 추가
      }
    }
  }

  return cost[b] <= c; // 도착점까지 비용이 제한 내인지 여부 반환
}

for (let i = 1; i <= m; i++) {
  const [s, e, d] = input[i].split(" ").map(Number); // 간선 정보 읽기
  graph[s - 1].push([e - 1, d]); // 양방향 간선 추가 (0-based 인덱스)
  graph[e - 1].push([s - 1, d]);
  costs.push(-d); // 간선 비용을 음수로 저장 (내림차순 정렬 위해)
}

costs.sort((a, b) => a - b); // 간선 비용 내림차순 정렬
let left = 0; // 이진 탐색의 시작점
let right = -costs[0]; // 가장 큰 간선 비용 (양수로 변환)
let ans = INF; // 답을 INF로 초기화

while (left <= right) {
  const mid = Math.floor((left + right) / 2); // 중간값 계산
  if (dijkstra(mid)) { // 다익스트라로 mid를 기준으로 경로 존재 여부 확인
    ans = Math.min(ans, mid); // 조건을 만족하면 답 갱신
    right = mid - 1; // 더 작은 범위를 탐색
  } else {
    left = mid + 1; // 더 큰 범위를 탐색
  }
}

console.log(ans === INF ? -1 : ans); // 답이 INF면 -1, 아니면 최소 비용 출력

// N개의 교차로, M개의 골목
// 교차로 번호 : 1~N번까지
// A번 교차로 -> B번 교차로까지 C원 가져가기
// 최소한의 수치심 받기 : 경로상 가장 많이 낸 돈에 비례
// 한 골목에서 내야하는 최대 요금 최소화
// 수치심을 줄이고싶으면 같거나 더 많은 돈, 수치심을 더 받을걸 감수하면 적은 돈이 필요
// 호석이가 수금하는 금액을 알면 -> 한 골목에서 내야하는 최대 요금의 최솟값 계산
// 지금 돈으로 목표지점을 못가면 -1 출력
// 첫줄 : N(교차로개수) M(골목개수) A(시작교차로번호) B(도착교차로번호) C(가진돈)
// 둘째줄~ : 교차로번호1 교차로번호2 수금액
// 같은 교차로를 잇는 골목은 최대 한번

// C원 이하로 가는 경로 중 지나가는 골목요금의 최댓값-최솟값 출력 / 못가면 -1 출력
// 제한사항 존재