import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user";

import logo from "../../assets/images/logo.png";
import "./Aside.scss";

const Aside = () => {
  const [menuOppen, setMenuOppen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const loguot = () => {
    localStorage.removeItem("token");
    dispatch(loguot());
    window.location.reload();
  };

  return (
    <aside className="aside">
      <div className="aside__top-wrapper">
        <div className="aside__top">
          <div className="aside__top-photo__wraper">
            <img className="aside__top-photo" src={logo} alt="" />
          </div>
          <div className="aside__top-inner">
            <button
              className="aside__top-info"
              onClick={() => setMenuOppen(!menuOppen)}
            >
              <span className="aside__top-name">{user.username}</span>
            </button>
            <div
              className={`aside-dropdown__wrapper  ${menuOppen ? "show" : ""}`}
            >
              <ul className="aside-dropdown">
                <li className="aside-dropdown__item">
                  <a className="aside-dropdown__link profile" href="#">
                    Профиль
                  </a>
                </li>
                <hr className="aside-dropdown__divider" />
                <li className="aside-dropdown__item">
                  <button
                    className="aside-dropdown__link exit"
                    onClick={() => loguot()}
                  >
                    Выйти
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="aside__body">
        <div className="aside__body-dropdown">
          <button
            className={`aside__body-dropdown__btn ${
              dropdownActive ? "active" : ""
            }`}
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={() => setDropdownActive(!dropdownActive)}
          >
            Справочники
          </button>
          <ul
            className={`aside__body-dropdown__menu ${
              dropdownActive ? "show" : ""
            }`}
            aria-labelledby="dropdownMenu1"
          >
            <li className="aside__body-dropdown__item">
              <Link className="aside__body-dropdown__link" to="/drivers">
                Водители
              </Link>
            </li>
            <li className="aside__body-dropdown__item">
              <Link className="aside__body-dropdown__link" to="/directions">
                Направления
              </Link>
            </li>
            <li className="aside__body-dropdown__item">
              <Link className="aside__body-dropdown__link" to="/people">
                Пассажиры
              </Link>
            </li>
            <li className="aside__body-dropdown__item">
              <Link className="aside__body-dropdown__link" to="/cities">
                Города
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
