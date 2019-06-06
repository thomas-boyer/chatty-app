import React, {Component} from 'react';

const NavBar = ({numUsers}) =>
{
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="num-users">{numUsers} {(numUsers !== 1) ? "users" : "user"} connected</span>
    </nav>
  )
}

export default NavBar;