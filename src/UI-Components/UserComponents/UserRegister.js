import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader';
function UserRegister() {
  const navigateTo = useNavigate()
  const [IsUserLoading, setIsUserLoading] = useState(false)
  const [IsShowPass, setIsShowPass] = useState(false);
  const [Message, setMessage] = useState({ "IsNameMsgActive": false, "IsPhoneMsgActive": false, "IsEmailMsgActive": false, "IsPassMsgActive": false, "msgVal": "" });
  const [userDetails, setUserDetails] = useState({
    "userName": "",
    "userPhone": "",
    "userEmail": "",
    "userPassword": "",
  });

  const handleClickShowPassword = (e) => {
    setIsShowPass(!IsShowPass);
  }

  const handleOnChangeInput = (e) => {
    setMessage({ "IsNameMsgActive": false, "IsPhoneMsgActive": false, "IsEmailMsgActive": false, "IsPassMsgActive": false, "msgVal": "" });
    setUserDetails({
      ...userDetails, [e.target.name]: e.target.value
    });
  }

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (userDetails.userName.length === 0) {
      setMessage({ "IsNameMsgActive": true, "IsPhoneMsgActive": false, "IsEmailMsgActive": false, "IsPassMsgActive": false, "msgVal": "Name Can't Be Empty" });

    } else if (userDetails.userPhone.length === 0 || userDetails.userPhone.length < 10) {
      setMessage({ "IsNameMsgActive": false, "IsPhoneMsgActive": true, "IsEmailMsgActive": false, "IsPassMsgActive": false, "msgVal": "Provide Correct Phone Number" });

    } else if (userDetails.userEmail.length === 0) {
      setMessage({ "IsNameMsgActive": false, "IsPhoneMsgActive": false, "IsEmailMsgActive": true, "IsPassMsgActive": false, "msgVal": "Mail Can't Be Empty" });

    } else if (userDetails.userPassword.length === 0) {
      setMessage({ "IsNameMsgActive": false, "IsPhoneMsgActive": false, "IsEmailMsgActive": false, "IsPassMsgActive": true, "msgVal": "Password Can't Be Empty" });

    } else {
      setIsUserLoading(true);
      axios.post("https://mainstoreapi.onrender.com/api/user/register", userDetails).then((response) => {

        if (response.data.resMsg === "User Already Exists") {
          toast.warn('User Already Exists', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setUserDetails({
            "userName": "",
            "userPhone": "",
            "userEmail": "",
            "userPassword": "",
          });
          setTimeout(() => {
            setIsUserLoading(false);
          }, 4000);
        }
        else if (response.data.resMsg === "User Registred Successfully") {
          toast.success('User Registred Successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setUserDetails({
            "userName": "",
            "userPhone": "",
            "userEmail": "",
            "userPassword": "",
          });
          setTimeout(() => {
            navigateTo("/user/login");
            setIsUserLoading(false);
          }, 4000);
        } 
        
        else {
          toast.error('Something Went Wrong ! Try Again', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsUserLoading(false);
          setUserDetails({
            "userName": "",
            "userPhone": "",
            "userEmail": "",
            "userPassword": "",
          });
        }

      });
    }
  }
  
  return (

    <>
      {IsUserLoading && <Loader />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form className='userForm'>
        <h2 className='userForm--heading'>Looks like you're new here!</h2>
        <div className="inputBox">
          <input type="text" name='userName' id='userName' placeholder='Enter Your Name' className='inputFilelds' value={userDetails.userName} onChange={handleOnChangeInput} />
          {Message.IsNameMsgActive && <p className='inputErrorMsg'>{Message.msgVal} </p>}
        </div>


        <div className="inputBox">
          <input type="number" name='userPhone' id='userPhone' placeholder='Enter Your Phone' className='inputFilelds' value={userDetails.userPhone} onChange={handleOnChangeInput} autoComplete='userPhone' />
          {Message.IsPhoneMsgActive && <p className='inputErrorMsg'>{Message.msgVal} </p>}
        </div>

        <div className="inputBox">
          <input type="email" name='userEmail' id='userEmail' placeholder='Enter Your Email' className='inputFilelds' value={userDetails.userEmail} onChange={handleOnChangeInput} autoComplete='userEmail' />
          {Message.IsEmailMsgActive && <p className='inputErrorMsg'>{Message.msgVal} </p>}
        </div>

        <div className="inputBox">
          <input type={IsShowPass ? "text" : "password"} name='userPassword' id='userPassword' placeholder='Enter Your Password' className='inputFilelds' value={userDetails.userPassword} onChange={handleOnChangeInput} autoComplete='current-password' />
          <i className={`fa-regular ${IsShowPass ? "fa-eye-slash" : "fa-eye"} showPassBtnIcon`} onClick={handleClickShowPassword}></i>
          {Message.IsPassMsgActive && <p className='inputErrorMsg'>{Message.msgVal} </p>}
        </div>
        <button className='userForm--Buttons' onClick={handleRegisterClick}>Register</button>
        <Link className='navigateButton' to={'/user/login'}>Already have an account? Sign in</Link>
      </form>
    </>

  )
}

export default UserRegister
