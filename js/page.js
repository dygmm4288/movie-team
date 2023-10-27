import { router } from './index.js';
import { movieDetail } from './moviedetail.js';
import { routing } from './router.js';

const main = document.querySelector('#main');
const detailPage = document.querySelector('#detail-page');
const filterButton = document.querySelector('.filter-button');
export function renderHome() {
  detailPage.style.display = 'none';
  filterButton.style.display = '';
  main.style.display = '';
}
export function renderMovieDetail(movie) {
  main.style.display = 'none';
  filterButton.style.display = 'none';
  detailPage.style.display = '';
  return movieDetail(movie);
}
/* router */

export function handleLocation(link) {
  return (e) => {
    e.preventDefault();

    if (e.target.classList.contains('cardlist-heart')) {
      return;
    }
    console.log(link);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    history.pushState(link, null, window.location.href + link);
    routing(router);
  };
}
