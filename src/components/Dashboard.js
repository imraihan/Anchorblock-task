import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/authActions';
import { Navigate } from 'react-router-dom';

function Dashboard() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  // console.log(user)

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Welcome Here!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
