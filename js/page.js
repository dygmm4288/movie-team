import { router } from './index.js';
import { movieDetail } from './moviedetail.js';
import { routing } from './router.js';

const main = document.querySelector('#main');
const detailPage = document.querySelector('#detail-page');
export function renderHome() {
  detailPage.style.display = 'none';
  main.style.display = '';
}
export function renderMovieDetail(movie) {
  main.style.display = 'none';
  detailPage.style.display = '';
  return movieDetail(movie);
}
/* router */

export function handleLocation(link) {
  return (e) => {
    e.preventDefault();
    history.pushState(null, null, window.location.href + link);
    routing(router);
  };
}
