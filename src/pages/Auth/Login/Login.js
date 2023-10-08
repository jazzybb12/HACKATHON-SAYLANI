import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../../../context/AuthContext";

export default function Register() {
  const { getProfile } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const { Title } = Typography;
  const handleLogin = (values) => {
    const { email, password } = values;
    setIsProcessing(true);
    signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        getProfile(user);
        message.success("Login successfully");
      })
      .catch((error) => {
        message.error("Something went wrong while user sign Up");
        console.error(error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };
  return (
    <>
      <div className="container login py-5">
        <div className="row w-100 mx-auto">
          <div className="col">
            <div className="card border-0 col-md-4 m-auto px-4 px-md-5   py-4">
              <Form
                autoComplete="off"
                style={{
                  textAlign: "center",
                }}
                onFinish={handleLogin}
              >
                <Title level={2} className="text-center mb-5 mt-3 heading ">
                  Login{" "}
                </Title>{" "}
                <Form.Item
                  name="email"
                  rules={[
                    {
                      message: "Please enter valid email",
                      type: "email",
                      required: true,
                    },
                    {
                      whitespace: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Enter Email" name="email" />
                </Form.Item>{" "}
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Password",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    name="password"
                    placeholder="Enter Password"
                  />
                </Form.Item>{" "}
                <Form.Item className="text-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isProcessing}
                    disabled={isProcessing}
                    className="w-50 sideFont"
                  >
                    Login{" "}
                  </Button>{" "}
                </Form.Item>{" "}
                <Form.Item className="text-center">
                  <p className="mb-0 sideFont">
                    Dont have an account ?{" "}
                    <Link to="/auth/register" className="sideFont">
                      {" "}
                      Register{" "}
                    </Link>{" "}
                    Here{" "}
                  </p>{" "}
                </Form.Item>{" "}
              </Form>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
