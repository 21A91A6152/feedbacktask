import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/logotb.png';

const Navbar = ({ setSearchQuery }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchQuery(''); // Also clear the search query in the parent component
  };

  return (
    <nav className="bg-green-500 p-4">
      <div className="container-fluid mx-auto flex justify-between items-center">
        <ul className="hidden md:flex space-x-4">
          {isLoggedIn && (
            <li className="nav-item active mx-1 pt-2">
              <Link to={`/admin`} className="nav-link">Admin Panel</Link>
            </li>
          )}
          <li className="nav-item md:mx-5 pt-2">
            <Link to={`/`} className="nav-link">Blog</Link>
          </li>
          <li className="nav-item md:mx-5 pt-2">
            <Link to={`/feedback`} className="nav-link">Feedback</Link>
          </li>
          <li className="mx-10">
          <div className="relative">
            <input
              style={{ width: "120px" }}
              type="text"
              className="p-1 m-1 border-white border rounded pr-8" // Add padding to the right for the 'X' button
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
              {searchTerm && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={clearSearch}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
             
             </div>
               
          </li>
          <li><button
                className="bg-white px-2 py-1 m-1 rounded ml-2"
                onClick={handleSearch}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button></li>
          <li className="md:px-10">
            <img src={logo} alt="logo" style={{ height: "30px" }} />
          </li>
          {isLoggedIn ? (
            <>
              <li className="mx-5" style={{ float: "right" }}>{user}</li>
              <li className="mx-5" style={{ float: "right" }}>
                <button onClick={handleLogout} className="px-2 py-1 bg-white rounded">
                  Logout <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </li>
            </>
          ) : (
            <li className="mx-5" style={{ float: "right" }}>
              <Link to={`/login`}>
                <button className="px-2 py-1 bg-white rounded">Sign In / Log In</button>
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center md:hidden ">
          <img src={logo} alt="logo" style={{ height: "30px", paddingRight: "3px" }} />
           
          
          <div className="relative">
            <input
              style={{ width: "120px" }}
              type="text"
              className="p-1 m-1 border-white border rounded pr-8" // Add padding to the right for the 'X' button
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
              {searchTerm && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={clearSearch}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
             
             </div>
               
           <div> 
              <button
                className="bg-white px-2 py-1 m-1 rounded ml-2"
                onClick={handleSearch}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

             
            
           
        </div>

        <div className="block md:hidden">
          <button className="p-2 " onClick={toggleSidebar}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="bg-green-700 p-4 md:hidden">
          <ul className="flex flex-col space-y-4">
            {isLoggedIn && (
              <li className="nav-item active">
                <Link to={`/admin`} className="nav-link" onClick={toggleSidebar}>Admin Panel</Link>
              </li>
            )}
            <li className="nav-item">
              <Link to={`/`} className="nav-link" onClick={toggleSidebar}>Blog</Link>
            </li>
            <li className="nav-item">
              <Link to={`/feedback`} className="nav-link" onClick={toggleSidebar}>Feedback</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">{user}</li>
                <li className="nav-item">
                  <button onClick={() => { handleLogout(); toggleSidebar(); }} className="px-2 py-1 bg-white rounded">
                    Logout <i className="fa-solid fa-right-from-bracket"></i>
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to={`/login`} onClick={toggleSidebar}>
                  <button className="px-2 py-1 bg-white rounded">Sign In / Log In</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from '../images/logotb.png';

// const Navbar = ({ setSearchQuery }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userDataString = localStorage.getItem('userData');
//     if (userDataString) {
//       const userData = JSON.parse(userDataString);
//       setIsLoggedIn(true);
//       setUser(userData);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('userData');
//     setIsLoggedIn(false);
//     setUser(null);
//     navigate('/');
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleSearch = () => {
//     setSearchQuery(searchTerm);
//   };

//   return (
//     <nav className="bg-green-500 p-4">
//       <div className="container-fluid mx-auto flex justify-between items-center">
//         <ul className="hidden md:flex space-x-4">
//           {isLoggedIn && (
//             <li className="nav-item active mx-1 pt-2">
//               <Link to={`/admin`} className="nav-link">Admin Panel</Link>
//             </li>
//           )}
//           <li className="nav-item md:mx-5 pt-2">
//             <Link to={`/`} className="nav-link">Blog</Link>
//           </li>
//           <li className="nav-item md:mx-5 pt-2">
//             <Link to={`/feedback`} className="nav-link">Feedback</Link>
//           </li>
//           <li className="mx-10">
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 className="p-1 border-white border rounded"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <button
//                 className="bg-white px-2 py-1 rounded ml-2"
//                 onClick={handleSearch}
//               >
//                 <i className="fa-solid fa-magnifying-glass"></i>
//               </button>
//             </div>
//           </li>
//           <li className="md:px-10">
//             <img src={logo} alt="logo" style={{ height: "30px" }} />
//           </li>
//           {isLoggedIn ? (
//             <>
//               <li className="mx-5" style={{ float: "right" }}>{user}</li>
//               <li className="mx-5" style={{ float: "right" }}>
//                 <button onClick={handleLogout} className="px-2 py-1 bg-white rounded">
//                   Logout <i className="fa-solid fa-right-from-bracket"></i>
//                 </button>
//               </li>
//             </>
//           ) : (
//             <li className="mx-5" style={{ float: "right" }}>
//               <Link to={`/login`}>
//                 <button className="px-2 py-1 bg-white rounded">Sign In / Log In</button>
//               </Link>
//             </li>
//           )}
//         </ul>

//         <div className="flex items-center md:hidden ">
//           <img src={logo} alt="logo" style={{ height: "30px", paddingRight: "3px" }} />
//           <input
//             style={{ width: "120px" }}
//             type="text"
//             className="p-1 m-1 border-white border rounded"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button
//             className="bg-white px-2 py-1 rounded ml-1"
//             onClick={handleSearch}
//           >
//             <i className="fa-solid fa-magnifying-glass"></i>
//           </button>
//         </div>

//         <div className="block md:hidden">
//           <button className="p-2 " onClick={toggleSidebar}>
//             <i className="fa-solid fa-bars"></i>
//           </button>
//         </div>
//       </div>

//       {isSidebarOpen && (
//         <div className="bg-green-700 p-4 md:hidden">
//           <ul className="flex flex-col space-y-4">
//             {isLoggedIn && (
//               <li className="nav-item active">
//                 <Link to={`/admin`} className="nav-link" onClick={toggleSidebar}>Admin Panel</Link>
//               </li>
//             )}
//             <li className="nav-item">
//               <Link to={`/`} className="nav-link" onClick={toggleSidebar}>Blog</Link>
//             </li>
//             <li className="nav-item">
//               <Link to={`/feedback`} className="nav-link" onClick={toggleSidebar}>Feedback</Link>
//             </li>
//             {isLoggedIn ? (
//               <>
//                 <li className="nav-item">{user}</li>
//                 <li className="nav-item">
//                   <button onClick={() => { handleLogout(); toggleSidebar(); }} className="px-2 py-1 bg-white rounded">
//                     Logout <i className="fa-solid fa-right-from-bracket"></i>
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <li className="nav-item">
//                 <Link to={`/login`} onClick={toggleSidebar}>
//                   <button className="px-2 py-1 bg-white rounded">Sign In / Log In</button>
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

 