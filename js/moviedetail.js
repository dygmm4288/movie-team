import { append, create, select } from "./util.js";
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
      <div><span class="text-gap">영화평점</span><span>★ ${movie.vote_average}</span></div>
    </div>
    </div>
  </div>
<div class="movie-summary">
  <div class="headline-medium tertiary-container-text">줄거리</div>
  <p class="body-large secondary-container-text">${movie.overview}</p>
</div>`;
  $movieCover.insertAdjacentHTML("beforeend", temp_html);
  $movieDetail.innerHTML = "";
  append($movieDetail, $movieCover);

  const $image = document.querySelector(".back-card"),
    $heartIcon = document.querySelector(".heart");

  $image.addEventListener("click", (e) => {
    $heartIcon.classList.add("active");

    let timeout = setTimeout(() => {
      $heartIcon.classList.remove("active");
      clearTimeout(timeout);
    }, 1000);
  });
  return $movieDetail;
}
