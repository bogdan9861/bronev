import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { useGetDriversMutation } from "../../../app/service/dictionary";
import { Humanize } from "../../../utils/HumanizeData";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { selectDrivers } from "../../../features/drivers";

const Drivers = () => {
  const [getDrivers] = useGetDriversMutation();
  const { data, total, loading, error } = useSelector(selectDrivers);

  const [oppenModal, setOppenModal] = useState(false);
  const [driver, setDriver] = useState([]);

  const [form] = Form.useForm();

  const [query, setQuery] = useState({
    firstName: "",
    lastname: "",
    patronymic: "",
    show_all: "",
    page: 1,
  });

  useEffect(() => {
    if (!data.length > 0) {
      getDrivers(query);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const dataSource = Humanize(data);

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
      title: "Дата Рождения",
      dataIndex: "birthDate",
      key: "birthDate",
    },
    {
      title: "Активность",
      dataIndex: "active",
      key: "active",
    },
    {
      title: "Пол",
      dataIndex: "sex",
      key: "sex",
    },
  ];

  const onSearch = (values) => {
    setQuery({ ...values, page: query.page });
    getDrivers({ ...values, page: query.page });
  };

  const onReset = (e) => {
    form.resetFields();
  };

  const onPaginate = (page) => {
    setQuery({ ...query, page });
    getDrivers({ ...query, page });
  };

  const onRow = (record, rowIndex) => {
    setOppenModal(true);
    setDriver(record);
  };

  return (
    <>
      <Form onFinish={onSearch} form={form}>
        <Flex gap="0 20px">
          <Flex gap="0 20px">
            <Form.Item name="firstName" initialValue={""}>
              <Input placeholder="имя" type="text" />
            </Form.Item>
            <Form.Item name="lastname" initialValue={""}>
              <Input placeholder="Фамилия" type="text" />
            </Form.Item>
            <Form.Item name="patronymic" initialValue={""}>
              <Input placeholder="Отчество" type="text" />
            </Form.Item>
            <Form.Item name="show_all">
              <Select style={{ width: "200px" }}>
                <Select.Option value={false}>Активные</Select.Option>
                <Select.Option value={true}>Все</Select.Option>
              </Select>
            </Form.Item>
          </Flex>
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
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onRow(record, event);
            },
          };
        }}
      />
      <Pagination
        current={query.page}
        total={total}
        onChange={onPaginate}
        defaultPageSize={30}
      />
      <Modal
        open={oppenModal}
        onCancel={() => setOppenModal(false)}
        onOk={() => setOppenModal(false)}
      >
        <h1 style={{ fontSize: "25px" }}>
          {driver.lastname} {driver.firstname} {driver.patronymic}
        </h1>
        <Divider />
        <Flex justify="space-between">
          <b>Дата рождения:</b>
          <span>{driver.birthDate}</span>
        </Flex>
        <Divider />
        <Flex justify="space-between">
          <b>Активность:</b>
          <span>{driver.active}</span>
        </Flex>
        <Divider />
        <Flex justify="space-between">
          <b>Пол:</b>
          <span>{driver.sex}</span>
        </Flex>
      </Modal>
    </>
  );
};

export default Drivers;
