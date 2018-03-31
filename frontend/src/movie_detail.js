import React from 'react';
import './stylesheets/detail.css';

class MovieDetail extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchMovie(this.props.movie.id).then(
      response => this.setState({ movie: response.data })
    );
  }

  render() {
    if (!this.state.movie) {
      return <div>Fetching movie details...</div>;
    }

    const movie = this.state.movie;

    return (
      <div className='detail'>
        <div className='options'>
          <button onClick={this.props.select}>Back</button>
          <button onClick={this.props.toggleForm}>Edit</button>
        </div>

        <div>
          <h1>{movie.title}</h1>
          {
            movie.imdb_link ? <a href={movie.imdb_link}>View on IMDb</a> : null
          }
        </div>

        {
          movie.release_date ? <h4>Release: {movie.release_date}</h4> : null
        }

        {
          movie.genres.length > 0 ?
          <div>
            <h4>Genres</h4>
            {movie.genres.map(genre =>
              <h3>genre</h3>
            )}
          </div> : null
        }

        {
          movie.storyline ? <h4>Synopsis: {movie.storyline}</h4> : null
        }

      </div>
    );
  }
}

export default MovieDetail;
