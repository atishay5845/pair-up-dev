import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { BASE_URL } from './utils/constants';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setErrorMessage("");
      const res = await axios.post(`${BASE_URL}/login`, {
        emailId,
        password
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong. Please try again.");
      console.log(err);
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm my-2 text-center">{errorMessage}</p>
          )}
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login