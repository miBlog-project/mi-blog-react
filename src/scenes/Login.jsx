import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder="Username" />
        <input required type="password" placeholder="Password" />
        <button>Login</button>
        <p>Error Message goes here</p>
        <span>No account? <Link to="/register">Register here</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;