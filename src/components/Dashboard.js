import React from 'react';

import { Link } from 'react-router-dom';

import brandimg from '../assets/img/brand.png';
import dashboardimg from '../assets/img/dashboard.svg';
import userimg from '../assets/img/user.svg';
import saleimg from '../assets/img/sales.svg';

function Dashboard() {
  return (
    <div>
      <h2 className='text-center text-2xl font-bold mb-4'>Welcome to Dashboard!</h2>
      <div className="pt-[23px] h-screen border-r border-[#F3F3F3]">
            <div className="flex pl-[34px] gap-[10px] items-center mb-[42px]">
                <img src={brandimg} alt=""/>
                <p className="font-bold text-xl text-[#4E5D78] ">Stack</p>
            </div>
            <p className="pl-[34px] text-[#B0B7C3] text-[12px] font-medium">PAGES</p>
            <div className="pl-[17px] mt-[26px] flex flex-col gap-[24px]">
                <div className="pl-[17px] flex items-center gap-[15px]">
                    <img src={dashboardimg} alt="Dashboard"/>
                    <Link to="/dashboard"><p className="text-[#B0B7C3] text-[12px] font-medium">Dashboard</p></Link>
                </div>
                <div
                    className="pl-[17px] flex items-center gap-[15px] h-[44px] bg-[#fafbfc]   max-w-[215px] w-full rounded-xl">
                    <img src={userimg} alt=""/>
                    <Link to="/userlist"><p className="text-[#B0B7C3] text-[12px] font-medium">Users</p></Link>
                </div>
                <div className="pl-[17px] flex items-center gap-[15px]">
                    <img src={saleimg} alt=""/>
                    <p className="text-[#B0B7C3] text-[12px] font-medium">Sales</p>
                </div>
            </div>
       </div>
      
    </div>
  );
}

export default Dashboard;
