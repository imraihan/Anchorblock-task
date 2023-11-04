import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/authActions';
import { Navigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  dispatch(logoutUser());
  return <Navigate to="/login" replace />;
}

export default Logout;
