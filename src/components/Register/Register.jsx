import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserRegisterMutation } from '../../store/api/authApi';
import { useDispatch } from "react-redux";
import {
  setToken,
  setUserDataFromApi,
  setUserId,
} from "../../store/slices/authSlices";

const PWD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]).{8,}$/;

const Register = () => {
  const dispatch = useDispatch();
  const [userRegister, { isLoading }] = useUserRegisterMutation();

  const [id, setId] = useState();

  const getPhone = localStorage.getItem("phone");

  const [redirect, setRedirect] = useState(false);

  const [firstPassword, setFirstPassword] = useState("");
  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFirstPassword(newPassword);

    // Check for strong password using a regular expression

    if (!PWD_REGEX.test(newPassword)) {
      setPasswordError(
        "Your password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character. Additionally, it should be a minimum of 8 characters in length",
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setPassword(newConfirmPassword);

    if (newConfirmPassword !== firstPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("phone", getPhone);
    formData.append("password", password);

    try {
      const response = await userRegister(formData).unwrap();

      setId(response.data.user_id);

  
      if (response.success === true) {
        alert("User registered successfully!")

        localStorage.setItem("userData", JSON.stringify(response.data.me));
        localStorage.setItem("token", JSON.stringify(response.data.api_token));
        localStorage.setItem("userId", JSON.stringify(response.data.user_id));

        dispatch(setUserDataFromApi(response.data.me));
        dispatch(setToken(response.data.api_token));
        dispatch(setUserId(response.data.user_id));

        setRedirect(true);
      }
    } catch (error) {
      console.log("log error", error);
      const message = error.data.message;
      alert(message);
    }
  };

  return (
    <>
     {
        redirect && <Navigate to={`/profile/${id}`}/>
        }
{ <div>
{/* /*         
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white rounded-lg shadow-xl p-8 w-96"
        onSubmit={handleSubmit}
      >
       

        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="new_password"
          >
            New Password
          </label>
          <input
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            id="new_password"
            type="password"
            placeholder="Enter Password"
            value={firstPassword}
            onChange={handlePasswordChange}
          />

          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm_password"
          >
            Confirm Password
          </label>
          <input
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            id="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={password}
            onChange={handleConfirmPasswordChange}
          />

          {confirmPasswordError && (
            <p style={{ color: "red" }}>{confirmPasswordError}</p>
          )}
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isLoading ? "Submitting.." : "Submit"}
        </button>
      </form>
    </div>  */}
    </div>
    }

<div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Set Password</div>
      </div>
      <br />

      <div className={'inputContainer'}>
        <input
        type="password"
          value={firstPassword}
          placeholder="Enter New Password Here"
          onChange={handlePasswordChange}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError && passwordError}</label>
      </div>
      <br />

      <div className={'inputContainer'}>
        <input
        type="password"
          value={password}
          id="confirm_password"
          placeholder="Confirm Password"
          onChange={handleConfirmPasswordChange}
          className={'inputBox'}
        />
        <label className="errorLabel">{confirmPasswordError && confirmPasswordError}</label>
      </div>
      <br />



      <div className={'inputContainer'}>
        <input 
        className={'inputButton'} 
        type="button" 
        onClick={handleSubmit} 
        value={isLoading ? "Submitting.." : "Submit"}
        />
      </div>
    </div>





    </>
  );
};

export default Register;
