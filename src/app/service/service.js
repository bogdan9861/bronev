import React from "react";
import { useHttp } from "../hooks/useHttp";

const Service = () => {
  const { loading, error, request, clearError } = useHttp();

  const getCities = async () => {
    return await request(`https://svida.routeam.ru/api/cities`);
  };

  return { loading, error, getCities };
};

export default Service;
