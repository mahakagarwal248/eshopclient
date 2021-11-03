import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../actions/authActions";

const NavBar = ({auth: {isAuthenticated, user}, logout})=>{
    const authUser = (
        <ul>
            {user.role === "merchant" && (
                <li><Link to="/dashboard">Dashboard</Link></li>
            )}
            
            {user.role !== "merchant" && (
                <li><Link to="/register?role=merchant">Become a Merchant</Link></li>
            )}
            <li><Link to="/cart"><i className="fas fa-shopping-cart" style={{marginRight:"2px"}}></i>Cart</Link></li>
            <li><Link onClick={logout} to="#!">
                <i className="fas fa-sign-out-alt" style={{marginRight:"2px"}}></i>
                <span className="hide-on-mobile">Logout</span>
                </Link>
            </li>
        </ul>
    );
    const guest = (
       <ul>
          <li><Link to="/register?role=merchant">Merchants</Link></li>
          <li><Link to="/register?role=customer">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
       </ul>
    );
    return (
       <nav className="main-navbar bg-main" style={{backgroundColor:"#802b00", zIndex:"999"}}>
           <h1>
               <Link to=""> GopalaShringar </Link>
           </h1>
           { isAuthenticated ? authUser : guest}
       </nav>
    );
};

const mapStateToProps = state =>({
    auth: state.auth,
});

export default connect(mapStateToProps, {logout})(NavBar);