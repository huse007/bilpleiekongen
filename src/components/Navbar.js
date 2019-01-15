import React from 'react';
import './fonter.css';
import {NavLink} from 'react-router-dom';
class Navbar extends React.Component {
    constructor(props) {
	super(props);
	this.state={
	    name:null,
	}
	this.handleClick.bind(this);
    }
    handleClick(event) {
	event.preventDefault();
	console.log("handleClick");
    }
    render() {
        var listitem;
        var list = this.props.data || [];
	if(this.props.data !== 0) {
            listitem = list.map((obj)=>
				<li className="nav-item" key={obj.title.rendered.toString()}>
				<NavLink className="nav-link" id="fonter" to={obj.title.rendered.toString()} key={obj.title.rendered.toString()}>{obj.title.rendered}<span className="sr-only">(current)</span></NavLink>
				</li>
			       );
        }
	console.log("Navbar");
	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
		<a className="navbar-brand" id="fonter" href={this.props.name}>
		<h1>{this.props.name}</h1>
		</a>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarSupportedContent">
		<ul className="navbar-nav mr-auto">
		{ listitem }
	    </ul>
		<form className="form-inline my-2 my-lg-0">
		{this.props.status && <button className="btn btn-outline-primary my-2 my-sm-0" id="fonter" onClick={()=>{this.props.logout()}} >{this.props.status?"Log out":"Log in"}</button>}
	    {!this.props.status && <button className="btn btn-outline-primary my-2 my-sm-0" id="fonter" onClick={()=>{this.props.login()}}>{this.props.status?"Log out":"Log in"}</button>}		</form>
		</div>
		</nav>
	);
    }
}
export default Navbar;
//		<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
//<a class="nav-link" href={obj.title.rendered.toString()} key={obj.title.rendered.toString()}>{obj.title.rendered}<span class="sr-only">(current)</span></a>
