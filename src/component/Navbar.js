import React, {Component} from 'react';
import {Link} from "react-router-dom";
import $ from "jquery";
import './Navbar.css';

class Navbar extends Component {
  Logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("id_user");
    localStorage.removeItem("cart");
    localStorage.removeItem("role");
    window.location = "/"
  }

  
  
  render() {
    let role = localStorage.getItem("role");
    let auth = localStorage.getItem("Token");
    return (
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-p shadow-sm">
               <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <a className="navbar-brand" href="#">MonStore</a>
              
              
              <div className="navbar-collapse collapse" id="menu">  
          <ul className="navbar-nav">
            {/* {(auth)= "true" ? <li className="navbar-item"><Link className="nav-link" to="/Admin">Admin</Link></li> : "" }             */}
            { role === "Admin" ? auth ? <li className="navbar-item "><Link className="nav-link" to="/Admin">Admin</Link></li> : "" : "" }            
            { role === "Admin" ? auth ? <li className="navbar-item "><Link className="nav-link" to="/User">User</Link></li> : "" : "" }       
            { role === "Admin" ? auth ? <li className="navbar-item "><Link className="nav-link" to="/Order">Order</Link></li> : "" : "" }       

            { role === "Admin" ? "" : <li className="navbar-item "><Link className="nav-link" to="/profile">Profile</Link></li> }            
            { role === "Admin" ? "" : <li className="navbar-item "><Link className="nav-link" to="/">Produk</Link></li> }            
            { role === "Admin" ? "" : <li className="navbar-item "><Link className="nav-link" to="/cart">Cart</Link></li> }            
            { role === "Admin" ? "" : <li className="navbar-item "><Link className="nav-link" to="/check_out">Check Out</Link></li> }            
          </ul>
        </div>
                <div className="form-inline my-2 my-lg-0">
                  <ul className="navbar-nav">
                {!(auth) ? <li className="navbar-item"><Link className="btn btn-sm btn-outline-light " to="/login">login</Link></li> : 
            <li className="navbar-item"><button className="btn btn-sm btn-outline-light" onClick={this.Logout}>Logout</button></li> }
                </ul>
                </div>
              </div>
            </nav>
      </div>

//       <div>
//   <nav className="navbar">
//     <div className="container-fluid">
//       {/* Nav Header */}
//       <div className="navbar-header">
//         <a className="navbar-brand" href="#">
//           <span className="fa fa-home" />
//           <span className="link"> Home</span>
//         </a>
//       </div>
//       {/* Nav Collapse */}
//       <div className="navbar-collapse collapse" id="collapse-1">
//         {/* Nav Left */}
//         <ul className="nav navbar-nav">
//           {/* Products */}
//           <li className="dropdown">
//             <a
//               href="#"
//               className="dropdown-toggle"
//               data-toggle="dropdown"
//               role="button"
//               aria-haspopup="true"
//               aria-expanded="false"
//             >
//               <span className="fa fa-tags" />
//               <span className="link"> Products</span>{" "}
//               <span className="fa fa-caret-down" />
//             </a>
//             <ul className="dropdown-menu">
//               <li>
//                 <a href="#">
//                   <span className="fa fa-tag" /> Catalogue 1
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <span className="fa fa-tag" /> Catalogue 2
//                 </a>
//               </li>
//             </ul>
//           </li>
//           {/* Services */}
//           <li className="dropdown">
//             <a
//               href="#"
//               className="dropdown-toggle"
//               data-toggle="dropdown"
//               role="button"
//               aria-haspopup="true"
//               aria-expanded="false"
//             >
//               <span className="fa fa-gears" />
//               <span className="link"> Services</span>{" "}
//               <span className="fa fa-caret-down" />
//             </a>
//             <ul className="dropdown-menu">
//               <li>
//                 <a href="#">
//                   <span className="fa fa-gear" /> Service 1
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <span className="fa fa-gear" /> Service 2
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <span className="fa fa-gear" /> Service 3
//                 </a>
//               </li>
//             </ul>
//           </li>
//           {/* About */}
//           <li>
//             <a href="#">
//               <span className="fa fa-info-circle" />
//               <span className="link"> About</span>
//             </a>
//           </li>
//           {/* Contact */}
//           <li>
//             <a href="#">
//               <span className="fa fa-phone" />
//               <span className="link"> Contact</span>
//             </a>
//           </li>
//         </ul>
//         {/* Nav Right */}
//         <form className="navbar-form navbar-right">
//           <div className="form-group">
//             <input type="text" className="form-control" placeholder="Search" />
//           </div>
//           <button type="submit" className="btn">
//             <span className="fa fa-search" />
//           </button>
//         </form>
//       </div>
//     </div>
//   </nav>
// </div>

      
    );
  }
}
export default Navbar;
