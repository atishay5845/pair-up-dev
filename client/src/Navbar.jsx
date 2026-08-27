import React from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from './utils/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from './utils/userSlice';
import axios from 'axios';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user);
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());//clear the user from the redux store
      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👨‍💻DevCircle</a>
      </div>
      {user && (
        <div className="flex items-center gap-3 px-4">
          <span className="font-medium text-sm">Welcome, {user.firstName}</span>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>

        </div>
      )}
    </div>
  )
}

export default Navbar