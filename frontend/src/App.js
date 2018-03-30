import React from 'react';
import Header from './header';
import MovieIndex from './movie_index';
import MovieDetail from './movie_detail';
import * as API from './api_utils';
import './stylesheets/App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.select = this.select.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    API.fetchMovies().then(
      response => {
        this.setState({ recent: response.data });
      }
    );
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  getMovies() {
    console.log('getMovies');
  }

  select(movie) {
    if (this.state.selected) {
      this.setState({ selected: null });
    } else {
      this.setState({ selected: movie });
    }
  }

  search(string) {
    API.fetchMovies(string).then(
      movies => this.setState({ search: movies })
    );
  }

  render() {
    console.log('state', this.state);

    if (!this.state.recent && !this.state.search) {
      return <div>Loading movies...</div>;
    }

    return (
      <div className="App">
        <Header
          search={this.search}
        />

        <div className='body'>
          { this.state.search ? <h3>Search Results:</h3> : <h3>Recently Updated:</h3> }

          {
            this.state.selected ?
            <MovieDetail
              movie={this.state.selected}
              select={this.select}
              fetchMovie={API.fetchMovie}
            /> :
            <MovieIndex
              movies={this.state.search ? this.state.search : this.state.recent}
              select={this.select}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
