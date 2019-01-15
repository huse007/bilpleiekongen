import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'; //Link
import './components/fonter.css';
import './App.css';
import  axios from 'axios';
//import Auth from './auth/Auth';
import Navbar from './components/Navbar.js';
import Products from './components/Products.js';
import Minside from './components/Minside.js';
import Login from './components/Login.js';
import history from './history';
import Callback from './callback/Callback';
/* Todo: clean up urls */
const url1 = 'http://localhost/bilpleiekongen/wp-json/';
const url = 'http://localhost/bilpleiekongen/wp-json/wp/v2/pages/';
const uri = 'http://localhost/bilpleiekongen/wp-json/wp/v2/settings';
/* Products (/?_embed)*/
const prod = 'http://localhost/bilpleiekongen/wp-json/wp/v2/product/?_embed';

/* Root component
 * Should have cleaned up variable names 
 */
class App extends Component {
    constructor(props) {
	    super(props);

	    this.state = {
	      name: null,
	      description: null,
	      data: null,
	      data2: null,
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
    componentDidMount() {
	      const {renewSession } = this.props.auth;

	      if (localStorage.getItem('isLoggedIn')=== 'true') {
	          renewSession();
	      }
	      fetch(url)
	         .then(response =>response.json())
	         .then(data => this.setState({data}));

	      axios.options(uri)
	         .then(function(response) {})
           .catch(function(error) {})
           .then(function() {
	      });
	      var self = this;
	      axios.get(url1)
	         .then(function(response) {
		          self.setState({name:response.data.name,description:response.data.description});})
              .catch(function(error) {console.log(error);})
              .then(function() {
	      });
	      axios.get(prod)
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
               <Navbar name={this.state.name} description={this.state.description} data={this.state.data} status={isAuthenticated()} login={this.login.bind(this)} logout={this.logout.bind(this)}/>
               <Switch>
                 <Route path = '/Produkter' exact render={(props)=><Products data={this.state.products} orders_id={this.addToCart.bind(this)}/>}/>
                 <Route path="/Min side" render={() => !isAuthenticated() ?  <Login login={this.login.bind(this)}/> : <Minside orderslist={this.state.orders_id}/>}/>
                 <Route path="/callback" render={(props) => {this.handleAuthentication(props); return <Callback {...props} /> }}/>
               </Switch>
             </div>
           </Router>

	);
  }
}

export default App;
