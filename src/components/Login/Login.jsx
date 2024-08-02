import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUserLoginMutation } from "../../store/api/authApi";
import { useDispatch } from "react-redux";
import {
  setToken,
  setUserDataFromApi,
  setUserId,
} from "../../store/slices/authSlices";

const Login = () => {
  const dispatch = useDispatch();

  const [userLogin, { isLoading }] = useUserLoginMutation();

  const getPhone = localStorage.getItem("phone");

  const [password, setPassword] = useState("");

  const [pwdErr, setPwdErr] = useState(null);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("phone", getPhone);
    formData.append("password", password);

    try {
      const response = await userLogin(formData).unwrap();

      console.log(response);

      setId(response.data.user_id);

      if (response.success === true) {
        alert("User logged in successfully!");

        localStorage.setItem("userData", JSON.stringify(response.data.me));

        localStorage.setItem("token", JSON.stringify(response.data.api_token));
        localStorage.setItem("userId", JSON.stringify(response.data.user_id));

        dispatch(setUserDataFromApi(response.data.me));
        dispatch(setToken(response.data.api_token));
        dispatch(setUserId(response.data.user_id));

        setRedirect(true);
      } else if (response.success === false) {
        setPwdErr(response.message);
      } else {
        alert(response.error.data.message);
      }
    } catch (error) {
      console.log("log error", error);
      const message = error.data.message;
      alert(message);
    }
  };

  // const changePassword = () => {
  //   console.log("clicked ChangePassword");
  //   <ChangePassword/>
  // }

  return (
    <div>
      {redirect && <Navigate to={`/profile/${id}`} />}

      {/* <form
        className=""
        onSubmit={handleSubmit}
      >
        

        <h2 className="">Login</h2>
        <div className="">
          <label
            className=""
            htmlFor="password"
          >
            Password
          </label>
          <input
            className=""
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        {pwdErr ? (
          <p className="">
            you have entered an incorrect password
          </p>
        ) : null}

        <button
          className="e"
          type="submit"
        >
          {isLoading ? "Submitting.." : "Submit"}
        </button><br/>
        
      </form>
      {
        chPass 
        ? (<ChangePassword setChPass={setChPass} />) 
        : (<button onClick={()=>setChPass(true)} > Change Password </button>)
      } 
       
       */}
      
        <div className={"mainContainer"}>
          <div className={"titleContainer"}>
            <div>Login</div>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={handlePassword}
              className={"inputBox"}
            />
            <label className="errorLabel">
              {pwdErr ? <p>you have entered an incorrect password</p> : null}
            </label>
          </div>
          <br />

          <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={handleSubmit}
              value={isLoading ? "Submitting.." : "Submit"}
            />
          </div>
          <br />

          
        </div>

    </div>
  );
};

export default Login;
