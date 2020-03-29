import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slide1 from '../image/Slide1.jpg';
import Slide2 from '../image/Slide2.jpg';
import Slide3 from '../image/Slide3.jpg';
import Slide4 from '../image/Slide4.jpg';
import Slide5 from '../image/Slide5.jpg';
import ProductItem from './ProductItem';

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            produk: [],
            find: "",
            filter: ""
        }
    }

    bind = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    GetProducts = () => {
        let url = "http://localhost/eproduk/public/produk"
        axios.get(url)
            .then(res => {
                this.setState({ produk: res.data.produk })
            })
            .catch(error => {
                console.log(error)
            })
    }

    Search = (e) => {
        if (e.keyCode === 13) {
            let url = "http://localhost/eproduk/public/produk"

            let form = new FormData()
            form.append("find", this.state.find)
            axios.post(url, form)
                .then(res => {
                    this.setState({ produk: res.data.produk })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    componentDidMount() {
        this.GetProducts()
    }


    render() {

        const renderData = this.state.produk.map((item, id) => {
            return (
                <ProductItem item={item} key={id} />
            )
        })

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <h1 className="my-4">React Shopping</h1>
                        <input type="text" className="form-control" name="find" value={this.state.find} onChange={this.bind} onKeyUp={this.Search} required placeholder="Pencarian.." />
                        <hr></hr>
                        <h4>Kategori</h4>
                        <form onSubmit={this.Filter}>
                            <div className="form-group">
                                <select className="form-control" name="filter" value={this.state.value} onChange={this.bind} >
                                    <option value="">Choose...</option>
                                    <option value="sepatu">Weapon</option>
                                    <option value="topi">Arena</option>
                                    <option value="kaos">Monster</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-outline-primary pull-right m-2">
                                Filter
                            </button>
                            <Link to="/cart">
                                <button className="btn btn-outline-success pull-right m-2">
                                    <span className="fa fa-cart-plus"></span> View Cart
                            </button>
                            </Link>
                        </form>
                    
                            {/* <Link to="/check_out">
                                <button className="btn btn-outline-success float-right">
                                    <span className="fa fa-check"></span> Checkout
                            </button>
                            </Link> */}
                            
                    </div>
                    <div className="col-lg-9">
                        <div id="slideshow" className="carousel slide my-4" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#slideshow" data-slide-to="0" className="active"></li>
                                <li data-target="#slideshow" data-slide-to="1"></li>
                                <li data-target="#slideshow" data-slide-to="2"></li>
                                <li data-target="#slideshow" data-slide-to="3"></li>
                                <li data-target="#slideshow" data-slide-to="4"></li>
                            </ol>
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active">
                                    <img className="d-block img-fluid" src={Slide1} alt="First slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block img-fluid" src={Slide2} alt="Second slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block img-fluid" src={Slide3} alt="Second slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block img-fluid" src={Slide4} alt="Second slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block img-fluid" src={Slide5} alt="Second slide" />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#slideshow" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#slideshow" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>

                        <div className="row">
                            {renderData}
                            
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
