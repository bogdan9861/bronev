import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user";

import logo from "../../assets/images/logo.png";
import "./Aside.scss";

const Aside = ({ setBurgerActive, burgerActive }) => {
  const [menuOppen, setMenuOppen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const onLoguot = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    window.location.reload();
  };

  return (
    <aside className={`aside ${!burgerActive ? "collapse-aside" : ""}`}>
      <div className="aside__top-wrapper">
        <div className="aside__top">
          <div
            className={`aside__top-photo__wraper ${
              !burgerActive ? "collapse-photo__wrapper" : ""
            }`}
          >
            <img className="aside__top-photo" src={logo} alt="" />
          </div>
          <div className="aside__top-inner">
            <button
              className={`aside__top-info ${
                !burgerActive ? "collapse-info" : ""
              } `}
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
                    onClick={() => onLoguot()}
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
          <nav>
            <ul>
              <li className="d-flex" onClick={() => setBurgerActive(true)}>
                <img
                  src="https://img.icons8.com/?size=100&id=tkhqCTJ1ic2S&format=png&color=7c7c7c"
                  alt=""
                  style={{ width: "25px", height: "25px" }}
                />
                <div className={!burgerActive ? "collapse-menu" : ""}>
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
                      <Link
                        className="aside__body-dropdown__link"
                        to="/drivers"
                      >
                        Водители
                      </Link>
                    </li>
                    <li className="aside__body-dropdown__item">
                      <Link
                        className="aside__body-dropdown__link"
                        to="/directions"
                      >
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
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
