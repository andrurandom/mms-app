import React from 'react';
import '../styles/Header.css';
import ps_logo from '../assets/ps_logo.png';
// import {  } from "module";
import jsCookie from 'js-cookie';


const Header = () => {
  let totalRoles = ['Home', 'CP', 'JCP', 'DCP', "ACP", "SHO"]
  let userRole = jsCookie.get('role');
  let indexOfrole = userRole !== undefined ? totalRoles.indexOf(userRole) : -1;

  const tabPath = totalRoles.map((ank, index) => {
    if (index <= indexOfrole){
      return <span key={index}>{ank} {index < indexOfrole  && '>'}</span>;
    }
  });

  return (
    <header className="header">
      <div className="header-top">
        <nav className="header-navigation">
        {userRole !== 'SHO' && (
            <a className="header-button" href="/home">Home</a>
          )}
          <a className="header-button" href="/dashboard">Dashboard</a>
          <a className="header-button" href="#">Servers</a>
        </nav>
        <div className="header-logo">
          <img src={ps_logo} alt="PS Logo" />
        </div>
        <div className="header-text">Material Management</div>
      </div>
      <div className="header-path">
        {tabPath}
      </div>
    </header>
  );
}

export default Header;
