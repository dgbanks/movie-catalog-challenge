import React from 'react';
import Header from './header';
import MovieIndex from './movie_index';
import MovieDetail from './movie_detail';
import MovieForm from './movie_form';
import * as API from './api_utils';
import './stylesheets/App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.select = this.select.bind(this);
    this.search = this.search.bind(this);
    this.addNew = this.addNew.bind(this);
  }

  componentDidMount() {
    API.fetchMovies().then(
      response => {
        this.setState({ recent: response.data });
      }
    );
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
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

  addNew(movie) {
    if (movie) {
      if (movie.id) {
        API.editMovie(movie).then(response => console.log(response));
      } else {
        API.createMovie(movie).then(response => {
          const recent = this.state.recent;
          recent.unshift(response.data);
          if (recent.length > 10) {
            recent.pop();
          }
          this.setState({
            new: false,
            selected: response.data,
            recent: recent
          });
        });
      }
    } else {
      this.setState({ new: !this.state.new });
    }
  }

  render() {

    if (!this.state.recent && !this.state.search) {
      return <div>Loading movies...</div>;
    }

    return (
      <div className="App">
        <Header
          search={this.search}
          addNew={this.addNew}
        />

        <div className='body'>
          {
            this.state.new || this.state.selected ?
              <h3></h3> : this.state.search ?
                <h3>Search Results:</h3> : <h3>Recently Updated:</h3>
          }

          {
            this.state.new ?
            <MovieForm
              addNew={this.addNew}
            /> :
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
