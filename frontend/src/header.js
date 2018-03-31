import React from 'react';
import './stylesheets/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = { query: ''};

    this.update = this.update.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  update(e) {
    this.setState({ query: e.target.value }, () => {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = setTimeout(this.handleSearch, 1000);
    });
  }

  handleSearch() {
    console.log('handling the search');
    this.props.search(this.state.query);
  }

  render() {
    return (
      <div className='container'>
        <div className='content'>
          <div className='logo' onClick={this.props.logoClick}>
            <h1>LhMDb</h1>
            <h6>Localhost Movie Database</h6>
          </div>
          <input
            className='search-bar'
            placeholder={'Search movies by title...'}
            value={this.state.query}
            onChange={e => this.update(e)}
          />
          <button
            className='new-button'
            onClick={this.props.toggleForm}
            disabled={this.props.selected}
            style={
              this.props.selected ? {
                backgroundColor: '#3d563e',
                color: 'white',
                borderColor: 'white',
                opacity: '.5'
              } : {}
            }>
            Add New Movie
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
