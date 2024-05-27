import React, { useState } from "react";
import { Navbar } from "react-bootstrap";

import logo from "../../assets/images/logo.png";
import "./Header.scss";

const Header = ({ setBurgerActive, burgerActive }) => {
  return (
    <header className="header bg-dark text-white sticky-top">
      <div className="header__inner d-flex justify-content-between align-items-center w-100">
        <Navbar>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="30px"
              height="30px"
              className="d-inline-block align-top ml-20"
            />
          </Navbar.Brand>
          <img
            style={{
              display: burgerActive ? "block" : "none",
              width: "150px",
              height: "40px",
            }}
            src={"https://dev.bronew.ru/images/logo-light-text.png"}
            alt=""
          />
          <button
            className="header__burger"
            onClick={() => setBurgerActive(!burgerActive)}
          >
            <img
              src="https://img.icons8.com/?size=100&id=59832&format=png&color=ffffff"
              alt=""
            />
          </button>
          <nav className="nav">
            <ul className="list d-flex">
              <li className="menu-list__item">
                <a className="menu-list__link" href="#">
                  Продажи
                </a>
              </li>
              <li className="menu-list__item mx-3">
                <a className="menu-list__link" href="#">
                  Маршруты
                </a>
              </li>
              <li className="menu-list__item">
                <a className="menu-list__link" href="#">
                  Отчёты
                </a>
              </li>
            </ul>
          </nav>
        </Navbar>
        <div className="header__profile">
          <img className="header__profile-img" src={logo} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
