import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [userInputs, setUserInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = e => {
    setUserInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
      })
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    try {
      await axios.post("/auth/login", userInputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder="Username" name="username" onChange={handleInputChange} />
        <input required type="password" placeholder="Password" name="password" onChange={handleInputChange} />
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>No account? <Link to="/register">Register here</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;