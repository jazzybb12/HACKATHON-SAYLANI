import React, { useState } from 'react'
import { Card, Divider } from "antd";
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
// import { deleteDoc, doc } from 'firebase/firestore/lite';
// import { firestore } from 'src/config/firebase.js';


export default function todo({ documents, title, isProcessing }) {


    // const handleDelete = async (document) => {
    //     try {
    //         await deleteDoc(doc(firestore, "note", document.id));
    //         let documentsAfterDelete = documents.filter(doc => doc.id !== document.id)
    //     } catch (error) {
    //         // console.log(error)
    //     }
    // }
    // Handle Delete


    return (
        <>
            {isProcessing
                ? <div className='loader' >
                    <div className="spinner-grow" style={{ width: '50px', height: '50px', color: '' }} >
                    </div>
                </div> :

                <div className="container-fluid" >
                    <div className="row d-flex flex-direction-row" >
                        <h1 className='mt-3 mb-4  ' > {title} </h1>
                        {documents.map((doc, index) => {
                            return <Card
                                key={
                                    index
                                }
                                style={
                                    {
                                        maxWidth: 250,
                                        minHeight: 250,
                                        margin: "10px 0px 10px 5px",
                                        cursor: "pointer",
                                        backgroundColor: doc.color,
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: 'space-between'
                                    }
                                }
                                hoverable={
                                    true
                                } >
                                <h5 className='text-center sideFont fw-bold ' > {
                                    doc.title
                                } </h5>

                                <Divider className='mt-0 mb-1' />
                                <strong className='sideFont' >Student ID</strong>
                                <p className='desc sideFont' > {
                                    doc.studentId
                                } </p>

                                <p><span className='fw-bold sideFont'>Date:</span> <span>{doc.date ? dayjs(doc.date).format("DD-MMM-YYYY") : ""}</span></p>
                                <button className='btn btn-primary sideFont btn-sm me-1'>
                                    <EditOutlined />
                                </button>
                                {/* <button className='btn sideFont btn-danger btn-sm'>
                                    <DeleteOutlined onClick={handleDelete} />
                                </button> */}


                            </Card>
                        })
                        }
                    </div>
                </div>
            }
        </>
    )
}