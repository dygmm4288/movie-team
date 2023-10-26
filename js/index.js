// import { CommentList } from './comment/CommentList.js';

import { handleLocation, renderHome, renderMovieDetail } from './page.js';
import { routing } from './router.js';

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
  main.innerHTML = '';  // 함수가 실행될때마다 html을 빈 문자열로 설정
  fetch(url).then(res => res.json())
    .then(data => {
      let filtered = [...data.results].filter(item => (item.title).toLowerCase().includes(`${inputValue}`))

      if (filtered.length === 0) {
        showMovies([...data.results]);
        alert('일치하는 결과가 없습니다')
      }
      else {
        showMovies(filtered);
      }
    })
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
    <button class="cardlist-btn" type="button">
    <img class="cardlist-goodicon" src="data:image/png;base64,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"></button>
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

// 디테일 페이지
export function showDetail(movieId) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjgyMzdlYWMxZjdiYWVlNjJiZjJmYWY1Njc4YzAyZiIsInN1YiI6IjY1MmY3MWZkMGNiMzM1MTZmNjQwYzEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GEIWqP736DYrah_tW9saUYSksPkL_PNWinkd8U2iuig'
    }
  };
  const prevBtn = document.querySelector('.prev-button');
  const slideContainer = document.querySelector('.movie-slider-wrapper');
  const nextBtn = document.querySelector('.next-button');
  let initPosition = 0;
  let itemLength = 0;

  fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.backdrops.forEach((el, i) => {
        const slideItem = document.createElement('div'); // Element
        const slideContainer = document.querySelector('.movie-slider-wrapper');

        slideContainer.append(slideItem);
        slideItem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w1280/${el.file_path}"/>`;

        slideContainer.style.width = `${data.backdrops.length * 100}vw` // 300vw
        slideItem.style.width = `${data.backdrops.length * 100 / data.backdrops.length}vw` // 100vw
      })


      // 이벤트 리스너
      nextBtn.addEventListener('click', () => moveNext(slideContainer, data.backdrops))
      prevBtn.addEventListener('click', () => movePrev(slideContainer))


      // 이미지 앞으로
      function moveNext(slideContainer, slideItem) {
        if (itemLength < slideItem.length - 1) {
          itemLength++;
          initPosition -= 100;
          slideContainer.style.transform = `translateX(${initPosition}vw)`
        }
      }

      // 이미지 뒤로
      function movePrev(slideContainer) {
        if (itemLength > 0) {
          itemLength--;
          initPosition += 100
          slideContainer.style.transform = `translateX(${initPosition}vw)`
        }
      }

      // 이미지 자동 슬라이드
      setInterval(() => {
        moveNext(slideContainer, data.posters);
      }, 5000)
    })
}

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
      console.log(movieId, movie);
      renderMovieDetail(movie);
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
