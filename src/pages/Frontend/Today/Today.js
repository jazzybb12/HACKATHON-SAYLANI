import React, { useState } from "react";
import { Card, Modal, message, Input, Select, Button, Form, DatePicker, ColorPicker, Typography, } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "../../../config/firebase";
import ShowTask from "../../Dashboard/ShowTask";
import { useAuthContext } from "../../../context/AuthContext";


export default function AddTask() {
    const { user } = useAuthContext();
    const { Title } = Typography;
    const [date, setDate] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [addTodo, setAddTodo] = useState({});

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleDate = (_, date) => {
        setDate(date);
    };
    const handleFinish = async (values) => {
        const {
            courseName,
            studentId,
            
        } = values;

        const BachaId = Math.random().toString(36).slice(2);
        const courses = {
            courseName,
            
            studentId,


            id: BachaId,
            createdBy: {
                email: user.createdBy.email,
                uid: user.createdBy.uid,
                fullname: user.fullname,
            },
        };

        try {
            setIsLoading(true);
            await setDoc(doc(db, "courses", courses.id), courses);
            setAddTodo(courses);
            message.success("Student Information has been added successfully");
        }
        catch (error) {
            console.error(error);
            message.error("Something went wrong while adding Student Information");
        }

        setIsLoading(false);
        setIsModalOpen(false);
    };
    const handleFinishFailed = () => {
        message.error("Something went wrong while adding Student Information");
    };

   
    return (
        <>
            <div className="container-fluid rounded-lg " >
                <div className="row  " >
                    <div className="col " >
                        <h1 className="mt-3 mb-4" > Courses  </h1>
                        <Button  onClick={showModal} >Add New Course</Button>
                        <ShowTask addTodo={addTodo} />

                        <Modal open={isModalOpen} onCancel={() => { setIsModalOpen(false); }} onOk={() => { setIsModalOpen(false); }} >
                            <Form layout="vertical" onFinish={handleFinish} onFinishFailed={handleFinishFailed} >
                                <Title level={2}>
                                    Add New Course
                                </Title>
                                <div className="d-flex justify-content-between">


                                </div>
                                <Form.Item name="courseName"
                                    rules={
                                        [{
                                            required: true,
                                            min: 5,
                                            message: "Student Name must contain atleast 3 characters",
                                        },]
                                    }
                                    hasFeedback >
                                    <Input name="title" placeholder="Enter Student Name" />
                                </Form.Item>
                                <Form.Item name="studentId"

                                    hasFeedback >
                                    <Input name="StudentId" placeholder="Enter Student ID" />
                                </Form.Item>

                                <Form.Item className="w-75" name="todoType"
                                    rules={
                                        [{
                                            required: true,
                                            message: "Please Select Category"
                                        },]
                                    }
                                    hasFeedback >
                                    <Select name="todoType"
                                        className="text-center"
                                        placeholder="Status" >
                                        <Select.Option value="Personal" > Active </Select.Option>
                                        <Select.Option value="Bussiness" > Inactive </Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item className="text-center" >
                                    <Button type="primary" className="w-25" loading={isLoading} disabled={isLoading} htmlType="submit" >
                                        Add Student
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
}