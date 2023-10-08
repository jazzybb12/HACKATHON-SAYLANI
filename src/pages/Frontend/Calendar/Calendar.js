import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Input, message } from 'antd';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { db } from '../../../config/firebase';
import { useAuthContext } from '../../../context/AuthContext';

export default function Calendar() {
  const { user } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAttendance, setNewAttendance] = useState({ studentName: '', present: false });

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Present',
      dataIndex: 'present',
      key: 'present',
      render: (present) => (present ? 'Yes' : 'No'),
    },
  ];

  const fetchData = async () => {
    try {
      setIsProcessing(true);
      const q = collection(db, 'todos');
      const querySnapshot = await getDocs(q);
      let array = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        array.push({ key: doc.id, ...data });
      });
      setDocuments(array);
    } catch (err) {
      console.error(err);
      message.error('Failed to fetch data.');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const handleAddAttendance = async () => {
    try {
      const newDocRef = await addDoc(collection(db, 'todos'), {
        createdBy: user.createdBy,
        ...newAttendance,
      });

      setNewAttendance({ studentName: '', present: false }); // Clear input fields
      fetchData(); // Fetch data again to include the newly added attendance
      setShowModal(false);
    } catch (err) {
      console.error(err);
      message.error('Failed to add attendance.');
    }
  };

  return (
    <>
      <div className="container-fluid py-3">
        <div className="row">
          <div className="mb-4 pt-2" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
            <h1 className="text-center">Attendance</h1>
            <p className="text-center text-secondary">Students Attendance</p>
          </div>
          <div className="col">
            <Button type="primary" onClick={() => setShowModal(true)}>
              Add Attendance
            </Button>
            <Table dataSource={documents} columns={columns} />
          </div>
        </div>
      </div>

      <Modal
        title="Add Attendance"
        visible={showModal}
        onOk={handleAddAttendance}
        onCancel={() => setShowModal(false)}
      >
        <Input
          placeholder="Student Name"
          value={newAttendance.studentName}
          onChange={(e) => setNewAttendance({ ...newAttendance, studentName: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={newAttendance.present}
            onChange={() => setNewAttendance({ ...newAttendance, present: !newAttendance.present })}
          />
          Present
        </label>
      </Modal>
    </>
  );
}
