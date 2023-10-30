/////////////////////////////////////////////////////
// 이 script는 Header UI와 검색 기능을 담당하고 있습니다 //
////////////////////////////////////////////////////
import { API_URL, searchMovies } from "../tmdb.js";
import { select, selectAll } from "../util.js";
import { validateBasic } from "../validation.js";

const $headerInput = select(".search-input");
const $logo = select(".logo");
const $form = select(".search-form");

// 이벤트 리스너
$logo.addEventListener("click", () => {
  window.location.href = "/";
});

// 검색 시 일어날 일들 (input 데이터 검사 / fetch)
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = $headerInput.value;
  validateBasic(inputValue) !== true // input 값 유효성 검사 통과 시 searchMovie에 API URL과 input 값 전달
    ? alert("검색어를 입력하세요") & searchMovies(API_URL)
    : searchMovies(API_URL, inputValue);
  $headerInput.value = "";
});
// 브라우저 창에서 keydown 이벤트가 발생 시
window.addEventListener("keydown", (e) => {
  // dataset 속성의 값이 지금 누른 키와 같은 요소를 찾고
  const slash = select(`input[data-key = ${e.code}]`);
  // 요소가 없다면 아무 일도 일어나지 않음
  if (!slash) return;
  // 활성 요소가 없으면 인풋으로 focus
  if (
    Array.from(selectAll("input")).every((el) => el !== document.activeElement)
  ) {
    slash.focus(); // 요소가 있다면 그 요소에 focus 하고
  }

  // 찾은 요소에 transition이 시작 될 때
  onTransition(slash);

  // input 요소의 focus가 풀릴 때 실행
  foucusOut(slash);
});

// 찾은 요소에 transition이 시작 될 때
/**input 태그인 요소를 전달 받습니다**/
let inputTemp = ""; // input의 값을 임시로 저장 할 변수
function onTransition(inputEl) {
  inputEl.addEventListener("transitionstart", () => {
    // 인풋 임시저장 변수가 비어있지 않다면 인풋 value를 임시저장 변수의 값으로 채운다
    if (inputTemp !== "") inputEl.value = inputTemp;
    // 인풋 value 임시 저장 변수가 비었다면 value를 비워준다.
    else inputEl.value = "";
  });
}
// input 요소의 focus가 풀릴 때 실행되는 함수
/**input 태그인 요소를 전달 받습니다**/
function foucusOut(inputElement) {
  inputElement.addEventListener("focusout", (e) => {
    // 인풋 포커스가 아웃되면 인풋의 값을 임시저장 변수가 저장한다.
    inputTemp = e.target.value;
  });
}
