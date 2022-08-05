
import React from "react";
import cookie from 'js-cookie'
import { Navigate, Route  } from "react-router-dom";
const GuestRoute = ({ component: Component, ...rest }) => {
    const token =cookie.get('token')
  return (
    <Route
      {...rest}
      render={props =>
        !token ? (
          <Component {...props} />
        ) : (
        //   <Redirect
        //     to={{
        //       pathname: "/users",
        //       state: { from: props.location }
        //     }}
        //   />
        <Navigate
        to={{
                  pathname: "/users",
                  state: { from: props.location }
                }}
        
        />
        )
      }
    />
  );
};


export default GuestRoute;