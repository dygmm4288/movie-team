/////////////////////////////////////////////////////
// 이 script는 Header UI와 검색 기능을 담당하고 있습니다 //
////////////////////////////////////////////////////

// module

// API OPTIONS
const API_KEY = 'api_key=c929b1fb9912e2f89022f61946d45cac';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

// variables

const allInput = document.querySelectorAll('input');
console.log(allInput);
const headerInput = document.querySelector('.search-input');
let inputTemp = ''; // input의 값을 임시로 저장 할 변수
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
  window.location.href = '/';
});
// 검색 시 일어날 일들 (input 데이터 검사 / fetch)

// 브라우저 창에서 keydown 이벤트가 발생 시
window.addEventListener('keydown', (e) => {
  // dataset 속성의 값이 지금 누른 키와 같은 요소를 찾고
  const slash = document.querySelector(`input[data-key = ${e.code}]`);
  // 요소가 없다면 아무 일도 일어나지 않음
  if (!slash) return;
  // 활성 요소가 없으면 인풋으로 focus
  if (
    Array.from(document.querySelectorAll('input')).every(
      (el) => el !== document.activeElement,
    )
  )
    // 요소가 있다면 그 요소에 focus 하고
    slash.focus();

  // 찾은 요소에 transition이 시작 될 때
  onTransition(slash);

  // input 요소의 focus가 풀릴 때 실행
  foucusOut(slash);
});

// 찾은 요소에 transition이 시작 될 때
/**input 태그인 요소를 전달 받습니다**/
function onTransition(inputEl) {
  inputEl.addEventListener('transitionstart', () => {
    // 인풋 임시저장 변수가 비어있지 않다면 인풋 value를 임시저장 변수의 값으로 채운다
    if (inputTemp !== '') inputEl.value = inputTemp;
    // 인풋 value 임시 저장 변수가 비었다면 value를 비워준다.
    else inputEl.value = '';
  });
}

// input 요소의 focus가 풀릴 때 실행되는 함수
/**input 태그인 요소를 전달 받습니다**/
function foucusOut(inputElement) {
  inputElement.addEventListener('focusout', (e) => {
    // 인풋 포커스가 아웃되면 인풋의 값을 임시저장 변수가 저장한다.
    inputTemp = e.target.value;
  });
}
