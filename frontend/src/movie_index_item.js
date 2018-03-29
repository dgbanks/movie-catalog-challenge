import React from 'react';
import './stylesheets/movies.css';

class MovieIndexItem extends React.Component {
  render() {
    return (
      <div className='item'>
        <h1>{this.props.movie.title}</h1>
      </div>
    );
  }
}

export default MovieIndexItem;
