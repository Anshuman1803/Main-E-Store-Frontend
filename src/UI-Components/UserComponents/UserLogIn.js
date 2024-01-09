import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import Loader from '../Loader';
import { addLoginUser } from '../../ReduxSlice/CartSlice';

function UserLogIn() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate()
  const [IsUserLoading, setIsUserLoading] = useState(false)
  const [IsShowPass, setIsShowPass] = useState(false);
  const [Message, setMessage] = useState({ "IsPassMsgActive": false, "IsEmailMsgActive": false, "msgVal": "" });

  const [userDetails, setUserDetails] = useState({
    "userEmail": "",
    "userPassword": "",
  });
  const handleClickShowPassword = (e) => {
    setIsShowPass(!IsShowPass);
  }

  const handleOnChangeInput = (e) => {
    setMessage({ "msgVal": "", "IsEmailMsgActive": false, "IsPassMsgActive": false })
    setUserDetails({
      ...userDetails, [e.target.name]: e.target.value
    });
  }


  const handleSingInClick = (e) => {
    e.preventDefault();
    if (userDetails.userEmail.length === 0) {
      setMessage({ "msgVal": "Enter Your Email", "IsEmailMsgActive": true, "IsPassMsgActive": false })
    } else if (userDetails.userPassword.length === 0) {
      setMessage({ "msgVal": "Password Can't be Empty.", "IsPassMsgActive": true, "IsEmailMsgActive": false })
    } else {

      setIsUserLoading(true);
      axios.post("https://mainstoreapi.onrender.com/api/user/login", userDetails).then((response) => {

        if (response.data.resMsg === "User Logged In Successfully") {
          toast.success('User Logged In Successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(addLoginUser(response.data.UserDetails));
          setTimeout(() => {
            navigateTo("/user/dashboard/userprofile");
            setIsUserLoading(false);
          }, 4000);
        }
        else if (response.data.resMsg === "Password is not Correct") {
          toast.warn('Wrong Email or Password', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            setIsUserLoading(false);
            setUserDetails({
              "userEmail": "",
              "userPassword": "",
            })
          }, 4000);
        } else {
          toast.error('User Not Registred', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            setIsUserLoading(false);
            setUserDetails({
              "userEmail": "",
              "userPassword": "",
            })
          }, 4000);
        }
      })
      // 
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

      <form className='userForm userLOGIN__form'>
        <h2 className='userForm--heading'>Get access to your Orders</h2>
        <div className="inputBox">
          <input type="email" name='userEmail' id='userEmail' placeholder='Enter Your Email' className='inputFilelds' value={userDetails.userEmail} onChange={handleOnChangeInput} />

          {Message.IsEmailMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i></p>}
        </div>

        <div className="inputBox">
          <input type={IsShowPass ? "text" : "password"} name='userPassword' id='userPassword' placeholder='Enter Your Password' className='inputFilelds' value={userDetails.userPassword} onChange={handleOnChangeInput} autoComplete='userPassword' />

          <i className={`fa-regular ${IsShowPass ? "fa-eye-slash" : "fa-eye"} showPassBtnIcon`} onClick={handleClickShowPassword}></i>
          {Message.IsPassMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i> </p>}
        </div>
        <button className='userForm--Buttons' onClick={handleSingInClick}>Sign In</button>

        <Link to={'/user/register'} className='navigateButton'>New Here? Create an account </Link>
        <Link to={'/user/admin'} className='navigateButton'>Admin ? Log In As Admin </Link>
      </form>
    </>
  )
}

export default UserLogIn
