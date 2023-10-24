// 브라우저 창에서 keydown 이벤트가 발생 시
window.addEventListener('keydown', (e) => {
  // dataset 속성의 값이 지금 누른 키와 같은 요소를 찾고 
  const slash = document.querySelector(`input[data-key = ${e.code}]`)
  // 요소가 없다면 아무 일도 일어나지 않음
  if (!slash) return;

  // 요소가 있다면 그 요소에 focus 하고
  slash.focus();

  // 찾은 요소에 transition이 시작 될 때
  slash.addEventListener('transitionstart', () => {
    // value를 비워준다.
    slash.value = ''
  })
})
