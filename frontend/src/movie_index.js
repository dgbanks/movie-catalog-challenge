import React from 'react';
import MovieIndexItem from './movie_index_item';
import './stylesheets/movies.css';

class MovieIndex extends React.Component {
  render() {
    return (
      <div className='index'>
        {
          this.props.movies.map(movie =>
            <MovieIndexItem
              key={movie.id}
              movie={movie}
              select={this.props.select}
            />
          )
        }
      </div>
    );
  }
}

export default MovieIndex;
