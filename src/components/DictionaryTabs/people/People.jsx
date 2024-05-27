import { Button, Flex, Form, Input, Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useGetPeopleMutation } from "../../../app/service/dictionary";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

import { selectPeople } from "../../../features/people";
import { Humanize } from "../../../utils/HumanizeData";

const People = () => {
  const [getPeople] = useGetPeopleMutation();
  const { data, total, loading } = useSelector(selectPeople);
  const [query, setQuery] = useState({
    FIO: "",
    document: "",
    phone: "",
    page: 1,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (!data.length > 0) {
      getPeople(query);
    }
  }, []);

  const convertArr = (arr) => {
    const newArr = [];

    data.forEach((el) => {
      newArr.push({
        ...el,
        number: `${el.documents[0].number} ${el.documents[0].serial}`,
      });
    });

    return newArr;
  };

  const dataSource = Humanize(convertArr(data));

  const columns = [
    {
      title: "Имя",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Фамилия",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Отчество",
      dataIndex: "patronymic",
      key: "patronymic",
    },
    {
      title: "Номер телефона",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Пол",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Серия и номер паспорта",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Дата Рождения",
      dataIndex: "birthdate",
      key: "birthdate",
    },
  ];

  if (loading) {
    return <Spinner />;
  }

  const onSearch = (values) => {
    getPeople({ ...values, page: query.page });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onPaginate = (page) => {
    if (page != query.page) {
      setQuery({ ...query, page });
      getPeople({ ...query, page });
    }
  };

  return (
    <>
      <Form form={form} onFinish={onSearch}>
        <Flex gap="0 20px">
          <Form.Item name="FIO" style={{ width: "100%" }} initialValue={""}>
            <Input placeholder="Поиск по ФИО" />
          </Form.Item>
          <Form.Item name="phone" style={{ width: "100%" }} initialValue={""}>
            <Input placeholder="Поиск по номеру телефона" />
          </Form.Item>
          <Form.Item
            name="document"
            style={{ width: "100%" }}
            initialValue={""}
          >
            <Input placeholder="Поиск по серии или по номеру документа" />
          </Form.Item>

          <Flex gap="0 10px">
            <Button htmlType="submit" type="primary">
              поиск
            </Button>
            <Button
              style={{ backgroundColor: "red", color: "#fff" }}
              onClick={() => onReset()}
            >
              сбросить
            </Button>
          </Flex>
        </Flex>
      </Form>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <Pagination
        total={total}
        onChange={onPaginate}
        current={query.page}
        defaultPageSize={30}
      />
    </>
  );
};

export default People;
