import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { db } from "../../../config/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import Todo from "../../components/Todo";
import dayjs from "dayjs";
import Charts from "../../../components/Charts";


export default function Upcoming() {
    const [documents, setDocuments] = useState([])
    const { user } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false);
    const date = new Date()
    const title = "Upcoming Todos"
    const currentDate = dayjs(date).format("YYYY-MM-DD")
    const getData = async () => {
        try {
            setIsProcessing(true)
            const q = query(collection(db, "todos"), where("createdBy.uid", "==", user.createdBy.uid), where("date", ">", currentDate));

            const querySnapshot = await getDocs(q);
            const array = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                array.push(data)
            });
            setDocuments(array)
        }
        catch (error) {
            console.error(error);
        }
        setIsProcessing(false)
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
        <div style={{display:"flex"}}>

        <Charts />
        <Charts />
        <Charts />
        </div>
        </>
    );
}