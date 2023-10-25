// module
import { validateBasic } from "../validation.js";
import { searchMovies } from "../index.js";

// API OPTIONS
const API_KEY = 'api_key=c929b1fb9912e2f89022f61946d45cac';
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'
  + API_KEY;

// variables
const form = document.querySelector('.search-form');
const headerInput = document.querySelector('.search-input');
let inputTemp = ''; // input의 값을 임시로 저장 할 변수

// 검색 시 일어날 일들 (input 데이터 검사 / fetch)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateBasic(headerInput.value) !== true // input 값 유효성 검사 통과 시 searchMovie에 API URL과 input 값 전달
    ? alert('검색어를 입력하세요')
    : searchMovies(API_URL, headerInput.value)
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

  slash.addEventListener('transitionstart', (e) => {
    // 인풋 임시저장 변수가 비어있지 않다면 인풋 value를 임시저장 변수의 값으로 채운다
    if (inputTemp !== '') slash.value = inputTemp
    // 인풋 value 임시 저장 변수가 비었다면 value를 비워준다.
    else slash.value = ''

  })
  slash.addEventListener('focusout', (e) => {
    // 인풋 포커스가 아웃되면 인풋의 값을 임시저장 변수가 저장한다.
    inputTemp = e.target.value;
  })
})
