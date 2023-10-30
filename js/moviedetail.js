import { append, create, select } from "./util.js";
import { setStorage, getStorage } from "./storage.js";

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
  <div class="title-large tertiary-container-text movie-body">
    <div class="text-body">
      <div><span class="text-gap">영화제목</span><span>${movie.title}</span></div>
      <div><span>영화개봉일</span><span>${movie.release_date}</span></div>
      <div><span class="text-gap">영화장르</span><span>${movie.genres[0].name}</span></div>
      <div><span class="text-gap">영화평점</span><span>★ ${Number(movie.vote_average).toFixed(1)}</span></div>
    </div>
    </div>
  </div>
<div class="movie-summary">
  <div class="summary-title"><h1>줄거리</h1></div>
  <p class="summary-content">${movie.overview}</p>
</div>`;
  $movieCover.insertAdjacentHTML("beforeend", temp_html);
  $movieDetail.innerHTML = "";
  append($movieDetail, $movieCover);

  const $image = document.querySelector(".back-card"),
    $heartIcon = document.querySelector(".heart");
  const $fixedHeartIcon = document.querySelector('.fixed-heart');

  $image.addEventListener("click", (e) => {
    $heartIcon.classList.add("active");

    if ($fixedHeartIcon.style.color === 'red') {
      setStorage(
        'likes',
        [...new Set(getStorage('likes') || [])].filter((v) => v !== movie.id),
      );

      $fixedHeartIcon.style.color = 'rgb(171, 171, 171)';
    } else {
      setStorage('likes', [...new Set(getStorage('likes'))].concat(movie.id));
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
