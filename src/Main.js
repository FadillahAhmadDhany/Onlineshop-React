import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Navbar from "./component/Navbar";

import Cart from "./client/Cart";
import Login from "./page/Login";
import Admin from "./page/Admin";
import User from "./page/User";
import Order from "./page/Order";
import Product from "./client/Product";
import Profiles from "./client/Profiles";
import Register from "./client/Register";
import CheckOut from "./client/CheckOut";


class Main extends Component{
    render = () => {
        return(
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route exact path="/">
                    <Navbar />
                    <Product />
                </Route>
                <Route exact path="/Profile">
                    <Navbar />
                    <Profiles />
                </Route>
                <Route path="/Admin">
                    <Navbar />
                    <Admin />
                </Route>
                <Route path="/User">
                    <Navbar />
                    <User />
                </Route>
                <Route path="/cart">
                    <Navbar />
                    <Cart />
                </Route>
                <Route path="/check_out">
                    <Navbar />
                    <CheckOut />
                </Route>
                <Route path="/Order">
                    <Navbar />
                    <Order />
                </Route>
            </Switch>
        );
    }
}

export default Main;
