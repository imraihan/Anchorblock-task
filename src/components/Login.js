import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authActions';
import { useNavigate } from 'react-router-dom';
import emailValidator from 'email-validator';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
  
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');

    if (!emailValidator.validate(credentials.email)) {
      setEmailError('Invalid email format. Please enter a valid email.');
      return;
    }

    if (!credentials.password) {
      setPasswordError('Password is required.');
      return;
    }
    setLoading(true);

    try {
       dispatch(login(credentials));
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      {emailError && <p className="error-message">{emailError}</p>}
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      {passwordError && <p className="error-message">{passwordError}</p>}
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Login;
