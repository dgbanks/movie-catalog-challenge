import React from 'react';
import './stylesheets/movies.css';

class MovieIndexItem extends React.Component {
  render() {
    const movie = this.props.movie;
    return (
      <div className='item' onClick={() => this.props.select(movie)}>
        <h2>{movie.title}</h2>
        { movie.year ? (<h2>{movie.year}</h2>) : null }
      </div>
    );
  }
}

export default MovieIndexItem;
