import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import firebase from "firebase"


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img className = "nav-logo" src= {'/images/pawlogo.png'} alt = "logo"/>
          Paw-Mates
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/list'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                List
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/matches'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Matches
              </Link>
            </li>
            <li className='nav-item'>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;