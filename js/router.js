export function routing(router) {
  const { pathname } = location;
  // 여기서 일치하는 경로를 찾고
  // 경로에 맞는 랜더함수를 실행시킨다.
  console.log(pathname);
  const matched = router.find((v) => pathname === v.path);
  console.log(matched);
  if (!matched) {
    console.log('not matched');
    return;
  }
  return matched.render();
}
/* 
사용 예제
const router = [
  { path: '/', render: () => console.log('home') },
  { path: '/detail', render: () => console.log('detail') },
];
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    history.pushState(null, null, e.target.href);
    routing(router);
  }
});
 */
