import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

/** nav bar for site for logged in and logged out users */

function Navigation({ logout }){
    const { currentUser } = useContext(UserContext);
    function loggedInNav(){
        return (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/companies">
                  Companies
                </NavLink>
              </li>
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/jobs">
                  Jobs
                </NavLink>
              </li>
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  Log out {currentUser.first_name || currentUser.username}
                </Link>
              </li>
            </ul>
        );        
    }
    function loggedOutNav(){
        return (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
            </ul>
        );
    }
    return (
        <nav className="Navigation navbar navbar-expand-md">
          <Link className="navbar-brand" to="/">
            Jobly
          </Link>
          {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
}
export default Navigation;