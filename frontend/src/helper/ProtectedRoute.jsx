import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component,authLogin, ...rest }) => {  
  console.log(authLogin)
  return (
    <Route {...rest} render={
      props => {
        if (authLogin) {
          console.log('masuk')
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/',
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

export default ProtectedRoute;