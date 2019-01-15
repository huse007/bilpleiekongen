import React, { Component } from 'react';
import loading from './loading.svg';
/* Callback function
 * Showing image while authenticating
 */
class Callback extends Component {
  render() {
    return (
	    <div>
	    <p>hei</p>
            <img src={loading} alt="loading"/>
	    </div>
    );
  }
}

export default Callback;
