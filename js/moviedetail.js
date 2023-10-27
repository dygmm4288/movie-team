<<<<<<< HEAD
import { append, create, select } from "./util.js";
=======
import { getStorage, setStorage } from './storage.js';
import { append, create, select } from './util.js';
>>>>>>> 13352fe7f533434cb0ff8c50d286ade6e3360dba
export function movieDetail(movie) {
  const $movieCover = create("div", "movie-cover");
  const $movieDetail = select("#detail-page");
  const temp_html = `<div class="movie-card">
  <div class="movie-img-box">
    <div class="movie-img">
      <img
        src="${`https://image.tmdb.org/t/p/w200` + movie.poster_path}"
        class="display-medium on-primary front-card"
        art="..." />
      <div class="tertiary back-card">
        <div class="heart">♥</div>
        <div class="fixed-heart">♥</div>
        </div>
    </div>
  </div>
<<<<<<< HEAD
  <div class="title-large tertiary-container-text movie-body">
    <div class="text-body">
      <div><span class="text-gap">영화제목</span><span>${movie.title}</span></div>
      <div><span>영화개봉일</span><span>${movie.release_date}</span></div>
      <div><span class="text-gap">영화장르</span><span>${movie.genres[0].name}</span></div>
      <div><span class="text-gap">영화평점</span><span>★ ${movie.vote_average}</span></div>
    </div>
    </div>
  </div>
=======
  <div class="title-large tertiary-container-text movie-body1">
    <div class="text-gap">영화 제목:</div>
    <div class="text-gap">영화 개봉일:</div>
    <div class="text-gap">영화 장르:</div>
    <div class="text-gap">영화 평점:</div>
  </div>
  <div class="title-large tertiary-container-text movie-body2">
    <div class="text-gap">${movie.title}</div>
    <div class="text-gap">${movie.release_date}</div>
    <div class="text-gap">${movie.genres[0].name}</div>
    <div class="text-gap">★ ${(movie.vote_average).toFixed(2)}</div>
  </div>
</div>
>>>>>>> 13352fe7f533434cb0ff8c50d286ade6e3360dba
<div class="movie-summary">
  <div class="summary-title"><h1>줄거리</h1></div>
  <p class="summary-content">${movie.overview}</p>
</div>`;
  $movieCover.insertAdjacentHTML("beforeend", temp_html);
  $movieDetail.innerHTML = "";
  append($movieDetail, $movieCover);

<<<<<<< HEAD
  const $image = document.querySelector(".back-card"),
    $heartIcon = document.querySelector(".heart");

  $image.addEventListener("click", (e) => {
    $heartIcon.classList.add("active");
=======
  const $image = $movieDetail.querySelector('.back-card'),
    $heartIcon = $movieDetail.querySelector('.heart'),
    $fixedHeartIcon = $movieDetail.querySelector('.fixed-heart');
  const { id } = movie;
  console.log('image is : ', $image);
  console.log('heartIcon is : ', $heartIcon)
  // image가 클릭을 한다면
  $image.addEventListener('click', (e) => {
    // 근데 이게 local storage에서 데이터를 가져와서
    // 이미 있으면 체크를 해야죠 -> 빨간색으로 나타나야한다.

    // 만약에 빨간게 없다면 -> 추가를 해야하는거고
    // 빨갛다면 -> 삭제를 해야하고
    $heartIcon.classList.add('active');
>>>>>>> 13352fe7f533434cb0ff8c50d286ade6e3360dba

    if ($fixedHeartIcon.style.color === 'red') {
      setStorage(
        'likes',
        [...new Set(getStorage('likes') || [])].filter((v) => v !== id),
      );

      $fixedHeartIcon.style.color = 'rgb(171, 171, 171)';
    } else {
      setStorage('likes', [...new Set(getStorage('likes'))].concat(id));
      $fixedHeartIcon.style.color = 'red';
      $fixedHeartIcon.style.opacity = '1';
    }

    let timeout = setTimeout(() => {
      $heartIcon.classList.remove("active");
      clearTimeout(timeout);
    }, 1000);
  });
  return $movieDetail;
}
