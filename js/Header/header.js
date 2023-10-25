// module
import { validateBasic } from "../validation.js";

// variables
const form = document.querySelector('.search-form');
const headerInput = document.querySelector('.search-input');

// 검색 시 일어날 일들 (input 데이터 검사 / fetch)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateBasic(headerInput.value) !== true
    ? alert('검색어를 입력하세요')
    : console.log('fetch가 될 예정')
})



// 브라우저 창에서 keydown 이벤트가 발생 시
window.addEventListener('keydown', (e) => {
  // dataset 속성의 값이 지금 누른 키와 같은 요소를 찾고 
  const slash = document.querySelector(`input[data-key = ${e.code}]`)
  // 요소가 없다면 아무 일도 일어나지 않음
  if (!slash) return;

  // 요소가 있다면 그 요소에 focus 하고
  slash.focus();

  // 찾은 요소에 transition이 시작 될 때
  slash.addEventListener('focus', () => {
    // value를 비워준다.
    slash.value = ''
  })
})