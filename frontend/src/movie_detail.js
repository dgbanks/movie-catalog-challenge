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

        <h1>{movie.title}</h1>

        <div className='info'>
          {
            movie.release_date ?
            <div>
              <h4>Released:</h4>
              <p>{new Date(movie.release_date).toDateString()}</p>
            </div>
            : null
          }

          {
            movie.genres.length > 0 ?
            <div>
              <h4>Genres:</h4>
              {movie.genres.map((genre, index) =>
                <p key={index}>{genre}</p>
              )}
            </div> : null
          }
        </div>

        <div className='story'>
          <h4>Synopsis:</h4>
          {
            movie.storyline ? <p>{movie.storyline}</p> : <p>Synopsis needed</p>
          }
        </div>

        {
          movie.imdb_link ? <a href={movie.imdb_link}>View on IMDb</a> : null
        }

      </div>
    );
  }
}

export default MovieDetail;
