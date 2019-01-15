import React from 'react';
var Parser = require('html-react-parser');

class Products extends React.Component {
    constructor(props) {
	    super(props);
	    this.state={
	    name:null,
	    }
    }
    handleClick(obj_id) {
	    this.props.orders_id(obj_id);
    }

    render() {
	    if(this.props.data !== null)
	      {
	      var listitem;
	      var list = this.props.data || [];

	      if(list.length>0) {
		        listitem = list.map((obj,i) =>
				    <div className="col-lg-3 d-flex align-items-stretch mb-5" key={'col'+i}>
              <div className="card" key={'card'+i}>
                <div className="card-block ">
                  <img className="card-img-top img-fluid" src={obj._embedded['wp:featuredmedia']['0'].source_url} alt={obj.title.rendered}  key='{i}img'/>
                  <div className="card-body bg-light" key='{i}body'>
                    <div style={{height:'3.6rem'}}>
                      <h6 className="card-title" style={{height:'100%'}} key='{i}h5'> {Parser(obj.title.rendered)}</h6>
                    </div>
                    <p className="d-inline-block text-truncate" style={{minHeight:'4rem',maxWidth:'100%',maxHeight:'100px'}}key='{i}text'><small>{obj.excerpt.rendered.replace(/(<([^>]+)>)/ig,"")}</small></p>
                    <div className="" style={{height:'2.4rem'}}>
                      <button className="btn btn-primary float-left btn-md" href="#">Info</button>
                      <button className="btn btn-primary float-right " onClick={this.handleClick.bind(this,Parser(obj.title.rendered))} href="#">Add to cart</button>
                    </div>
                  </div>
                  <div className="card-footer" key='{i}footer'>
                    <small className="" key='{i}muted'>Pris: 299,-</small>
                  </div>
                </div>
              </div>
				    </div>
				   );
	    }
	}
	return(
		<div>
      <div className="container" id="fonter">
        <div className="pb-2 mt-4 mb-2">
          <h2>Products</h2>
        </div>
        <div className="card-deck">
          {listitem}
        </div>
      </div>
		</div>

	);
    }
}
export default Products;
//"http://localhost/bilpleiekongen/wp-content/uploads/130-Leather-Cleaner.jpg"
//d-block bg-success tiny" style={{height:'30%',textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden'}}key='{i}text'>{Parser(obj.excerpt.rendered)}</small>
//<small className="card-subtitle text-muted text-truncate"key='{i}text'>{Parser(obj.excerpt.rendered)}</small>
//<small className="card-subtitle d-block" style={{textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden'}} key='{i}text'>{Parser(obj.excerpt.rendered)}</small>


//
//				    <p className=" bg-success" style={{height:'50px',maxWidth:'100%',maxHeight:'100px'}}key='{i}text'><small>{obj.excerpt.rendered.replace(/(<([^>]+)>)/ig,"")}</small></p>
