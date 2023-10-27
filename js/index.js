import { Comment } from './comment/Comment.js';
import { CommentList } from './comment/CommentList.js';
import { handleLocation, renderHome, renderMovieDetail } from './page.js';
import { routing } from './router.js';
import { showDetail } from './slider/slider.js';
import { append } from './util.js';
import { validateBasic } from './validation.js';

export const API_KEY = 'api_key=c929b1fb9912e2f89022f61946d45cac';
export const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Variables
const orderRateBtn = document.querySelector('.order-rate');
const orderAlphabetBtn = document.querySelector('.order-alphabet');
const resetBtn = document.querySelector('.order-init');

getMovies(API_URL);

// 영화 가져오는 함수
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // 초기 화면
      console.log(data);
      showMovies(data.results);

      // 평점순 정렬 데이터 ->
      let sortedByRate = [...data.results].sort((a, b) => {
        return b.vote_average - a.vote_average;
      });

      // 가나다순 정렬 데이터
      let sortedByAlpha = data.results.slice(0).sort((a, b) => {
        const upperCaseA = a.title.toUpperCase();
        const upperCaseB = b.title.toUpperCase();
        return upperCaseA > upperCaseB ? 1 : upperCaseA < upperCaseB ? -1 : 0;
      });

      // 각각의 정렬 버튼 클릭 시 함수 실행
      resetBtn.addEventListener('click', () => showMovies(data.results)); // 기본
      orderRateBtn.addEventListener('click', () => showMovies(sortedByRate));
      orderAlphabetBtn.addEventListener('click', () =>
        showMovies(sortedByAlpha),
      );
    });
}

// 영화 검색하는 함수
export function searchMovies(url, inputValue) {
  main.innerHTML = ''; // 함수가 실행될때마다 html을 빈 문자열로 설정
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const filtered = [];
      for (let i = 0; i < data.results.length; i++) {
        const item = data.results[i];
        if (!item.title.toLowerCase().includes(`${inputValue}`)) {
          continue;
        }
        filtered.push(item);
      }

      if (filtered.length === 0) {
        showMovies([...data.results]);
        alert('일치하는 결과가 없습니다');
      } else {
        showMovies(filtered);
      }
    });
}

function showMovies(data) {
  main.innerHTML = '';
  let i = 0;
  while (i < data.length) {
    const movie = data[i++];
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.addEventListener('click', handleLocation(`detail?movieId=${id}`));

    movieEl.dataset.vote_score = vote_average;
    movieEl.innerHTML = `
      <div class="cardlist-heart-btn">
    <div class="cardlist-content" id = "${id}">
      <span class="cardlist-heart"></span>
      <span class="cardlist-num"></span>
    </div>
    </div>
    <img src="${IMG_URL + poster_path}" alt="${title}">
    <div class="cardlist-movie-info">
      <h3>${title}</h3>
      <span>${vote_average}</span>
    </div>
      <div class="cardlist-overview">
        ${overview}
      </div>
    `;

    main.appendChild(movieEl);
  }
}

// 디테일 페이지

renderHome();
export const router = [
  {
    path: '/',
    render: () => {
      renderHome();
    },
  },
  {
    path: '/detail',
    render: async () => {
      const movieId = new URLSearchParams(location.search).get('movieId');
      const movie = await fetch(
        BASE_URL + `/movie/${movieId}?language=en-US&` + API_KEY,
      ).then((response) => response.json());
      const images = await fetch(
        BASE_URL + `/movie/` + String(movieId) + '/images?' + API_KEY,
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
document.querySelectorAll('a').forEach((elem) =>
  elem.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      history.pushState(e.target.href, null, e.target.href);
      routing(router);
    }
  }),
);
window.addEventListener('popstate', (e) => {
  console.log(e, e.state);
  switch (e.state) {
    case '/':
      renderHome();
      break;
    default:
      routing(router);
      break;
  }
});
// search event
const form = document.querySelector('.search-form');
const headerInput = document.querySelector('.search-input');
function handleSearch(e) {
  e.preventDefault();
  if (!validateBasic(headerInput.value)) {
    alert('검색어를 입력하세요');
  } else {
    searchMovies(API_URL, headerInput.value);
    history.pushState('/', '', '/');
    routing(router);
  }
  headerInput.value = '';
}
form.addEventListener('submit', handleSearch);

console.log(window.location);
