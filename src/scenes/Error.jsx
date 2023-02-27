import React from 'react';
import { useRouteError } from 'react-router-dom';

// Margin is 0 in html page so need to fix this somehow
const errorstyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
};

const Error = () => {
  const error = useRouteError();
  console.error(error);
  
  return (
    <div style={errorstyle}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default Error;