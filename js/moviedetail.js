import { getStorage, setStorage } from "./storage.js";
import { append, create, select } from "./util.js";

export function movieDetail({
  poster_path,
  title,
  genres,
  release_date,
  vote_average,
  id,
  overview,
}) {
  const $movieCover = create("div", "movie-cover");
  const $movieDetail = select("#detail-page");
  const temp_html = `
  <div class="movie-card">
    <div class="movie-img-box">
      <div class="movie-img">
        <img
          src="https://image.tmdb.org/t/p/w200${poster_path}"
          class="display-medium on-primary front-card"
          art="${title}" />
      <div class="tertiary back-card">
        <div class="heart">♥</div>
        <div class="fixed-heart">♥</div>
      </div>
    </div>
  </div>
  <div class="title-large tertiary-container-text movie-body">
    <div class="text-body">
      <div><span class="text-gap">영화제목</span><span>${title}</span></div>
      <div><span>영화개봉일</span><span>${release_date}</span></div>
      <div><span class="text-gap">영화장르</span><span>${
        genres[0].name
      }</span></div>
      <div><span class="text-gap">영화평점</span><span>★ ${Number(
        vote_average,
      ).toFixed(1)}</span></div>
    </div>
</div>
  </div>
  <div class="movie-summary">
    <div class="summary-title">
      <h1>줄거리</h1>
    </div>
    <p class="summary-content">${overview}</p>
  </div>
`;
  $movieCover.insertAdjacentHTML("beforeend", temp_html);
  $movieDetail.innerHTML = "";
  append($movieDetail, $movieCover);

  const $image = $movieDetail.querySelector(".back-card"),
    $heartIcon = $movieDetail.querySelector(".heart"),
    $fixedHeartIcon = $movieDetail.querySelector(".fixed-heart");

  $image.addEventListener("click", (e) => {
    $heartIcon.classList.add("active");
    const likes = new Set(getStorage("likes") || []);

    if ($fixedHeartIcon.style.color === "red") {
      const removedIds = [
        ...new Set([...likes].filter((likeId) => likeId !== id)),
      ];
      setStorage("likes", removedIds);
      $fixedHeartIcon.style.color = "rgb(171, 171, 171)";
    } else {
      const nextIds = [...new Set([...likes].concat(id))];
      setStorage("likes", nextIds);
      $fixedHeartIcon.style.color = "red";
      $fixedHeartIcon.style.opacity = "1";
    }

    let timeout = setTimeout(() => {
      $heartIcon.classList.remove("active");
      clearTimeout(timeout);
    }, 1000);
  });
  return $movieDetail;
}
