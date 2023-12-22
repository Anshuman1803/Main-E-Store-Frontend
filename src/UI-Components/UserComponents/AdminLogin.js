
import { useState } from 'react';
import { admingLogin } from '../../ReduxSlice/AdminSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import Loader from '../Loader';

function AdminLogin() {
    const dispatch = useDispatch();
    const navigateTo = useNavigate()
    const [IsUserLoading, setIsUserLoading] = useState(false)
    const [IsShowPass, setIsShowPass] = useState(false);
    const [Message, setMessage] = useState({ "IsNameMsgActive": false, "IsPassMsgActive": false, "IsEmailMsgActive": false, "msgVal": "" });

    const [adminDetails, setadminDetails] = useState({
        "userName": "",
        "userEmail": "",
        "userPassword": "",
    });
    const handleClickShowPassword = (e) => {
        setIsShowPass(!IsShowPass);
    }

    const handleOnChangeInput = (e) => {
        setMessage({ "msgVal": "", "IsEmailMsgActive": false, "IsNameMsgActive": false, "IsPassMsgActive": false })
        setadminDetails({
            ...adminDetails, [e.target.name]: e.target.value
        });
    }


    const handleSingInClick = (e) => {
        e.preventDefault();
        if (adminDetails.userName.length === 0) {
            setMessage({ "msgVal": "Enter Admin Name", "IsEmailMsgActive": false, "IsPassMsgActive": false, "IsNameMsgActive": true })
        }
        else if (adminDetails.userEmail.length === 0) {
            setMessage({ "msgVal": "Enter Your Email", "IsEmailMsgActive": true, "IsPassMsgActive": false, "IsNameMsgActive": false })
        } else if (adminDetails.userPassword.length === 0) {
            setMessage({ "msgVal": "Password Can't be Empty.", "IsPassMsgActive": true, "IsEmailMsgActive": false, "IsNameMsgActive": false })
        } else {

            setIsUserLoading(true);
            axios.post("https://mainstoreapi.onrender.com/api/admin/login", adminDetails).then((response) => {
                if (response.data.resMsg === "Admin Logged In Successfully") {
                    toast.success('Admin Logged In Successfully', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    dispatch(admingLogin(response.data.adminDetails));
                    setTimeout(() => {
                        navigateTo("/admin/dashboard");
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
                        setadminDetails({
                            "userName": "",
                            "userEmail": "",
                            "userPassword": "",
                        })
                    }, 4000);
                } else {
                    toast.error('Admin Not Registred', {
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
                        setadminDetails({
                            "userName": "",
                            "userEmail": "",
                            "userPassword": "",
                        })
                    }, 4000);
                }
            })
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

            <form className='userForm adminLOGIN__form'>
                <h2 className='userForm--heading'>Admin - Get Access</h2>
                <div className="inputBox">
                    <input type="text" name='userName' id='userName' placeholder='Enter Your User Name' className='inputFilelds' value={adminDetails.userName} onChange={handleOnChangeInput} />

                    {Message.IsNameMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i></p>}
                </div>
                <div className="inputBox">
                    <input type="email" name='userEmail' id='userEmail' placeholder='Enter Your Email' className='inputFilelds' value={adminDetails.userEmail} onChange={handleOnChangeInput} />

                    {Message.IsEmailMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i></p>}
                </div>

                <div className="inputBox">
                    <input type={IsShowPass ? "text" : "password"} name='userPassword' id='userPassword' placeholder='Enter Your Password' className='inputFilelds' value={adminDetails.userPassword} onChange={handleOnChangeInput} autoComplete='userPassword' />

                    <i className={`fa-regular ${IsShowPass ? "fa-eye-slash" : "fa-eye"} showPassBtnIcon`} onClick={handleClickShowPassword}></i>
                    {Message.IsPassMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i> </p>}
                </div>
                <button className='userForm--Buttons' onClick={handleSingInClick}>Sign In</button>

                <Link to={'/user/login'} className='navigateButton'> User ? Log In As User </Link>
            </form>
        </>
    )
}

export default AdminLogin
