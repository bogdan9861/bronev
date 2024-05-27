import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Flex, Form, Input, Pagination, Table } from "antd";
import { Spinner } from "react-bootstrap";

import { useGetCitiesMutation } from "../../../app/service/cities";
import { selectCities } from "../../../features/city";

const City = () => {
  const [getCities] = useGetCitiesMutation();
  const { data, loading } = useSelector(selectCities);
  const [form] = Form.useForm();

  const [query, setQuery] = useState({
    name: "",
    okato: "",
    oktmo: "",
    shortName: "",
    page: 1,
  });

  useEffect(() => {
    if (!data.length > 0) {
      getCities(query);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const dataSource = data;

  const columns = [
    {
      title: "Сокращение",
      dataIndex: "shortName",
      key: "shortName",
    },
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Оф. Название",
      dataIndex: "officialName",
      key: "officialName",
    },
    {
      title: "Окато",
      dataIndex: "okato",
      key: "okato",
    },
    {
      title: "Октмо",
      dataIndex: "oktmo",
      key: "oktmo",
    },
    {
      title: "Долгота",
      dataIndex: "longtitude",
      key: "longtitude",
    },
    {
      title: "Широта",
      dataIndex: "latitude",
      key: "latitude",
    },
  ];

  const onSearch = (values) => {
    setQuery({ ...values, page: query.page });
    getCities({ ...values, page: query.page });
  };

  const onPaginate = (page) => {
    setQuery({ ...query, page });
    getCities({ ...query, page });
  };

  const onReset = (e) => {
    form.resetFields();
  };

  return (
    <>
      <Form form={form} onFinish={onSearch}>
        <Flex gap="0 20px">
          <Form.Item name="name" initialValue={""} style={{ width: "100%" }}>
            <Input placeholder="Поиск по наименованию" />
          </Form.Item>
          <Form.Item
            name="shortName"
            initialValue={""}
            style={{ width: "100%" }}
          >
            <Input placeholder="Поиск по сокращению" />
          </Form.Item>
          <Form.Item name="okato" initialValue={""} style={{ width: "100%" }}>
            <Input placeholder="Поиск по ОКАТО" />
          </Form.Item>
          <Form.Item name="oktmo" initialValue={""} style={{ width: "100%" }}>
            <Input placeholder="Поиск по ОКТМО" />
          </Form.Item>

          <Flex gap="0 10px">
            <Button htmlType="submit" type="primary">
              поиск
            </Button>
            <Button
              style={{ backgroundColor: "red", color: "#fff" }}
              onClick={(e) => onReset(e)}
            >
              сбросить
            </Button>
          </Flex>
        </Flex>
      </Form>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Pagination
        total={data.length}
        onChange={onPaginate}
        current={query.page}
        defaultPageSize={30}
      />
    </>
  );
};

export default City;
