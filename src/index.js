import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store/store.ts";
import {
  createBrowserRouter,
  RouterProvider as Router,
} from "react-router-dom";

import Main from "./pages/main/Main";
import Login from "./pages/login/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/:mode",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

root.render(
  <Provider store={store}>
    <Router router={router} />
  </Provider>
);
