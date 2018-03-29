import React from 'react';
import Header from './header';
import MovieIndex from './movie_index';
import MovieDetail from './movie_detail';
import * as API from './api_utils';
import './App.css';

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
    this.setState({ selected: movie });
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

        {
          this.state.selected ?
          <MovieDetail movie={this.state.selected} /> :
          <MovieIndex
            movies={this.state.search ? this.state.search : this.state.recent}
            select={this.select}
          />
        }
      </div>
    );
  }
}

export default App;
