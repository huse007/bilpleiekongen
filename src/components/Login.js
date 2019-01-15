import React from 'react';
import Auth from '../auth/Auth.js';
const auth = new Auth();

class Login extends React.Component {

  render() {
		auth.login();
		return(
			<h1></h1>
		);
  }
}
export default Login;
