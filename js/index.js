// import { CommentList } from './comment/CommentList.js';

import { handleLocation, renderHome, renderMovieDetail } from './page.js';
import { routing } from './router.js';
import { showDetail } from './slider/slider.js';
import { append } from './util.js';

// // document.body.insertAdjacentElement('afterbegin', Comment(123).render());
//document.querySelector('#detail-page').append(CommentList(123).render());

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
      let sortedByAlpha = [...data.results].sort((a, b) => {
        const upperCaseA = a.title.toUpperCase();
        const upperCaseB = b.title.toUpperCase();

        if (upperCaseA > upperCaseB) return 1;
        if (upperCaseA < upperCaseB) return -1;
        if (upperCaseA === upperCaseB) return 0;
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
      let filtered = [...data.results].filter((item) =>
        item.title.toLowerCase().includes(`${inputValue}`),
      );

      if (filtered.length === 0) {
        showMovies([...data.results]);
        alert('일치하는 결과가 없습니다');
      } else {
        showMovies(filtered);
      }
    });
}

//영화 보여주는 함수
function showMovies(data) {
  main.innerHTML = ''; // 함수가 실행될때마다 html을 빈 문자열로 설정

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.addEventListener('click', handleLocation(`detail?movieId=${id}`));

    // 평점 기준 정렬을 위해 추가
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
  });
}


$(document).ready(function(){             // 상세 페이지 좋아요 버튼
  $('.cardlist-content').click(function(){
    var btn = $(this);
    var id_val = btn.prop('id');
    $('#'+id_val+'>.cardlist-content').toggleClass("heart-active")
    $('#'+id_val+'>.cardlist-num').toggleClass("heart-active")
    $('#'+id_val+'>.cardlist-heart').toggleClass("heart-active")
  });
});

// 디테일 페이지

renderHome();
export const router = [
  {
    path: '/',
    render: () => {
      // 홈 페이지 일 경우에 보여줘야하는 것을 보여준다.
      // console.log(window.href, window.location);
      renderHome();
    },
  },
  {
    path: '/detail',
    render: async () => {
      // detail 페이지를 랜더링 한다.

      const movieId = new URLSearchParams(location.search).get('movieId');
      const movie = await fetch(
        BASE_URL + `/movie/${movieId}?language=en-US&` + API_KEY,
      ).then((response) => response.json());
      const images = await fetch(
        BASE_URL + `/movie/${movieId}/images?` + API_KEY,
      ).then((response) => response.json());

      //console.log(movieId, movie);
      // console.log('movie detail is : ', renderMovieDetail(movie));
      // console.log('slide is : ', showDetail(images.backdrops));
      append(renderMovieDetail(movie), showDetail(images.backdrops));
      //showDetail(images.backdrops);
    },
  },
];
document.querySelectorAll('a').forEach((elem) =>
  elem.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      routing(router);
    }
  }),
);
