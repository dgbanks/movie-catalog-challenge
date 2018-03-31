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

    this.fetchRecent = this.fetchRecent.bind(this);
    this.select = this.select.bind(this);
    this.search = this.search.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchRecent();
  }

  fetchRecent() {
    API.fetchMovies().then(
      response => {
        this.setState({ recent: response.data });
      }
    );
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

  toggleForm() {
    this.setState({ edit: !this.state.edit });
  }

  async handleSubmit(movie) {
    let response, recent;
    if (movie.id) {
      response = await API.editMovie(movie);
      console.log(response);
      recent = this.state.recent;
      recent.map(movie => {
        if (movie.id === response.data.id) {
          console.log('FOUNDMATCH');
          return response.data
        }
      });
    } else {
      response = await API.createMovie(movie);
      recent = this.state.recent;
      recent.unshift(response.data);
      if (recent.length > 10) {
        recent.pop();
      }
    }
    console.log(response);
    this.setState({
      edit: false,
      selected: response.data,
      recent: recent
    });
  }

  render() {

    if (!this.state.recent && !this.state.search) {
      return <div>Loading movies...</div>;
    }

    return (
      <div className="App">
        <Header
          search={this.search}
          toggleForm={this.toggleForm}
          selected={Boolean(this.state.selected)}
        />

        <div className='body'>
          {
            this.state.edit || this.state.selected ?
              <h3></h3> : this.state.search ?
                <h3>Search Results:</h3> : <h3>Recently Updated:</h3>
          }

          {
            this.state.edit ?
            <MovieForm
              movie={this.state.selected}
              toggleForm={this.toggleForm}
              handleSubmit={this.handleSubmit}
            /> :
            this.state.selected ?
            <MovieDetail
              movie={this.state.selected}
              select={this.select}
              fetchMovie={API.fetchMovie}
              toggleForm={this.toggleForm}
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
