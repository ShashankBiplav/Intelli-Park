import React, {useContext} from "react";
import UserContext from "../../context/UserContext";
import {Route, Redirect} from "react-router-dom";

function ProtectedRoute({component: Component, ...rest}) {
  const {user} = useContext(UserContext);
  
  return (
    <Route {...rest} render={
      (props => {
        if (user.isAuth) {
          return <Component {...props}/>
        } else {
          return <Redirect to={
            {
              pathname: "/login",
              state: {
                from: props.location
              }
            }
          }
          />
        }
      })
    }
    />
  );
}

export default ProtectedRoute;
