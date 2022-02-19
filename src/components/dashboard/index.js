import React, { Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../actions/authActions";
import PropTypes from "prop-types";
import { Avatar} from 'antd';
require ("../../dashboard.css");

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            child: props.nestedRoute,
            search: "",
        }
    }
    componentDidMount(){
        this.activeNav();
    }
    activeNav(){
        const pathname = window.location.pathname;
        const possibleRoutes = [
            {routes: "/dashboard", targetId: "home"},
            {routes: "/addProduct", targetId: "addProduct"},
            {routes: "/products", targetId: "products"},
            {routes: "/profile", targetId: "profile"},
        ];
        possibleRoutes.forEach(({route, targetId})=>{
            window.jQuery(`#${targetId}`).removeClass("active")
            if(route === pathname){
                window.jQuery(`#${targetId}`).addClass("active")
            }
        });
    }
    avatarText = (name)=>{
        let initial = "";
        const names = name.split(" ");
        names.forEach((name) =>{
            initial = initial + name.charAt(0);
        });
        return initial;
    }

    logUserOut = (e) =>{
        e.preventDefault();
        this.props.logout();
    };

    render() {
        const Child = this.state.child;
        const {user} = this.props.auth;
        return(
            <div>
                <div id="wrapper">

                {/* Sidebar */}
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                    {/* Sidebar - Brand */}
                    <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                        <div className="sidebar-brand-icon">
                            <i className="fas fa-store"></i>
                        </div>
                        <div className="sidebar-brand-text mx-2">E-Shop</div>
                    </Link>

                    {/* Divider */}
                    <hr className="sidebar-divider my-0"/>

                    {/* Nav Item - Dashboard */}
                    <li className="nav-item active">
                        <Link className="nav-link" to="/dashboard">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Merchant Store</span></Link>
                    </li>

                    <hr className="sidebar-divider"/>

                    {/* Nav Item - Pages Collapse Menu */} 
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/dashboard/addProduct" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-plus-circle"></i>
                            <span>Add a product</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider"/>

                    {/* Nav Item - Utilities Collapse Menu */} 
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/dashboard/products" data-toggle="collapse" data-target="#collapseUtilities"
                            aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-border-all"></i>
                            <span>Products</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider"/>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/dashboard/profile" data-toggle="collapse" data-target="#collapseUtilities"
                            aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-user"></i>
                            <span>Profile</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider"/>

                    {/* Nav Item - Pages Collapse Menu */}

                </ul>
                {/*} End of Sidebar */}

                {/*} Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/*} Main Content */}
                    <div id="content">

                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                            {/* Sidebar Toggle (Topbar) */} 
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars"></i>
                            </button>

                            {/* Topbar Search */}
                            <form
                                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                                        aria-label="Search" aria-describedby="basic-addon2"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Topbar Navbar */}
                            <ul className="navbar-nav ml-auto">

                                {/* Nav Item - Search Dropdown (Visible Only XS) */}
                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <Link className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-search fa-fw"></i>
                                    </Link>
                                    {/* Dropdown - Messages */}
                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                        aria-labelledby="searchDropdown">
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-light border-0 small"
                                                    placeholder="Search for..." aria-label="Search"
                                                    aria-describedby="basic-addon2"/>
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </li>

                                <div className="topbar-divider d-none d-sm-block"></div>

                                {/* Nav Item - User Information */}
                                <li className="nav-item dropdown no-arrow">
                                    <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.name}</span>
                                        <Avatar size={40}>{(user.name) && this.avatarText(user.name)}</Avatar>
                                    </Link>
                                    {/* Dropdown - User Information */}
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="userDropdown">
                                        <Link className="dropdown-item" to="#">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Profile
                                        </Link>
                                        <Link className="dropdown-item" to="#">
                                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Settings
                                        </Link>
                                        <Link className="dropdown-item" to="#">
                                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Activity Log
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" to="#" onClick={this.logUserOut} >
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </Link>
                                    </div>
                                </li>

                            </ul>

                        </nav>
                        {/* End of Topbar */} 
                        <Child {...this.props} search= {this.state.search} />
                        {/* Begin Page Content */}

                    </div>
                    {/* End of Main Content */}

                    {/* Footer */}
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; GopalaShringar {new Date().getFullYear()}</span>
                            </div>
                        </div>
                    </footer>
                    {/* End of Footer */}

                </div>
                {/* End of Content Wrapper */}

                </div>
{/* End of Page Wrapper */}
            </div>
        );
    }
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>({
    auth: state.auth,
});
export default connect(mapStateToProps, {logout})(Dashboard);