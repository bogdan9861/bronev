import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "antd";
import { useGetCurrentUsetQuery } from "../../app/service/user";

import Header from "../../components/header/Header";
import Aside from "../../components/aside/Aside";
import BreadCrumbs from "../../components/breadCrumbs/BreadCrumbs";

import Directions from "../../components/DictionaryTabs/directions/Directions";
import Drivers from "../../components/DictionaryTabs/drivers/Drivers";
import People from "../../components/DictionaryTabs/people/People";
import City from "../../components/DictionaryTabs/city/City";

import "./Main.scss";

const Main = () => {
  const user = useGetCurrentUsetQuery();
  const { mode } = useParams();
  const navigate = useNavigate();

  const [burgerActive, setBurgerActive] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  const setTab = () => {
    switch (mode) {
      case "drivers":
        return <Drivers />;

      case "directions":
        return <Directions />;

      case "people":
        return <People />;

      case "cities":
        return <City />;

      default:
        return <p>Выберите вкладку</p>;
    }
  };

  return (
    <div className="main">
      <Header setBurgerActive={setBurgerActive} burgerActive={burgerActive} />
      <Aside burgerActive={burgerActive} setBurgerActive={setBurgerActive} />
      <div>
        <BreadCrumbs />
        <div className="table__wrapper">
          <Card
            style={{
              float: "inline-start",
              width: "97%",
            }}
          >
            {setTab()}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Main;
