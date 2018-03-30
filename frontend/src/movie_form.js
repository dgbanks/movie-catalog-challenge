import React from 'react';
import './stylesheets/form.css';

class MovieForm extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.movie) {
      const movie = this.props.movie;
      this.setState({
        id: movie.id,
        title: movie.title,
        storyline: movie.storyline,
        release_date: movie.release_date,
        imdb_link: movie.imdb_link,
        genres: movie.genres
      });
    }
  }

  updateField(e) {
    console.log(new Date(e.target.value));
  }

  handleCheckbox(e) {
    const newGenre = e.target.value;
    const currentGenres = this.state.genres || [];
    if (currentGenres.includes(newGenre)) {
      this.setState({ genres: currentGenres.filter(genre => genre !== newGenre)})
    } else {
      currentGenres.push(newGenre);
      this.setState({ genres: currentGenres});
    }
  }

  submitForm() {

  }

  render() {
    console.log(this.state);

    return (
      <div className='form'>

        <label>Title
          <input
            onChange={e => this.setState({title: e.target.value})}
          />
        </label>

        <label>Storyline
          <textarea
            onChange={e => this.setState({storyline: e.target.value})}
          />
        </label>

        <label>Release Date
          <input
            type='date'
            onChange={e => this.setState({ release_date: new Date(e.target.value) })}
          />
        </label>

        <label>IMDb Link
          <input
            onChange={e => this.setState({imdb_link: e.target.value})}
          />
        </label>

        <label className='genre'>Genre
          <div>
          {
            genres.map((genre, index) =>
              <label key={index} className='checkbox'>
                <input
                  value={genre}
                  type='checkbox'
                  onChange={e => this.handleCheckbox(e)}
                />
                {genre}
              </label>
            )
          }
          </div>
        </label>

        <div className='buttons'>
          <button
            disabled={Boolean(!this.state.title)}
            style={ this.state.title ? {} : {backgroundColor:'lightgray'}}
            onClick={() => this.props.addNew(this.state)}>
            Save
          </button>
          <button onClick={() => this.props.addNew(null)}>Cancel</button>
        </div>

      </div>
    );
  }
}

export default MovieForm;

const genres = [
  'Action', 'Adventure', 'Biographical', 'Comedy', 'Documentary', 'Drama',
  'Epic', 'Fantasy', 'Noir', 'Horror', 'Musical', 'Mystery', 'Romance',
  'Science Fiction', 'Thriller'
];
