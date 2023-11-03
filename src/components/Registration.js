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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegistration = () => {
    setLoading(true);

    if (!validateEmail(userData.email)) {
      setEmailFormatError(true);
      setLoading(false); 
    } else {
      setEmailFormatError(false);

      dispatch(register(userData))
        .then(() => {
          navigate('/login');
        })
        .catch((error) => {
          alert('Registration failed: ' + error.message);
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div>
      <h2>Registration</h2>
      <input
        type="text"
        placeholder="Name"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        required
      />
      {emailFormatError && (
        <p style={{ color: 'red' }}>Invalid email format. Please enter a valid email address.</p>
      )}
      <input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        required
      />
      <button onClick={handleRegistration} disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
    </div>
  );
}

export default Registration;
