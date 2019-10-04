import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => (
    <nav>
    <NavbarUnAuth/>
    </nav>
);

const NavbarUnAuth = () => (
    <ul>
        <li className="navb"><NavLink to="/" exact>Home</NavLink></li>
        <li className="navb"><NavLink to="/ratings">Ratings</NavLink></li>
        <li className="navb"><NavLink to="/rate">Rate</NavLink></li>
        <li className="navb"><NavLink to="/search">Search</NavLink></li>
        <li className="navb"><NavLink to="/logout">Logout</NavLink></li>
    </ul>
);

export default Navbar
