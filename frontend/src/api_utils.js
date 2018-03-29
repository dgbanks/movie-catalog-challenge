import axios from 'axios';

export const fetchMovies = (query) => {
  if (query) {
    return axios.post('http://localhost:3000/search', { query });
  } else {
    return axios.get('http://localhost:3000/movies');
  }
};

export const createMovie = movie => (
  axios.post('http://localhost:3000/movies', { movie })
);

export const editMovie = movie => (
  axios.patch(`http://localhost:3000/movies/${movie.id}`, { movie })
);

export const deleteMovie = movieId => (
  axios.delete('http://localhost:3000/movies/${movieId}')
);
