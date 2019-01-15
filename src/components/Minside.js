import React from 'react';
import './fonter.css';
import querystring from 'query-string';
import axios from 'axios';
import WooCommerceAPI from 'woocommerce-api';

/* Using npm woocommerce-api */
var WooCommerce = new WooCommerceAPI({
  url: 'http://localhost/bilpleiekongen',
    consumerKey: 'ck_d1194759e77574e7184243001ceb3772c88a9c70',
    consumerSecret: 'cs_0163a8a49cd4124e078c373993c4117c7da5d64a',
    wpAPI: true,
    version: 'wc/v2'
});

const users = 'http://localhost/bilpleiekongen/wp-json/wp/v2/users';

//var queryString = require('query-string');


/*    var store_url='http://localhost/bilpleiekongen';
    var endpoint = '/wc-auth/v1/authorize';
    var params = {
	app_name: 'Bilpleiekongen',
	scope: 'read_write',
	user_id: '1',
	return_url: 'http://localhost/min side',
	callback_url: 'http://localhost/keys'
    };

var query_string = querystring.stringify(params).replace(/%20/g, '+');
*/
class Minside extends React.Component {

	componentDidMount() {
	    WooCommerce.get('products',function(err,data,res) {
	    });
    }
    render() {
	      var listItems;
        /* If array includes items, make a renderable list */
	      if(this.props.orderslist.length>0) {
	          listItems = this.props.orderslist.map((item,index)=><tr><th scope="row"><small>{index}</small></th><td><small>{item}</small></td><td><small>1</small></td><td></td></tr>);
	      }
	      return(
	       <div className="container">
           <div className="pb-2 mt-4 mb-2" id="fonter">
             <h2>Min side</h2>
             <hr/>
           </div>
           <div className="col-lg-6 col-sm-12">
             <div className="jumbotron">
               <h4 className="fonter mb-5">Mine bestillinger</h4>
               <table className="table table-hover">
                 <thead>
                   <tr>
                     <th scope="col">Ordrenummer</th>
                     <th scope="col">Produktnavn</th>
                     <th scope="col">Antall</th>
                     <th scope="col">Pris</th>
                   </tr>
                 </thead>
                 <tbody>
                   {listItems}
                 </tbody>
               </table>


             </div>
           </div>
         </div>
	);
    }
}
export default Minside;
