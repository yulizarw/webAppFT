import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoginProtectedRoute = ({ component: Component,authLogin, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (!authLogin) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/home',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default LoginProtectedRoute;