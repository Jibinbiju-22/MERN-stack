import React, { useContext }  from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './navLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);
  return <ul className="nav-links">
     <li>
      <NavLink to="/" >HOME</NavLink>
    </li>
    <li>
      <NavLink to="/users" >USERS</NavLink>
    </li>
    {auth.isLoggedIn && (
    <li>
      <NavLink to={`/${auth.userId}/places`}>PLACES</NavLink>
    </li>
    )}
    {auth.isLoggedIn && (
    <li>
      <NavLink to="/newPlace">ADD</NavLink>
    </li>
    )}
    {auth.isLoggedIn && (
        <li>
          <button className="button-6" onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    {!auth.isLoggedIn && (
    <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>
    )}
  </ul>
};

export default NavLinks;