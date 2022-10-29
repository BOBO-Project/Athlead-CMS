import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Row, Col, Button, notification } from "antd";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getErrorMessage } from "../../utils/errorMessage";
import { API_URL, STORAGE_KEY } from "../../constants";
import ModalEmailFormat from "./Modal";

const columns = [
  {
    title: "No",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

const User = () => {
  const { getItem } = useLocalStorage();

  const [list, setList] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL.getEmailList, {
        headers: {
          Authorization: getItem(STORAGE_KEY.token),
        },
      })
      .then(({ data }) => {
        setList(data.data);
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: getErrorMessage(err),
        });
      });
  }, []);

  const handleSubmit = async (values) => {
    await axios.post(API_URL.blastEmail, values, {
      headers: {
        Authorization: getItem(STORAGE_KEY.token),
      },
    });
    setIsVisible(false);
  };

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Button onClick={() => setIsVisible(true)}>Blast Email</Button>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={list} />
      </Col>
      {isVisible && (
        <ModalEmailFormat
          isVisible={isVisible}
          onSubmit={handleSubmit}
          onClose={() => setIsVisible(false)}
        />
      )}
    </Row>
  );
};

export default User;
