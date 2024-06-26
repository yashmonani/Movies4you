import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './signupvalidation';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    name: '',
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
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:8081/signup", values)
        .then(res => {
          console.log(res);
          navigate('/login'); // Redirect to login page on successful signup
        })
        .catch(err => {
          console.error(err);
          setServerError('Error occurred during signup. Please try again.');
        });
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100 main-div'>
      <div className='bg-white p-3 rounded w-100 secondary-div'>
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name</strong></label>
            <input 
              type='text' 
              placeholder='Enter Name' 
              name='name'
              onChange={handleInput} 
              className='form-control rounded-0' 
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input 
              type='email' 
              placeholder='Enter Email' 
              name='email'
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
              onChange={handleInput} 
              className='form-control rounded-0' 
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
          <p>You agree to our terms and conditions</p>
          <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Sign In</Link>
          <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Back to Home</Link>
          {serverError && <div className="text-danger mt-3">{serverError}</div>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
