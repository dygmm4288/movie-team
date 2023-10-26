let movieEx = [
  {
    adult: false,
    backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    genre_ids: [18, 80],
    id: 238,
    original_language: 'en',
    original_title: 'The Godfather',
    overview:
      'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
    popularity: 110.264,
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    release_date: '1972-03-14',
    title: 'The Godfather',
    video: false,
    vote_average: 8.7,
    vote_count: 18811,
  },
];

movieEx.forEach((a) => {
  document.querySelector('.movie-cover').insertAdjacentHTML(
    'beforeend',
    `<div class="movie-card">
  <div class="movie-img-box">
    <div class="movie-img">
      <img
        src="${`https://image.tmdb.org/t/p/w200` + a.poster_path}"
        class="display-medium on-primary front-card"
        art="..." />
      <div class="tertiary back-card">
        <div class="heart">♥</div>
        </div>
      
    </div>
  </div>
  <div class="title-large tertiary-container-text movie-body1">
    <div class="text-gap">영화제목</div>
    <div class="text-gap">영화개봉일</div>
    <div class="text-gap">영화장르</div>
    <div class="text-gap">영화평점</div>
  </div>
  <div class="title-large tertiary-container-text movie-body2">
    <div class="text-gap">${a.title}</div>
    <div class="text-gap">${a.release_date}</div>
    <div class="text-gap">코미디</div>
    <div class="text-gap">★ ${a.vote_average}</div>
  </div>
</div>
<div class="movie-summary">
  <div class="headline-medium tertiary-container-text">줄거리</div>
  <p class="body-large secondary-container-text">${a.overview}</p>
</div>`,
  );
});

const image = document.querySelector('.back-card'),
  heartIcon = document.querySelector('.heart');

image.addEventListener('click', (e) => {
  console.log(e);

  // let xValue = e.clientX - e.target.offsetParent.offsetParent.offsetLeft;
  // let yValue = e.clientY - e.target.offsetParent.offsetParent.offsetTop;
  // heartIcon.style.left = `${xValue}px`
  // heartIcon.style.top = `${yValue}px`
  heartIcon.classList.add('active');

  setTimeout(() => {
    heartIcon.classList.remove('active');
  }, 1000);
});
