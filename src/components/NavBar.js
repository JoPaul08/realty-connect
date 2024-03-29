import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/realtor">Realtor</Link>
        </li>
        <li>
          <Link to="/property">Property</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
