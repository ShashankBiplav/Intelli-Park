import React from "react";
import {Redirect,Route} from "react-router-dom";

function PrivateRoute({component: Component, isAuth}) {
  return(
    <Route
      render={(props) => isAuth === true
        ? <Component />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  );
}

export default PrivateRoute;
