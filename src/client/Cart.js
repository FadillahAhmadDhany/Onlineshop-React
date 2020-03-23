import React,{Component} from 'react';
import $ from "jquery";
import { Link } from 'react-router-dom'
import axios from "axios";

export default class Cart extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      carts: [],
      data_pengiriman: [],
      num: 0,
      total: 0,
    }    
    
    if(!localStorage.getItem("Token")){
      // direct ke halaman login
      window.location = "/login";
    }
}

bind = (event) => {
  this.setState({[event.target.name] : event.target.value});
}

get_alamat = () => {
  // $("#loading").toast("show");
  let id = JSON.parse(localStorage.getItem('id_user'))

  let url = "http://localhost/eproduk/public/address/"+id;
  axios.get(url)
  .then(response => {
    this.setState({
      data_pengiriman: response.data.data_pengiriman,
    });
    $("#loading").toast("hide");
  })
  .catch(error => {
    console.log(error);
  });
}

getCarts = () => {
    let items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    let total = 0
    let num = 0
    items.forEach(item => {
      total += item.total
      num += item.qty
    });
    this.setState({
      carts: items,
      num: num,
      total: total
    });    
}

componentDidMount() {
    this.getCarts();
    this.get_alamat();
}

removeFromCart = (product) => {
    let carts = JSON.parse(localStorage.getItem('cart'));
    let cart = carts.filter(item => item.id !== product.id );
    localStorage.setItem('cart', JSON.stringify(cart));
    this.getCarts()

}

clearCart = () => {
    localStorage.removeItem('cart');
    this.setState({carts: []});    
}
 
      render(){
        const { carts, num, total, data_pengiriman } =  this.state;
        return (
            <div>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content />
            <meta name="author" content />
            <link rel="icon" href="/docs/4.0/assets/img/favicons/favicon.ico" />
            <link
              rel="canonical"
              href="https://getbootstrap.com/docs/4.0/examples/checkout/"
            />
            {/* Bootstrap core CSS */}
            <link href="../../dist/css/bootstrap.min.css" rel="stylesheet" />
            {/* Custom styles for this template */}
            <link href="form-validation.css" rel="stylesheet" />
            <div className="container">
              <div className="py-3">
              </div>
              <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                  <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                    <span className="badge badge-secondary badge-pill">{num}</span>
                  </h4>
                  <ul className="list-group mb-3">
                  { !carts.length ? 
                  
                  <h5 className="text-warning text-center">No item on the cart</h5> 
                  
                  :

                  <div>
                  {carts.map((product, index) =>    
                  <li className="list-group-item d-flex justify-content-between lh-condensed" key={index}>
                  <div>
                    <h6 className="my-0">{product.name}</h6>
                    <small className="text-muted">Harga: Rp{product.price}, Jumlah produk: {product.qty} </small>
                  </div>
                  <span className="text-muted">Rp. {product.total}</span>
                  <button className="btn btn-sm btn-warning" 
                  onClick={() => this.removeFromCart(product)}><span className="fa fa-trash"></span> Remove</button>
                </li>
                

            )
          }
          </div>
        }
        
        { !carts.length ? "" :
          
            <li className="list-group-item d-flex n">
              <button className="btn btn-block btn-danger float-right" onClick={this.clearCart} 
                style={{ marginRight: "10px" }}><span className="fa fa-trash"></span> Clear Cart</button>
            </li>
                  }
         
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Total (IDR)</span>
                      <strong>Rp. {total}</strong>
                    </li>
                    
                  </ul>
                  <form className="card p-2">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Promo code"
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-secondary">
                          Redeem
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-md-8 order-md-1">
                  <h4 className="mb-3">Billing address</h4>
                  <form className="needs-validation" noValidate>
                   
                    <div className="col-md-4 mb-3">
                        <label htmlFor="state">Alamat</label>                  
                      <select className="form-control" name="role" value={this.state.value} onChange={this.bind} required>
                      {this.state.data_pengiriman.map((item) => {
                    return(
                      <option value="{item.id}">{item.judul}</option>
                      )})}
                    </select>
                        
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>
                    <hr className="mb-4" />
                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
              <footer className="my-5 pt-5 text-muted text-center text-small">
                <p className="mb-1">© 2017-2018 React Shop © Dhragonite.Com</p>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="#">Privacy</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Terms</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Support</a>
                  </li>
                </ul>
              </footer>
            </div>
            {/* Bootstrap core JavaScript
              ================================================== */}
            {/* Placed at the end of the document so the pages load faster */}
          </div>
          
       )
    }




}





