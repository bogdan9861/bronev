import React from "react";

const Table = ({
  dataSource,
  columns,
  currentPage,
  total,
  state,
  setState,
  defaultPageSize,
}) => {
  const onPaginate = (page) => {
    setState({ ...state, page });
  };

  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Pagination
        current={currentPage}
        total={total}
        onChange={onPaginate}
        defaultPageSize={defaultPageSize}
      />
    </>
  );
};

export default Table;
