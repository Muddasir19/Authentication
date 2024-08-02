import React from "react";
import { useState } from "react";
import { useChangePasswordMutation } from "../store/api/authApi";

const ChangePassword = ({ setCheck2 }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [confirm_password_error, setConfirmPasswordError] = useState("");

  const api_token = localStorage.getItem("token")
  
  const [changePassword,{isLoading}] = useChangePasswordMutation();
  

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setCheckPassword(newConfirmPassword);

    if (newConfirmPassword !== newPassword  ) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(oldPassword);
    console.log(newPassword);
    try {

      const response = await changePassword(
        {
          old_password: oldPassword,
          new_password: newPassword,
        }
      ).unwrap();

      console.log(response)

      setCheck2(false);
      
    } catch (error) {
      console.log("log error", error);
      const message = error.data.message;
      alert(message);
    }
  };

  return (
    <div>
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div>Change Password</div>
        </div>
        <br />

        <div className={"inputContainer"}>
          <input
            value={oldPassword}
            placeholder="Enter your Old password here"
            onChange={(ev) => setOldPassword(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel"></label>
        </div>
        <br />

        <div className={"inputContainer"}>
          <input
            value={newPassword}
            placeholder="Enter your New password here"
            onChange={(ev) => setNewPassword(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel"></label>
        </div>
        <br />

        <div className={"inputContainer"}>
          <input
            value={checkPassword}
            placeholder="Enter your password Again"
            onChange={handleConfirmPasswordChange}
            className={"inputBox"}
          />
          <label className="errorLabel">{confirm_password_error}</label>
        </div>
        <br />

        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            value={isLoading ? "Submitting...." : "Submit"}
            onClick={handleSubmit}
          />
        </div>

        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            onClick={() => setCheck2(false)}
            value={"Back"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
