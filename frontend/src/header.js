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
            onChange={e => this.update(e)}
          />
        </div>
      </div>
    );
  }
}

export default Header;
