import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Logout from '../components/Logout'; 
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import UserList from '../components/UserList';
import PageNotFound from '../components/PageNotFound';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log('IsAuthenticated:', isAuthenticated);

  return (
    <BrowserRouter>
        <Navbar />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/logout" element={<Logout />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={ <PageNotFound />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
