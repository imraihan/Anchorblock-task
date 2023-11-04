import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserList } from '../features/userListSlice';
import { Link } from 'react-router-dom';

import brandimg from '../assets/img/brand.png';
import dashboardimg from '../assets/img/dashboard.svg';
import userimg from '../assets/img/user.svg';
import saleimg from '../assets/img/sales.svg';
import searchimg from '../assets/img/search.svg';
import notificationimg from '../assets/img/notification-bell.svg';
import avatarimg from '../assets/img/avatar.png';
import threedotimg from '../assets/img/three-dot.svg';
import firstimg from "../assets/img/First.svg";
import previmg from "../assets/img/Prev.svg";


function UserList() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(userList.data.total / 6);

  useEffect(() => {
    dispatch(fetchUserList({ page: currentPage, perPage: 6 }));
  }, [dispatch, currentPage]);

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="grid grid-cols-[15%_85%]">
      <div className="pt-[23px] h-screen border-r border-[#F3F3F3]">
            <div className="flex pl-[34px] gap-[10px] items-center mb-[42px]">
                <img src={brandimg} alt=""/>
                <p className="font-bold text-xl text-[#4E5D78] ">Stack</p>
            </div>
            <p className="pl-[34px] text-[#B0B7C3] text-[12px] font-medium">PAGES</p>
            <div className="pl-[17px] mt-[26px] flex flex-col gap-[24px]">
                <div className="pl-[17px] flex items-center gap-[15px]">
                    <img src={dashboardimg} alt="Dashboard"/>
                    <Link to="/dashboard"><p class="text-[#B0B7C3] text-[12px] font-medium">Dashboard</p></Link>
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
      
      <div className="px-[35px] mt-[23px]">
        <div className="flex justify-between gap-[20px]">
          <div className="relative w-[539px]">
            <input
              type="text"
              className="pl-[24px] w-full h-[58px] text-base text-[#b0b7c3] rounded-2xl border border-[#F3F3F3] focus:border-[#FF5630] focus:outline-none focus:ring-0"
              placeholder="Search"
            />
            <img className="w-[18px] h-[18px] absolute top-2/4 right-[18px] translate-y-[-50%]"
              src={searchimg} alt=''
            />
          </div>
          <div className="flex items-center gap-[43px]">
            <img src={notificationimg} alt="" />
            <img src={avatarimg} className="rounded-full" alt="" />
          </div>
        </div>
        <div>
          <h4 className="text-[23px] font-semibold text-[#323B4B] mt-[48px] mb-[41px]">User List</h4>
          <div>
            <div className="h-[44px] bg-[#fafbfc] px-[48px] text-[12px] text-[#4e5d78] font-semibold rounded-xl grid grid-cols-[10%_30%_45%_15%] items-center">
              <p>#ID</p>
              <p>Image</p>
              <p>EMAIL</p>
              <p>OPTIONS</p>
            </div>
          </div>
          <div className="mt-[14px]">
            {userList.status === 'loading' && <p>Loading...</p>}
            {userList.status === 'succeeded' && (
              <>
                {userList.data.data.map((user) => (
                  <div key={user.id} className="h-[44px] px-[48px] text-[14px] text-[#4e5d78] font-semibold rounded-xl grid grid-cols-[10%_30%_45%_15%] items-center">
                    <p>{user.id}</p>
                    <div className="flex gap-[20px] items-center">
                      <img className="rounded-[15px] w-10 h-10" src={user.avatar} alt={user.first_name} />
                      <p>{user.first_name} {user.last_name}</p>
                    </div>
                    <p>{user.email}</p>
                    <div className="ml-[15px]">
                      <img src={threedotimg} alt="" className='max-w-13'/>
                    </div>
                  </div>
                ))}
              </>
            )}
            {userList.status === 'failed' && <p>Error: {userList.error}</p>}
          </div>
        </div>

        {/* Pagination */}
        <div className="text-[13px] font-semibold flex gap-[5px] mt-[47px] cursor-pointer">
          <p className="w-[32px] h-[32px]  border border-[#F1F1F1] text-white flex items-center justify-center rounded-lg">
            <img src={firstimg} alt="" />
          </p>
          <p className="w-[32px] h-[32px]  border border-[#F1F1F1] text-white flex items-center justify-center rounded-lg">
            <img src={previmg} alt="" />
          </p>
          {Array.from({ length: totalPages }, (_, index) => (
            <p
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`w-[32px] h-[32px] ${
                currentPage === index + 1 ? 'bg-[#2f80ed] text-white' : 'border border-[#F1F1F1] text-[#333]'
              } flex items-center justify-center rounded-lg`}
            >
              {index + 1}
            </p>
          ))}
          <p className="w-[32px] h-[32px]  border border-[#F1F1F1] text-white flex items-center justify-center rounded-lg rotate-[180deg] ">
            <img src="./assets/img/Prev.svg" alt="" />
          </p>
          <p className="w-[32px] h-[32px]  border border-[#F1F1F1] text-white flex items-center justify-center rounded-lg rotate-[180deg]">
            <img src="./assets/img/First.svg" alt="" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserList;

