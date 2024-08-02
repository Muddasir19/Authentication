import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUserLogoutMutation } from "../../store/api/authApi";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlices";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [userLogout, { isLoading }] = useUserLogoutMutation();

  const [redirect, setRedirect] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await userLogout();

      if (response.data.success === true) {
        alert("User logged out!");
        dispatch(logout());
        localStorage.clear();
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-xl p-8 w-96">
        {redirect && <Navigate to="/" replace={true} />}

        

        <button
          onClick={handleLogout}
          className="btn"
          type="submit"
        >
          {isLoading ? "Loading.." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
