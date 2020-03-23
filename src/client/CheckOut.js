import React,{Component} from 'react';
import $ from "jquery";
import { Link } from 'react-router-dom'
import axios from "axios";

export default class CheckOut extends React.Component {

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
        <h1 className="text-center"> KOSONG</h1>
        )



}




}
