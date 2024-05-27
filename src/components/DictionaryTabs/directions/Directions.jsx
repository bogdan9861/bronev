import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Input, Pagination, Table } from "antd";
import { useGetDirectionsMutation } from "../../../app/service/dictionary";
import { Humanize } from "../../../utils/HumanizeData";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { selectDirections } from "../../../features/directions";

const Directions = () => {
  const [getDirections] = useGetDirectionsMutation();
  const { data, total, loading, error } = useSelector(selectDirections);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);

  const [form] = Form.useForm();

  useEffect(() => {
    if (!data.length > 0) {
      getDirections({ name, page });
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const dataSource = Humanize(data);

  const columns = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Сокращение",
      dataIndex: "shortName",
      key: "shortName",
    },
    {
      title: "Активность",
      dataIndex: "active",
      key: "active",
    },
  ];

  const onSearch = ({ name }) => {
    setName(name);
    getDirections({ name, page });
  };

  const onReset = (e) => {
    form.resetFields();
  };

  const onPaginate = (page) => {
    setPage(page);
    getDirections({ name, page });
  };

  return (
    <>
      <Form form={form} onFinish={onSearch}>
        <Flex gap="0 20px">
          <Form.Item name="name" style={{ width: "50%" }}>
            <Input placeholder="Поиск по наименованию" />
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
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        defaultPageSize={30}
      />
      <Pagination total={total} onChange={onPaginate} current={page} />
    </>
  );
};

export default Directions;
