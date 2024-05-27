import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const BreadCrumbs = () => {
  const { mode } = useParams();

  return (
    <div className="breadcrumbs w-100" style={{ backgroundColor: "#fff" }}>
      <div
        className="breadcrumbs__inner d-flex"
        style={{ padding: "10px 15px" }}
      >
        <Breadcrumb>
          <Breadcrumb.Item active>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{mode}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadCrumbs;
