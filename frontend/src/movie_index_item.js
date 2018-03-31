import React from 'react';
import './stylesheets/movies.css';

class MovieIndexItem extends React.Component {
  render() {
    const movie = this.props.movie;
    return (
      <div className='item' onClick={() => this.props.select(movie)}>
        <h2>{movie.title}</h2>
        {
          movie.release_date ?
          <h3>({new Date(movie.release_date).getUTCFullYear()})</h3> :
          null
        }
      </div>
    );
  }
}

export default MovieIndexItem;
