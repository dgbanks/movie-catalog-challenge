import React from 'react';
import './stylesheets/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  update(e) {
    this.setState({ query: e }.then(
      () => clearTimeout(setTimeout(this.props.search(), 1000))
    ));
  }

  render() {
    return (
      <div className='container'>
        <div className='content'>
          <div className='logo'>
            <h1>LhMDb</h1>
            <h6>Localhost Movie Database</h6>
          </div>
          <input
            className='search-bar'
            placeholder={'Search movies by title...'}
            value={this.state.query}
            onChange={e => this.update(e)}
          />
          <button className='new-button' onClick={()=>this.props.addNew(null)}>
            Add New Movie
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
