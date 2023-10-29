import { getStorage } from '../storage.js';
import { append, create, select } from '../util.js';

const MOVIE_ID = 'movieId';
export function showDetail(backDrops) {
  const movieId = new URLSearchParams(location.search).get(MOVIE_ID);

  if (getStorage('likes').find((el) => el === Number(movieId))) {
    const fixedHeart = select('.fixed-heart');
    fixedHeart.style.color = 'red';
    fixedHeart.style.opacity = '1';
  }
  const sliderWrapper = create('div', 'slider-wrapper');
  const prevBtn = create('button', 'prev-button');
  const nextBtn = create('button', 'next-button');
  const slideContainer = create('div', 'movie-slider-wrapper');
  const movieSliderContainer = create('div', 'movie-slider-container');

  prevBtn.innerText = '⬅️';
  nextBtn.innerText = '➡️';

  append(sliderWrapper, movieSliderContainer);
  append(movieSliderContainer, [slideContainer, prevBtn, nextBtn]);

  let initPosition = 0,
    itemLength = 0;

  backDrops.forEach((el) => {
    const slideItem = create('div', 'movie-slide-item');
    append(slideContainer, slideItem);
    slideItem.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w1280/${el.file_path}"/>`;
    slideContainer.style.width = `${backDrops.length * 100}vw`; // 300vw
    slideItem.style.width = `${(backDrops.length * 100) / backDrops.length}vw`; // 100vw
  });

  // 이벤트 리스너
  nextBtn.addEventListener('click', () => moveNext(slideContainer, backDrops));
  prevBtn.addEventListener('click', () => movePrev(slideContainer));

  // 이미지 앞으로
  function moveNext(slideContainer, slideItem) {
    if (itemLength < slideItem.length - 1) {
      itemLength++;
      initPosition -= 100;
      slideContainer.style.transform = `translateX(${initPosition}vw)`;
      if (itemLength === slideItem.length) {
        itemLength = initPosition = 0;
      }
    }
  }
  // 이미지 뒤로
  function movePrev(slideContainer) {
    if (itemLength > 0) {
      itemLength--;
      initPosition += 100;
      slideContainer.style.transform = `translateX(${initPosition}vw)`;
      if (itemLength > 0) {
        itemLength = backDrops.length;
        initPosition = backDrops.length * 100;
      }
    }
  }
  return sliderWrapper;
}
