import { Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.href.split("token=")[1]) {
      localStorage.setItem(
        "token",
        window.location.href.split("token=")[1].split("&")[0]
      );
    }
  }, [window.location.href]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/drivers");
    }
  }, []);

  const openModal = async () => {
    const newWindow = window.open(
      "https://core.dev.bronew.ru/auth/sso",
    );
  };

  return (
    <div className="d-flex" style={{ background: "#fff" }}>
      <div
        className="logo_img"
        style={{
          backgroundImage:
            "url(https://урсэг.рф/cache/5/c50198ded62a8ea4df387a4b094935e6.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "30%",
          height: "100vh",
        }}
      ></div>
      <div
        className="align-self-center w-50 mx-auto"
        style={{ color: "#455A62" }}
      >
        <h1 className="mb-4">
          Добро пожаловать в систему управления продажами{" "}
          <span className="text-uppercase font-weight-bold">бронев</span>
        </h1>
        <span className="">
          Для продолжения работы необходимо пройти авторизацию
        </span>
        <Divider />
        <Button style={{ width: "300px" }} onClick={() => openModal()}>
          войти
        </Button>
      </div>
    </div>
  );
};

export default Login;
