import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'; //Link
import './components/fonter.css';
import './App.css';
import  axios from 'axios';
import Navbar from './components/Navbar.js';
import Products from './components/Products.js';
import Minside from './components/Minside.js';
import Login from './components/Login.js';
import history from './history';
import Callback from './callback/Callback';

/* Url's and endpoint's */
const URL = 'http://localhost/bilpleiekongen/wp-json';
const endpoint_pages = '/wp/v2/pages';
/* Products use /?_embed to include pictures */
const endpoint_products = '/wp/v2/product/?_embed';
const endpoint_main = '/';

/* Root component
 * Should have cleaned up variable names
 */
class App extends Component {
    constructor(props) {
			super(props);

	    this.state = {
	      title: null,
	      description: null,
	      pages: null,
	      products: null,
	      orders_id:[],
	    };
    }
    /* Pushes orders to top-level array */
    addToCart(order) {
	      this.setState({
	          orders_id: [...this.state.orders_id,order]
	    });
    }
    /* Processes the authentication hash fragment */
    handleAuthentication = (nextState, replace) => {
	      if (/access_token|id_token|error/.test(nextState.location.hash)) {
	          this.props.auth.handleAuthentication();
	      }
    }

    goTo(route) {
	      this.props.history.replace(`/${route}`)
    }
    login() {
	      this.props.auth.login();
    }
    logout() {
	      this.props.auth.logout();
    }
		/* Fetching data from WP REST API */
    componentDidMount() {
	      const {renewSession } = this.props.auth;

	      if (localStorage.getItem('isLoggedIn')=== 'true') {
	          renewSession();
	      }
				/* get links for Navbar */
	      fetch(URL+endpoint_pages)
	         .then(response =>response.json())
	         .then(data => this.setState({pages:data}));

	      var self = this;
				/* get name and description of App */
	      axios.get(URL+endpoint_main)
	        .then(function(response) {
		        self.setState({
							title:response.data.name,
							description:response.data.description});
						})
      		.catch(function(error) {
						console.log(error);})
          .then(function() {
	      });

				/* get list of products */
	      axios.get(URL+endpoint_products)
	         .then(function(response) {
		           self.setState({products:response.data});})
               .catch(function(error) {})
               .then(function() {
	      });
    }
    /* Defining routes and render components.
     * Private: /Min Minside, /Handlekurv
     * Publice: /Produkter, /Hjem
     */
    render() {
	     const { isAuthenticated } = this.props.auth;
	     return (
		       <Router history={history} component={App}>
             <div className="App">
               <Navbar name={this.state.title} description={this.state.description} data={this.state.pages} status={isAuthenticated()} login={this.login.bind(this)} logout={this.logout.bind(this)}/>
               <Switch>
                 <Route path = '/Produkter' exact render = {(props) => <Products data={this.state.products} orders_id={this.addToCart.bind(this)}/>}/>
                 <Route path = '/Min side' render = {() => !isAuthenticated() ?  <Login login={this.login.bind(this)}/> : <Minside orderslist={this.state.orders_id}/>}/>
								 <Route path = '/callback' render = {(props) => {this.handleAuthentication(props); return <Callback {...props} /> }}/>
               </Switch>
             </div>
           </Router>
			);
  }
}

export default App;
