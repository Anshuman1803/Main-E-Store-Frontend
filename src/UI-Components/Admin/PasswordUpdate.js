import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../Loader';
import { ToastContainer, toast } from 'react-toastify';
import { admingLogin } from '../../ReduxSlice/AdminSlice';
import { useDispatch } from 'react-redux';
function PasswordUpdate() {
    const [IsUserLoading, setIsUserLoading] = useState(false)
    const dispatch = useDispatch();
    const [Message, setMessage] = useState({ "IsPassMsgActive": false, "IsEmailMsgActive": false, "IsConfirmPassMsgActive": false, "msgVal": "" });

    const [confrimedPass, setConfirmPassword] = useState({
        "confirmPassword": "",
    });

    const [userDetails, setUserDetails] = useState({
        "userEmail": "",
        "userPassword": "",
    });
    // for Confirm password onChanged
    const handleOnConfirmPass = (e) => {
        setMessage({ "msgVal": "", "IsEmailMsgActive": false, "IsConfirmPassMsgActive": false, "IsPassMsgActive": false })
        setConfirmPassword({ ...confrimedPass, [e.target.name]: e.target.value })
    }
    // forAll other input fields in update popup
    const handleOnChangeInput = (e) => {
        setMessage({ "msgVal": "", "IsEmailMsgActive": false, "IsConfirmPassMsgActive": false, "IsPassMsgActive": false })
        setUserDetails({
            ...userDetails, [e.target.name]: e.target.value
        });
    }

    const handleUpdatePasswordClick = (e) => {
        e.preventDefault();
        if (userDetails.userEmail.length === 0) {
            setMessage({ "msgVal": "Enter Your Email", "IsEmailMsgActive": true, "IsConfirmPassMsgActive": false, "IsPassMsgActive": false })
        } else if (userDetails.userPassword.length === 0) {
            setMessage({ "msgVal": "Password Can't be Empty.", "IsPassMsgActive": true, "IsConfirmPassMsgActive": false, "IsEmailMsgActive": false })
        } else if (confrimedPass.confirmPassword.length === 0) {
            setMessage({ "msgVal": "Confirm Your Password", "IsPassMsgActive": false, "IsConfirmPassMsgActive": true, "IsEmailMsgActive": false })
        } else if (confrimedPass.confirmPassword !== userDetails.userPassword) {
            setMessage({ "msgVal": "Password Not Match", "IsPassMsgActive": true, "IsConfirmPassMsgActive": true, "IsEmailMsgActive": false })
        } else {
            setIsUserLoading(true);
            axios.post("http://localhost:5000/api/admin/update-passoword", userDetails).then((response) => {

                if (response.data.resMsg === "Updated Successfully") {
                    toast.success('Updated Successfully', {
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
                        setConfirmPassword({
                            "confirmPassword": "",
                        })
                        setUserDetails({
                            "userEmail": "",
                            "userPassword": "",
                        })
                        setIsUserLoading(false);
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
                        setConfirmPassword({
                            "confirmPassword": "",
                        })
                        setUserDetails({
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
            <form className='passwordUpdateCompo_container'>
                {IsUserLoading && <Loader />}
                <h3 className="updateCompo_heading">Update Your Password</h3>

                <div className="addProduct_formItemBox updatepopup_itemBox">
                    <label htmlFor="email">Registred Email Address *</label>
                    <input type="email" id='email' name='userEmail' placeholder='Enter Registred Email Address' className='addProduct_formItem' onChange={handleOnChangeInput} value={userDetails.userEmail} autoComplete='user-email' />
                    {Message.IsEmailMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i></p>}
                </div>

                <div className="addProduct_formItemBox updatepopup_itemBox">
                    <label htmlFor="newPassword">New Password *</label>
                    <input type="password" id='newPassword' name='userPassword' placeholder='Enter New Password' className='addProduct_formItem' onChange={handleOnChangeInput} autoComplete='new-password' value={userDetails.userPassword} />
                    {Message.IsPassMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i> </p>}
                </div>

                <div className="addProduct_formItemBox updatepopup_itemBox">
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    <input type="password" id='confirmPassword' name='confirmPassword' placeholder='Confirm Your Password' className='addProduct_formItem' onChange={handleOnConfirmPass} value={confrimedPass.confirmPassword} autoComplete='new-password' />

                    {Message.IsConfirmPassMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i> </p>}
                </div>

                <button className='updatePasswordButton' onClick={handleUpdatePasswordClick}>Update Password</button>

            </form>
        </>
    )
}

export default PasswordUpdate
