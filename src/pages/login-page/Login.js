import React from "react";
import axios from "axios";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/errorMessage";
import useLocalStorage from "../../hooks/useLocalStorage";
import { WEB_PATH, API_URL, STORAGE_KEY } from "../../constants";
import LOGO from "../../logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { setItem } = useLocalStorage();

  const handleLogin = async (value) => {
    try {
      const { data } = await axios.post(API_URL.login, value);
      setItem(STORAGE_KEY.token, data.access_token);
      navigate(WEB_PATH.user, { replace: true });
    } catch (error) {
      notification.error({
        message: "Error",
        description: getErrorMessage(error),
        placement: "topRight",
      });
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#D8D8D8",
      }}
    >
      <div
        style={{
          padding: 16,
          minWidth: 450,
          height: 350,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
          background: "#ffff",
        }}
      >
        <img src={LOGO} width={250} style={{ marginBottom: 10 }} alt="logo" />
        <Form form={form} onFinish={handleLogin} layout="vertical">
          <Form.Item name="email">
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item shouldUpdate>
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100%", background: "#7D0E23", border: "none" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
