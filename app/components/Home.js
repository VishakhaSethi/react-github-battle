import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return(
      <div className='home-container'>
        <h1>Github Battle: Battle your friends</h1>
        <Link className='button' to='/battle'>Battle</Link>
      </div>
    )
  }
}

module.exports = Home;