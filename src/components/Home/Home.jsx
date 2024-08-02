import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import { useCheckPhoneMutation } from '../../store/api/authApi';
import Navbar from '../Navbar'
import Profileinfo from '../Profileinfo';

const Home = () => {

  

  const [checkPhone, { isLoading }] = useCheckPhoneMutation();

  const [phone, setPhone] = useState('');
  const [redirectRegister, setRedirectRegister] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);

  const handleSubmit = async ( e ) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("phone", phone);
    formData.append("type", "signup")


    try {

      const response = await checkPhone(formData).unwrap();

       console.log(response)

      if(response.success == true){
        if(response.status == "new-user"){
          localStorage.setItem("phone", phone);
          setRedirectRegister(true);
        }
        if (response.status === "already-registered") {
          localStorage.setItem("phone", phone);
          setRedirectLogin(true);
        }
      }
      else if (response.error) {
        const errorMessage = response.error.data.errors.phone[0];

        alert(errorMessage);
      }

    } catch (error) {

      console.log("log error", error)
      // const message = error.data.message;
      // alert(message)
      
    }
  }


  return (
    <div>

      {/* <Navbar />
      <Profileinfo/> */}

{redirectRegister && <Navigate to="/register" replace={true} />}

{redirectLogin && <Navigate to="/login" replace={true} />}

      {/* <form onSubmit={handleSubmit} action="">
        <div className='' >
          -<label htmlFor="phone" className='' > Phone Number</label>
          -<br/>
          -<input type="text"  id="phone" placeholder='Enter Phone number' onChange={ (e)=> setPhone(e.target.value) }/>
        </div>

        <button type='submit'> {isLoading ? "Submitting.." : "Submit"} </button>

      </form> */}


<div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login Page </div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type='text'
          id="phone"
          placeholder="Enter Your Phone Number"
          onChange={(ev) => setPhone(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{}</label>
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



    </div>
  )
}

export default Home
