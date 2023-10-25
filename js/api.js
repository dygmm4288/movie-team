const URL = 'https://api.themoviedb.org/3/movie/';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmNiMjlkMmVlNjdlYTA4YmViOGNmYTZjNDgwN2U5ZiIsInN1YiI6IjYzMjZmY2E1YmJkMGIwMDA3YWIyZDFhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1okNPsyrlmf3E4dvehvoe3NQNwMf_gROe3HaFYivZqk',
  },
};
function get(url) {
  return fetch(url, options).then((response) => response.json());
}
function generateMovieListUrl(type, language = 'ko') {
  return URL + type + `?language=${language}`;
}
export function getTopRatedMovies() {
  return get(URL + generateMovieListUrl('top_rated'));
}
export function getPopular() {
  return get(URL + generateMovieListUrl('popular'));
}
export function getNowPlaying() {
  return get(URL + generateMovieListUrl('now_playing'));
}
export function getUpcoming() {
  return get(URL + generateMovieListUrl('upcoming'));
}
