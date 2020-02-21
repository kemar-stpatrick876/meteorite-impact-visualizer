import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../meteorite.svg';
import './Header.scss';

export default function Header() {
  return (
    <div className="Header">
      <span>
        <img className="Header__app-logo" src={logo} alt="meteorite logo" />
        <h2 className="Header__app-title">Meteorite Impact Visualizer</h2>
      </span>
      <nav className="Header__nav">
        <ul className="nav-list">
          <li className="nav-list__item">
            <NavLink
              to="/map"
              className="nav-list__item__link"
              activeClassName="nav-list__item__link--active"
            >
              Map
            </NavLink>
          </li>
          <li className="nav-list__item">
            <NavLink
              to="/history"
              className="nav-list__item__link"
              activeClassName="nav-list__item__link--active"
            >
              History
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
