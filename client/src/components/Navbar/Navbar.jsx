import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <nav className="navbar">
      <button className="navbar__toggleBtn" onClick={() => setShow(!show)}>
        <span className="navbar__toggleIcon"></span>
      </button>

      {show && (
        <ul className="navbar__toggleList" onClick={() => setShow(!show)}>
          <li className="navbar__toggleItem">
            <Link className="navbar__toggleLink" to="/user">
              Profile
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
