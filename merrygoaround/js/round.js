const all = document.querySelector('#all'); //전체문단 객체
const slideObj = document.querySelectorAll('.slide'); //슬라이드 이미지 객체 배열[]
const navLeft = document.querySelector('#navgateleft'); //왼쪽으로 이동
const navRight = document.querySelector('#navgateright'); //오른쪽으로 이동
const indicateA = document.querySelectorAll(`#indicator>a`); //하단에 이동용
// 현재 이미지 인덱스

// zIndex를 기록할 리스트를 제작
// 1이면 최상단 0이면 최하단으로
let list = [1, 0, 0, 0];
// listArray 함수는 list 배열을 받아서 재배치
function listArray() {
  for (let i = 0; i < list.length; i++) {
    slideObj[i].style.zIndex = list[i];
  }
  for (let i = 0; i < indicateA.length; i++) {
    indicateA[i].classList.remove('active');
  }
  indicateA[list.indexOf(1)].classList.add('active');
}
listArray();
// 왼쪽 버튼에 이벤트 리스너 추가
navLeft.addEventListener('click', () => {
  // 배열의 첫번째 번호를 기억 한뒤 제거하고 마지막에 넣음
  list.push(list.shift());
  listArray();
});
// 누르면 오른쪽으로 가는 기능
function moveRight() {
  // 배열의 마지막 번호를 기억 한뒤 제거하고 첫번째에 넣음
  list.unshift(list.pop());
  listArray();
}
// 오른쪽 핸들에 기능 추가
navRight.addEventListener('click', moveRight);

// 인터벌을 5초로
function startTimer() {
  timerID = setInterval(moveRight, 3000);
}
startTimer();

all.addEventListener('mouseenter', () => {
  clearInterval(timerID);
});
all.addEventListener('mouseleave', () => {
  startTimer();
});

for (let i = 0; i < indicateA.length; i++) {
  indicateA[i].addEventListener('click', () => {
    list = [0, 0, 0, 0];
    list[i] = 1;
    listArray();
  });
}
