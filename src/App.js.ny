import Auth from './auth/Auth.js';
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
//const auth=new Auth();
//auth.login();
import Navbar from './components/Navbar';
const url1 = 'http://localhost/bilpleiekongen/wp-json/';
const url = 'http://localhost/bilpleiekongen/wp-json/wp/v2/pages/';
const uri = 'http://localhost/bilpleiekongen/wp-json/wp/v2/settings';
const prod = 'http://localhost/bilpleiekongen/wp-json/wp/v2/product/?_embed';

class App extends Component {
    constructor(props) {
	super(props);
	this.state={
	    name: null,
            description: null,
	    data: null,
            data2: null,
	    products: null,
	}
    }
    goTo(route) {
	console.log("goTo");
	this.props.history.replace(`/bilpleie/${route}`)
  }

    login() {
	console.log("login");
	this.props.auth.login();
    }

    logout() {
	console.log("logout");
	this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }

      fetch(url)
            .then(response =>response.json())
	    .then(data => this.setState({data}));

        axios.options(uri)
            .then(function(response) {
                //console.log(response);

            }).catch(function(error) {
                console.log(error);
            }).then(function() {
                //always executed
            });
      var self = this;
        axios.get(url1)
            .then(function(response) {
		//console.log(response);
                self.setState({name:response.data.name,description:response.data.description});
	    }).catch(function(error) {
                console.log(error);
	    }).then(function() {
                //always executed
	    });
	axios.get(prod)
            .then(function(response) {
                self.setState({products:response.data});
            }).catch(function(error) {
            }).then(function() {
            });


  }

  render() {
    const { isAuthenticated } = this.props.auth;
      console.log("App");
    return (
      <div>
	    {!isAuthenticated() && (<Navbar name={this.state.name} status="Log in" description={this.state.description} data={this.state.data} pressed={this.login.bind(this)}/>)}
	{isAuthenticated() && (<Navbar name={this.state.name} status="Log out" description={this.state.description} data={this.state.data} pressed={this.logout.bind(this)}/>)}
      </div>
    );
  }
}

export default App;
