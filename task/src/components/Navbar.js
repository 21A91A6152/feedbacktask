import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/logotb.png'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Full Navbar visible only on medium screens and up */}
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
          <div className="flex items-center ">
          <input
            type="text"
            className="p-1 border-white border rounded"
            placeholder="Search"
          />
          <button className="bg-white px-2 py-1 rounded ml-2">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
          </li>
          <li className="px-20"><img src={logo} style={{height:"30px"}}></img></li>
          {isLoggedIn ? (
            <>
              <li className="mx-5">{user}</li>
              <li className="mx-5">
                <button onClick={handleLogout} className="px-2 py-1 bg-white rounded">
                  Logout <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </li>
            </>
          ) : (
            <li className="mx-5">
              <Link to={`/login`}>
                <button className="px-2 py-1 bg-white rounded">Sign In / Log In</button>
              </Link>
            </li>
          )}
        </ul>

        {/* Search bar always visible */}
        <div className="flex items-center md:hidden ">
          <img src={logo} style={{height:"30px",width:"90px",paddingRight:"5px"}}></img>
          <input
            style={{width:"120px"}}
            type="text"
            className="p-1 m-1 border-white border rounded"
            placeholder="Search"
          />
          <button className="bg-white px-2 py-1 rounded ml-1">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        

        {/* Sidebar toggle button visible only on mobile */}
        <div className="block md:hidden">
          <button className="p-2 " onClick={toggleSidebar}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Sidebar visible on mobile when toggled */}
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
