import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../features/registrationActions';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [emailFormatError, setEmailFormatError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setUserData({ ...userData, name: e.target.value });
    setErrorMessage('');
  }

  const handleEmailChange = (e) => {
    setUserData({ ...userData, email: e.target.value });
    setEmailFormatError(false); 
    setErrorMessage(''); 
  }

  const handlePasswordChange = (e) => {
    setUserData({ ...userData, password: e.target.value });
    setErrorMessage('');
  }

  const handleRegistration = () => {
    if (!userData.name || !userData.password) {
      setErrorMessage('Name and Password are required fields.');
      return;
    }

    if (!validateEmail(userData.email)) {
      setEmailFormatError(true);
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setEmailFormatError(false);

    dispatch(register(userData))
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        setErrorMessage('Registration failed: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  return (
    <div>
      <h2>Registration</h2>
      <input
        type="text"
        placeholder="Name"
        value={userData.name}
        onChange={handleNameChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleEmailChange}
        required
      />
      {emailFormatError && (
        <p style={{ color: 'red' }}>Invalid email format. Please enter a valid email address.</p>
      )}
      <input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={handlePasswordChange}
      />
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <button onClick={handleRegistration} disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
    </div>
  );
}

export default Registration;

