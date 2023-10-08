import React, { useState } from "react";
import {
    Modal,
    message,
    Input,
    Select,
    Button,
    Form,
    Typography,
    Table,
} from "antd";
import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { db } from "../../config/firebase";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

export default function AddTask() {
    const { user } = useAuthContext();
    const { Title } = Typography;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

const fetchData = async () =>{
    const querySnapshot = await getDocs(collection(db, "students"));
querySnapshot.forEach((doc) => {
    console.log(doc.data())
    setData((prev) => [...prev, doc.data()])
    
});
}

useEffect(()=>{
fetchData()
},[])


    const columns = [
        {
            title: 'Student Name',
            dataIndex: 'studentName',
            key: 'title',
        },
        {
            title: 'Student ID',
            dataIndex: 'studentID',
            key: 'studentId',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'todoType',
            render: (todoType) => (
                <span>{todoType === 'Personal' ? 'Active' : 'Inactive'}</span>
            ),
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleFinish = async (values) => {
        const { studentName, studentID, status } = values;

        const BachaId = Math.random().toString(36).slice(2);
        const todo = {
            studentName,
            studentID,
            status,
            id: BachaId,
          
        };

        try {
            setIsLoading(true);
            await setDoc(doc(db, "students", todo.id), todo);
            setData((prevData) => [...prevData, todo]);
            message.success("Student Information has been added successfully");
        } catch (error) {
            console.error(error);
            message.error("Something went wrong while adding Student Information");
        }

        setIsLoading(false);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="container-fluid rounded-lg">
                <div className="row">
                    <div className="col">
                        <h1 className="mt-3 mb-4"> Students</h1>
                        <Button onClick={showModal}>Add Student</Button>
                        <Table
                            columns={columns}
                            dataSource={data}
                            rowKey={(record) => record.id}
                        />
                    </div>
                </div>
            </div>

            <Modal
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    <Title level={2}>Add Student</Title>
                    <Form.Item
                        name="studentName"
                        rules={[
                            {
                                required: true,
                                min: 3,
                                message: "Student Name must contain at least 3 characters",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input name="studentName" placeholder="Enter Student Name" />
                    </Form.Item>
                    <Form.Item name="studentID" hasFeedback>
                        <Input name="studentID" placeholder="Enter Student ID" />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        rules={[
                            {
                                required: true,
                                message: "Please Select Category",
                            },
                        ]}
                        hasFeedback
                    >
                        <Select name="status" className="text-center" placeholder="Status">
                            <Select.Option value="Actice">Active</Select.Option>
                            <Select.Option value="Inactive">Inactive</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="text-center">
                        <Button
                            type="primary"
                            loading={isLoading}
                            disabled={isLoading}
                            htmlType="submit"
                        >
                            Add Student
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
