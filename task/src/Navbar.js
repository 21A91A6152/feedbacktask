import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
         
        <ul className="flex space-x-4">
                <li style={{float:"left"}} className="nav-item active mx-1 pt-2">
                    <Link to={`/admin`} className="nav-link "  >AdminPanel <span className="sr-only"> </span></Link>
                </li>
                <li style={{float:"left"}} className="nav-item  mx-1 pt-2">
                    <Link to={`/`} className="nav-link " >Blog <span className="sr-only"> </span></Link>
                </li>
                <li style={{float:"left"}} className="nav-item mx-1 pt-2">
                    <Link to={`/feedback`} className="nav-link " >Feedback <span className="sr-only"> </span></Link>
                </li>
                <li style={{float:"left"}} className="nav-item  pt-2">
                    <input type="text" className="p-1 border-white border rounded" placeholder="Search"></input>
                </li>
                <li style={{float:"left"}} className="nav-item  pt-2">
                  <button className="bg-white px-2 py-1 rounded"><i class="fa-solid fa-magnifying-glass"></i></button>
                </li>
                 
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
