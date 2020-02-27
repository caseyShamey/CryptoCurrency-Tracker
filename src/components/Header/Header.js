import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <p>{this.props.name}</p>
  }
}

export default Header;