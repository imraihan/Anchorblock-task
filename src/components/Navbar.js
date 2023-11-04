// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// function Navbar() {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   return (
//     <nav>
//       <ul>
//         {isAuthenticated ? (
//           <>
//             <li><Link to="/userlist">User List</Link></li>
//             <li><Link to="/logout">Logout</Link></li>
//           </>
//         ) : (
//             <>
//           <li><Link to="/login">Login</Link></li>
//           <li><Link to="/register">Register</Link></li>
//             </>        
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="bg-gray-400">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white"></Link>
        <ul className="space-x-4 text-white flex items-center justify-center">
          {isAuthenticated ? (
            <>
              <li><Link to="/userlist">User List</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
