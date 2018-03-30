import React from 'react';
import './stylesheets/form.css';

class MovieForm extends React.Component {
  render() {
    // title, storyline, release_date, genre, imdb_link
    return (
      <div className='form'>
        <label>Title<input/></label>

        <label>Storyline<textarea/></label>

        <label>Release Date<input/></label>

        <label>Genre
          {
            genres.map(genre =>
              <label>
                <input value={genre} type='checkbox'/>{genre}
              </label>
            )
          }
        </label>

        <label>IMDb Link<input/></label>
      </div>
    );
  }
}

export default MovieForm;

const genres = [
  'Action', 'Adventure', 'Biographical', 'Comedy', 'Documentary', 'Drama',
  'Epic', 'Fantasy', 'Noir', 'Horror', 'Musical', 'Mystery', 'Romance',
  'Science Fiction', 'Thriller'
];
