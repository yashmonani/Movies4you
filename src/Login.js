import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './loginvalidation';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleInput = (event) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:8081/login", values)
        .then(res => {
          console.log(res);
          // Handle successful login, e.g., navigate to a dashboard or homepage
          navigate('/');
        })
        .catch(err => {
          console.error(err);
          setServerError('Invalid email or password. Please try again.');
        });
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100 main-div'>
      <div className='bg-white p-3 rounded w-100 secondary-div'>
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input 
              type='email' 
              placeholder='Enter Email' 
              name='email'
              value={values.email}
              onChange={handleInput} 
              className='form-control rounded-0' 
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input 
              type='password' 
              placeholder='Enter password' 
              name='password'
              value={values.password}
              onChange={handleInput}  
              className='form-control rounded-0' 
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
          {serverError && <div className="text-danger mt-3">{serverError}</div>}
          <p>You agree to our terms and conditions</p>
          <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create an account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
