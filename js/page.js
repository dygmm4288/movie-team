import { router } from "./index.js";
import { movieDetail } from "./moviedetail.js";
import { routing } from "./router.js";
import { select } from "./util.js";

// const main = select("#main");
// const detailPage = document.querySelector("#detail-page");
// const filterButton = document.querySelector(".filter-button");
export function renderHome() {
  const main = select("#main");
  const detailPage = document.querySelector("#detail-page");
  const filterButton = document.querySelector(".filter-button");
  detailPage.style.display = "none";
  filterButton.style.display = "";
  main.style.display = "";
}
export function renderMovieDetail(movie) {
  const main = select("#main");
  const detailPage = document.querySelector("#detail-page");
  const filterButton = document.querySelector(".filter-button");
  main.style.display = "none";
  filterButton.style.display = "none";
  detailPage.style.display = "";
  return movieDetail(movie);
}
/* router */

export function handleLocation(link) {
  return (e) => {
    e.preventDefault();
    console.log(link);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    history.pushState(link, null, window.location.href + link);
    routing(router);
  };
}
