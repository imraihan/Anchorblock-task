import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Dashboard from '../components/Dashboard';
import Logout from '../components/Logout'; 
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import UserList from '../components/UserList';

const Index = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
        <Navbar />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/userlist" element={<UserList />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
