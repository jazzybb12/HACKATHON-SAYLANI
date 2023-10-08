import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';

const initialState = { email: '', password: '' };

export default function Signin() {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSignin = (e) => {
    e.preventDefault();
    const { email, password } = state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        window.notify('User signed in successfully', 'success');
        // ...
      })
      .catch((error) => {
        window.notify('Something went wrong', 'error');
      });
    setState(initialState);
  };

  return (
    <div className="formDiv" style={{ backgroundColor: 'blue' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <form>
              <div className="card pt-4 px-2" style={{ backgroundColor: 'blue' }}>
                <h2 className="text-center pb-3">Sign In</h2>

                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <Link to="/auth/signin" className="text-primary float-end nav-link">
                        {/* Forgot Password? */}
                      </Link>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3 text-center">
                      <button className="btn btn-primary text-white w-50 my-3" onClick={handleSignin}>
                        Sign In
                      </button>
                      <div>
                        If you don't have an account?{' '}
                        <Link to="/auth/signup" className="text-white">
                          Sign Up here
                        </Link>{' '}
                      </div>
             
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
