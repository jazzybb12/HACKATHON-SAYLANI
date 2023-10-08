import React, { useState } from 'react';
import { Modal, Checkbox, Button, Input, Select } from 'antd';
import { collection, getDocs } from "firebase/firestore"; 
import { doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../../../config/firebase';
// import './AttendanceList.scss';

export default function AttendanceList() {
  
  const editStudentCourse = (studentId, newCourseId) => {
    // Edit the course ID of an existing student
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          courseId: newCourseId,
        };
      }
      return student;
    });

    setStudents(updatedStudents);
  };
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
  const editStudentId = (studentId, newStudentId) => {
    // Edit the student ID of an existing student
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          studentId: newStudentId,
        };
      }
      return student;
    });

    setStudents(updatedStudents);
  };

  const editStudentContactInfo = (studentId, newContactInfo) => {
    // Edit the contact info of an existing student
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          contactInfo: newContactInfo,
        };
      }
      return student;
    });

    setStudents(updatedStudents);
  };
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([
   
    // Add more student data as needed
  ]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    courseId: '',
    studentId: '',
    contactInfo: '',
  });
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleChange = (studentId) => {
    // Toggle the attendance status of the selected student
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          isPresent: !student.isPresent,
        };
      }
      return student;
    });
  
    setStudents(updatedStudents);
  };
  

  const addNewStudent = async () => {
    // Add a new student to the list
    const studentToAdd = {
      id: students.length + 1,
      name: newStudent.name,
      isPresent: false,
      courseId: newStudent.courseId,
      studentId: newStudent.studentId,
      contactInfo: newStudent.contactInfo,
    };
   



      try {
          
          await setDoc(doc(db, "courses", studentToAdd.id), studentToAdd);
          newStudent((prevData) => [...prevData, studentToAdd]);
          message.success("Student Information has been added successfully");
      } catch (error) {
          console.error(error);
          message.error("Something went wrong while adding Student Information");
      }

      setIsLoading(false);
      setIsModalOpen(false);
    setNewStudent({
      name: '',
      courseId: '',
      studentId: '',
      contactInfo: '',
    });

    // Close the modal after adding a new student
    setOpen(false);
  };

  const editStudentName = (studentId, newName) => {
    // Edit the name of an existing student
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          name: newName,
        };
      }
      return student;
    });

    setStudents(updatedStudents);
  };

  const deleteStudent = (studentId) => {
    // Remove a student from the list
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);
  };
  
  // const markAttendance = () => {
  //   // Update the lists of present and absent students based on their attendance status
  //   const present = students.filter((student) => student.isPresent);
  //   const absent = students.filter((student) => !student.isPresent);

  //   setPresentStudents(present);
  //   setAbsentStudents(absent);

  //   // Close the attendance modal
  //   setOpen(false);
  // };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const filteredStudents = students.filter((student) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'present') return student.isPresent;
    if (filterStatus === 'absent') return !student.isPresent;
    return true;
  });

  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="container">
      <div className="header">
        <h1>Student List</h1>
        <Button type="primary" onClick={showModal}>
          Add New Student
        </Button>
      </div>

      <div className="filters">
        <Input
          placeholder="Search students"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <Select
          value={filterStatus}
          onChange={(value) => setFilterStatus(value)}
          style={{ width: 120 }}
        >
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="present">Present</Select.Option>
          <Select.Option value="absent">Absent</Select.Option>
        </Select> */}
        <Select
          value={sortOrder}
          onChange={(value) => setSortOrder(value)}
          style={{ width: 120 }}
        >
          <Select.Option value="asc">A-Z</Select.Option>
          <Select.Option value="desc">Z-A</Select.Option>
        </Select>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Course ID</th>
            <th scope="col">Student ID</th>
            <th scope="col">Contact Info</th>
            {/* <th scope="col">Attendance</th> */}
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents
            .filter((student) =>
              student.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((student) => (
              <tr key={student.id}>
                <th scope="row">{student.id}</th>
                <td>
                  <Input
                    value={student.name}
                    onChange={(e) => editStudentName(student.id, e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={student.courseId}
                    onChange={(e) => editStudentCourse(student.id, e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={student.studentId}
                    onChange={(e) => editStudentId(student.id, e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={student.contactInfo}
                    onChange={(e) =>
                      editStudentContactInfo(student.id, e.target.value)
                    }
                  />
                </td>
                
                <td>
                  <Button onClick={() => deleteStudent(student.id)} danger>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal
        title="Add New Student"
        visible={open}
        onOk={addNewStudent}
        confirmLoading={false}
        onCancel={handleCancel}
      >
        <div>
          <Input
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <Input
            placeholder="Course ID"
            value={newStudent.courseId}
            onChange={(e) => setNewStudent({ ...newStudent, courseId: e.target.value })}
          />
          <Input
            placeholder="Student ID"
            value={newStudent.studentId}
            onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
          />
          <Input
            placeholder="Contact Info"
            value={newStudent.contactInfo}
            onChange={(e) =>
              setNewStudent({ ...newStudent, contactInfo: e.target.value })
            }
          />
        </div>
      </Modal>

      <div className="summary">
        {/* ... (rest of the code) */}
      </div>
    </div>
  );
}
