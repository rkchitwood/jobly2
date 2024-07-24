import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** higher order component for private routes to check if valid current user */

function PrivateRoute({ exact, path, children }){
    const { currentUser } = useContext(UserContext);
    if(!currentUser){
        return <Redirect to="/logikn" />;
    }
    return (
        <Route exact={exact} path={path}>
          {children}
        </Route>
    );
}
export default PrivateRoute;