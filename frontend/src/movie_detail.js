import React from 'react';

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

    return (
      <div>
        <button onClick={this.props.select}>Back</button>
        <h1>{this.props.movie.title}</h1>
      </div>
    );
  }
}

export default MovieDetail;
