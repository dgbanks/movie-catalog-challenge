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
    this.logoClick = this.logoClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchRecent();
  }

  fetchRecent() {
    API.fetchMovies().then(
      response => {
        this.setState({
          recent: response.data,
          edit: false,
          selected: null
        });
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
    if (string) {
      API.fetchMovies(string).then(
        response => this.setState({ query: string, search: response.data })
      );
    } else {
      this.setState({ query: '', search: [] });
    }
  }

  toggleForm() {
    this.setState({ edit: !this.state.edit });
  }

  logoClick() {
    this.setState({ edit: false, selected: null });
  }

  async handleSubmit(movie) {
    let response;
    let recent = this.state.recent;
    if (typeof(movie) === 'number') {
      await API.deleteMovie(movie);
      this.fetchRecent();
    } else {
      if (movie.id) {
        response = await API.editMovie(movie);
        recent = recent.filter(movie => movie.id !== response.data.id);
      } else {
        response = await API.createMovie(movie);
      }

      recent.unshift(response.data);
      if (recent.length > 10) {
        recent.pop();
      }

      this.setState({
        selected: response.data,
        edit: false,
        recent: recent
      });
    }
  }

  render() {

    if (!this.state.recent && !this.state.search) {
      return <div>Loading movies...</div>;
    }

    const validSearch = this.state.search && this.state.query;

    return (
      <div className="App">
        <Header
          search={this.search}
          toggleForm={this.toggleForm}
          selected={Boolean(this.state.selected)}
          logoClick={this.logoClick}
        />

        <div className='body'>
          {
            this.state.edit || this.state.selected ? 
            <h3> </h3> :
            validSearch ? (
              this.state.search.length === 0 ?
              <h3>No Matches Found</h3> :
              <h3>Search Results:</h3>
            ) : (
              this.state.recent.length > 0 ?
              <h3>Recently Updated:</h3> :
              <h3>No Movies Found</h3>
            )
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
              movies={validSearch ? this.state.search : this.state.recent}
              select={this.select}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
