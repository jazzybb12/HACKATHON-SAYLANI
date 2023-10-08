import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import {  db } from '../config/firebase'
import { doc, getDoc } from 'firebase/firestore/lite'
import { DoubleLeftOutlined } from '@ant-design/icons'


export const AuthContext = createContext()
const initialState = {
    isAuthtenicated: true,
    user: {uid: ''}
}
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LOGGED_IN":
            return {
                isAuthtenicated: true,
                user: action.payload.user
            }

        case "SET_LOGGED_OUT":
            return initialState
        default:
            return state
    }
}
export default function AuthContextProvider(props) {
    const [isAppLoading, setIsAppLoading] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        
    }, [])
    const getProfile = async (user) => {
        const docRef = doc(DoubleLeftOutlined, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const user = docSnap.data()
            dispatch({
                type: "SET_LOGGED_IN",
                payload: { user }
            })
        } else {

        }
        setIsAppLoading(true)
    }

    return (
        <>
            <AuthContext.Provider value={
                {
                    ...state,
                    dispatch,
                    isAppLoading,
                    setIsAppLoading,
                    getProfile
                }
            } >
                {props.children}
            </AuthContext.Provider>
        </>
    )
}
export const useAuthContext = () => useContext(AuthContext)