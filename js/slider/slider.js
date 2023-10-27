import { append, create } from '../util.js';

/* 
const urlParams = new URLSearchParams(window.location.search);
const initValue = urlParams.get("id");
showDetail(initValue)
 */

export function showDetail(backDrops) {
  //   const prevBtn = document.querySelector('.prev-button');
  //  const slideContainer = document.querySelector('.movie-slider-wrapper');
  //const nextBtn = document.querySelector('.next-button');
  const sliderWrapper = create('div', 'slider-wrapper');
  const prevBtn = create('button', 'prev-button');
  const nextBtn = create('button', 'next-button');
  const slideContainer = create('div', 'movie-slider-wrapper');
  const movieSliderContainer = create('div', 'movie-slider-container');

  prevBtn.innerText = '⬅️';
  nextBtn.innerText = '➡️';

  append(sliderWrapper, movieSliderContainer);
  append(movieSliderContainer, [slideContainer, prevBtn, nextBtn]);

  let initPosition = 0;
  let itemLength = 0;

  backDrops.forEach((el) => {
    const slideItem = create('div', 'movie-slide-item');
    // console.log('slide container is : ', slideContainer);
    slideContainer.append(slideItem);
    slideItem.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w1280/${el.file_path}"/>`;

    slideContainer.style.width = `${(backDrops.length * 100)}vw`; // 300vw
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
    }
  }

  // 이미지 뒤로
  function movePrev(slideContainer) {
    if (itemLength > 0) {
      itemLength--;
      initPosition += 100;
      slideContainer.style.transform = `translateX(${initPosition}vw)`;
    }
  }

  // 이미지 자동 슬라이드
  /* setInterval(() => {
          moveNext(slideContainer, data.posters);
        }, 5000) */
  return sliderWrapper;
}
