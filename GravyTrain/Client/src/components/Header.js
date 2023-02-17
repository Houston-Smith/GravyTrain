import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";
import "./Header.css"

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <ul className="nav">
      {isLoggedIn && (
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>
        </li>
      )}

      {/* {!isLoggedIn && (
       <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
       </li>
      )} */}
      </ul>
  </nav>
  );
}