import { Comment } from "./comment/Comment.js";
import { CommentList } from "./comment/CommentList.js";
import { renderHome, renderMovieDetail } from "./page.js";
import { routing } from "./router.js";
import { showDetail } from "./slider/slider.js";
import { API_KEY, API_URL, BASE_URL, getMovies } from "./tmdb.js";
import { append } from "./util.js";

/* SPA Router 관련 기능들  */
export const router = [
  {
    path: "/",
    render: () => {
      renderHome();
    },
  },
  {
    path: "/detail",
    render: async () => {
      const movieId = new URLSearchParams(location.search).get("movieId");
      const movie = await fetch(
        BASE_URL + `/movie/${movieId}?language=en-US&` + API_KEY,
      ).then((response) => response.json());
      const images = await fetch(
        BASE_URL + `/movie/${movieId}/images?` + API_KEY,
      ).then((response) => response.json());

      const commentList = new CommentList(movieId).render();
      const commentForm = new Comment(movieId).render();

      append(renderMovieDetail(movie), [
        showDetail(images.backdrops),
        commentForm,
        commentList,
      ]);
    },
  },
];
document.querySelectorAll("a").forEach((elem) =>
  elem.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(e.target.href, null, e.target.href);
      routing(router);
    }
  }),
);
window.addEventListener("popstate", (e) => {
  switch (e.state) {
    case "/":
      renderHome();
      break;
    default:
      routing(router);
      break;
  }
});
if (window.location.href.slice(-4) === "html") {
  window.location.href = window.location.href.slice(0, -10);
}

window.onload = () => {
  renderHome();
  getMovies(API_URL);
};
