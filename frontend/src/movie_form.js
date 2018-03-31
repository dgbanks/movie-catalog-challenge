import React from 'react';
import './stylesheets/form.css';

class MovieForm extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.updateField = this.updateField.bind(this);
  }

  componentWillMount() {
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
    switch (e.target.name) {
      case 'Title':
        this.setState({ title: e.target.value });
        break;
      case 'Storyline':
        this.setState({ storyline: e.target.value });
        break;
      case 'Release Date':
        this.setState({ release_date: e.target.value });
        break;
      case 'IMDb Link':
        this.setState({ imdb_link: e.target.value });
        break;
      case 'Genre':
        const newGenre = e.target.value;
        const currentGenres = this.state.genres || [];
        if (currentGenres.includes(newGenre)) {
          this.setState({ genres: currentGenres.filter(genre =>
            genre !== newGenre
          )});
        } else {
          currentGenres.push(newGenre);
          this.setState({ genres: currentGenres});
        }
        break;
    }
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

  render() {
    console.log(this.state);

    return (
      <div className='form'>

        <label>Title
          <input
            name='Title'
            value={this.state.title}
            onChange={this.updateField}
          />
        </label>

        <label>Storyline
          <textarea
            name='Storyline'
            value={this.state.storyline || ''}
            onChange={this.updateField}
          />
        </label>

        <label>Release Date
          <input
            name='Release Date'
            type='date'
            value={this.state.release_date || new Date()}
            onChange={this.updateField}/>
        </label>

        <label>IMDb Link
          <input
            name='IMDb Link'
            value={this.state.imdb_link || ''}
            onChange={this.updateField}
          />
        </label>

        <label className='genre'>Genre
          <div>
          {
            genres.map((genre, index) =>
              <label key={index} className='checkbox'>
                <input
                  name='Genre'
                  value={genre}
                  type='checkbox'
                  onChange={this.updateField}
                />
                {genre}
              </label>
            )
          }
          </div>
        </label>

        <div className='buttons'>
          <button disabled={Boolean(!this.state.title)}
            style={ this.state.title ? {} : { backgroundColor:'lightgray' }}
            onClick={() => this.props.handleSubmit(this.state)}
          >Save</button>

          <button style={ this.state.id ? {} : { display: 'none'} }
            onClick={() => this.props.handleSubmit(this.state.id)}
          >Delete</button>

          <button onClick={this.props.toggleForm}>Cancel</button>
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
