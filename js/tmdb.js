import { handleLocation } from './page.js';
import { getStorage, setStorage } from './storage.js';
import { append, create, select } from './util.js';

export const API_KEY = 'api_key=c929b1fb9912e2f89022f61946d45cac';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_URL =
  BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function getFetch(url) {
  try {
    const result = await fetch(url).then((res) => res.json());
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export function getMovies(url) {
  getFetch(url).then(({ results: movies }) => {
    const sortedByRate = [...movies].sort(
      (a, b) => b.vote_average - a.vote_average,
    );
    const sortedByAlpha = [...movies].slice(0).sort((a, b) => {
      const [upperCaseA, upperCaseB] = [a, b].map(({ title }) =>
        title.toUpperCase(),
      );
      return upperCaseA > upperCaseB ? 1 : upperCaseA < upperCaseB ? -1 : 0;
    });

    const orderRateBtn = select('.order-rate');
    const orderAlphabetBtn = select('.order-alphabet');
    const resetBtn = select('.order-init');

    const matched = new Map();
    matched.set(orderRateBtn, sortedByRate);
    matched.set(orderAlphabetBtn, sortedByAlpha);
    matched.set(resetBtn, movies);

    [orderRateBtn, orderAlphabetBtn, resetBtn].forEach((btn) => {
      btn.addEventListener('click', () => showMovies(matched.get(btn)));
    });

    showMovies(movies);
  });
}

function showMovies(movies) {
  const main = select('#main');
  main.innerHTML = '';
  let i = 0;

  while (i < movies.length) {
    const movie = movies[i++];
    const { title, poster_path, vote_average, overview, id } = movie;

    const movieEl = create('div', 'movie');
    movieEl.dataset.voteScore = vote_average;

    movieEl.innerHTML = `
        <div class="cardlist-heart-btn">
            <div class="cardlist-content" id="${id}">
                <span class="cardlist-heart"></span>
            </div>
        </div>
        <img src="${IMG_URL + poster_path}" alt="${title}"/>
        <div class="cardlist-movie-info">
            <h3>${title}</h3>
            <span> 평정 : ${String(vote_average).padEnd(2)}</span>
        </div>
        <div class="cardlist-overview">
            ${overview}
        </div>
    `;

    Array.from(movieEl.childNodes)[3].addEventListener(
      'click',
      handleLocation(`detail?movieId=${id}`),
    );

    // 이벤트 등록
    handleClickCardListHeart(movieEl.querySelector('.cardlist-heart'), id);

    append(main, movieEl);
  }
}

export function searchMovies(url, inputValue) {
  const filtered = [];
  const nextIds = [...new Set([...likes].concat(id))];
  getFetch(url).then(({ results: movies }) => {
    for (let i = 0; i < movies.length; i++) {
      const item = movies[i];
      if (!item.title.toLowerCase().includes(inputValue)) continue;
      filtered.push(item);
    }

    if (filtered.length === 0) {
      showMovies(movies);

      return alert('일치하는 결과가 없습니다!');
    }
    showMovies(filtered);
  });
}

function handleClickCardListHeart(cardListHeart, id) {
  const likes = new Set(getStorage('likes') || []);
  if (likes.has(id)) cardListHeart.classList.add('heart-active');

  cardListHeart.addEventListener('click', function () {
    if (cardListHeart.classList.contains('heart-active')) {
      const removedIds = [
        ...new Set([...likes].filter((likeId) => likeId !== id)),
      ];
      setStorage('likes', removedIds);
    } else {
      const nextIds = [...new Set([...likes].concat(id))];
      setStorage('likes', nextIds);
    }
    cardListHeart.classList.toggle('heart-active');
  });
}
