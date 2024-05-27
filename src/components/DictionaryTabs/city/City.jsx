import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCities } from "../../../features/city";
import { Spinner } from "react-bootstrap";
import { useGetCitiesMutation } from "../../../app/service/cities";
import Service from "../../../app/service/service";

const City = () => {
  const [query, setQuery] = useState({
    name: "",
    okato: "",
    oktmo: "",
    shortName: "",
    page: 1,
  });

  const test = async () => {
    const res = await fetch("https://svida.routeam.ru/api/cities")
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    test();
  }, []);

  return <div>City</div>;
};

export default City;
