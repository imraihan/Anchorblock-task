import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserList } from '../features/userListSlice';

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
    <div>
      {userList.status === 'loading' && <p>Loading...</p>}
      {userList.status === 'succeeded' && (
        <>
          <ul>
            {userList.data.data.map((user) => (
              <li key={user.id}>
                <img src={user.avatar} alt={user.first_name} />
                <p>{user.email}</p>
                <p>{user.first_name} {user.last_name}</p>
              </li>
            ))}
          </ul>


          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
      {userList.status === 'failed' && <p>Error: {userList.error}</p>}
    </div>
  );
}

export default UserList;
