import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from '../../../config/firebase';

import { useAuthContext } from '../../Context/AuthContext'
import ColumnGroup from 'antd/es/table/ColumnGroup';
const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }

export default function Signup() {
  const [state, setState] = useState(initialState)
  const { dispatch } = useAuthContext()
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
}
console.log(auth)
  const handleSignup = (e) => {
    e.preventDefault()
    const { email, password, } = state
    console.log(email)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      console.log(user)
        addUserDoc(user)
        window.notify("user SignUp successfuly", "success")
      })
      .catch((error) => {
        window.notify("something want worng", "error")
        // ..
      });
    setState(initialState)
  }

  const addUserDoc = async (user) => {
    const { firstName, lastName, password } = state
    console.log(firstName, lastName, password);
    console.log(user);
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        password: password,
        uid: user.uid
      });
      dispatch({ type: "LOGIN",payload:{user} })
      console.log("add user in firestore");
    }
    catch (err) {
      console.error(err)
      console.log("something wants wrong");
    }


  }

  return (
    <div className="formDiv" style={{ backgroundColor: 'blue' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6  col-lg-4 ">

            <div className="card pt-4 px-2" style={{ backgroundColor: 'blue' }}>
              <h2 className='text-center pb-3'>Sign Up</h2>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <input type="text" className="form-control" id="firstName" placeholder='FirstName' name='firstName' value={state.firstName} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <input type="text" className="form-control" id="lastName" placeholder='LastName' name='lastName' value={state.lastName} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <input type="email" className="form-control" id="email" placeholder='Email' name='email' value={state.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <input type="password" className="form-control" id="password" placeholder='Password' name='password' value={state.password} onChange={handleChange} />

                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control" id="confirmPassword" placeholder='Confirm Password' name='confirmPassword' value={state.confirmPassword} onChange={handleChange} />

                  </div>
                  <div className="mb-3  text-center ">
                    <div><input type="checkbox" />I accept the Terms of Use & Privacy Policy</div>
                    <button className="btn btn-secondary text-white w-50 my-3" onClick={handleSignup} >Submit</button>
                    <div>Already have an account? <Link to='/auth/signin' className='text-white'>Signin here</Link> </div>
                    {/* <div>Copyright &copy; ijjazahmad.com</div> */}
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
