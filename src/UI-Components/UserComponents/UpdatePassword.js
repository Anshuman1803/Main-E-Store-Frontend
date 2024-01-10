import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import validator from "validator";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import Loader from "../Loader"

function UpdatePassword({ userPost, validUser }) {
    const [Isloading, Setisloading] = useState(false);
    const [IsShowPass, setIsShowPass] = useState(false);
    const { userDetails } = useSelector((state) => state.MsCart.UserCart);
    const [updatedData, SetUpdatedData] = useState({
        userEmail: "",
        userPassword: "",
        ConfirmPassword: "",
        validUser: validUser,
    });

    const [inputErros, setErrors] = useState({
        userEmailError: false,
        userPasswordError: false,
        ConfirmPasswordError: false,
        inputErrorMsg: "",
    });


    const handleOneChangeInput = (e) => {
        setErrors({
            userEmailError: false,
            userPasswordError: false,
            ConfirmPasswordError: false,
            inputErrorMsg: "Invalid, Email Address",
        });

        SetUpdatedData({
            ...updatedData, [e.target.name]: e.target.value.trim()
        })
    }

    const handleClickShowPassword = (e) => {
        setIsShowPass(!IsShowPass);
    }


    const handleUpdatePasswordClick = (e) => {
        e.preventDefault();
        let matchEmail;
        if (validUser && userPost === "admin") {
            matchEmail = updatedData.userEmail !== JSON.parse(localStorage.getItem("Admin"))[0].userEmail

        } else if (validUser & userPost === "user") {
            matchEmail = updatedData.userEmail !== userDetails[0]?.userEmail
        } else {
            matchEmail = false
        }

        if (!validator.isEmail(updatedData.userEmail) || matchEmail) {
            setErrors({
                userEmailError: true,
                userPasswordError: false,
                ConfirmPasswordError: false,
                inputErrorMsg: "Invalid, Email Address",
            });
        } else if (updatedData.userPassword.length === 0 || updatedData.userPassword.length < 5) {
            setErrors({
                userEmailError: false,
                userPasswordError: true,
                ConfirmPasswordError: false,
                inputErrorMsg: "Invalid, Password",
            });
        } else if (updatedData.ConfirmPassword !== updatedData.userPassword) {
            setErrors({
                userEmailError: false,
                userPasswordError: false,
                ConfirmPasswordError: true,
                inputErrorMsg: "Password Not Matched.",
            });
        } else {
            if (userPost === 'user') {
                Setisloading(true)
                axios.patch("https://mainstoreapi.onrender.com/api/user/update-password", updatedData).then((response) => {
                    if (response.data.resMsg === "Password Updated") {
                        toast.success("User Password Updated");
                        Setisloading(false);
                        SetUpdatedData({
                            userEmail: "",
                            userPassword: "",
                            ConfirmPassword: "",
                            validUser: validUser,
                        })
                    } else {
                        toast.success("Something went wrong");
                        Setisloading(false)
                    }
                });

            }
            else if (userPost === 'admin') {
                Setisloading(true)
                axios.patch("https://mainstoreapi.onrender.com/api/admin/update-password", updatedData).then((response) => {
                    if (response.data.resMsg === "Password Updated") {
                        toast.success("User Password Updated");
                        Setisloading(false);
                        SetUpdatedData({
                            userEmail: "",
                            userPassword: "",
                            ConfirmPassword: "",
                            validUser: validUser,
                        })
                    } else {
                        toast.success("Something went wrong");
                        Setisloading(false)
                    }
                });
            }
        }
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <form className="UserInformationContainer__UpdatePasswordCard">
                {Isloading && <Loader />}

                <div className="UpdatePasswordCard__ItemBox">
                    <input type="email" name='userEmail' placeholder='Enter Your Email Address' className='UpdatePassword_itemBox__Item' onChange={handleOneChangeInput} value={updatedData.userEmail} autoComplete='user' />
                    {inputErros.userEmailError && <p className='inputErrorMsg'>{inputErros.inputErrorMsg}</p>}
                </div>

                <div className="UpdatePasswordCard__ItemBox">
                    <input type={IsShowPass ? "text" : "password"} name='userPassword' placeholder='Enter New Password ' className='UpdatePassword_itemBox__Item' onChange={handleOneChangeInput} value={updatedData.userPassword} autoComplete='new-password' />

                    <i className={`fa-regular ${IsShowPass ? "fa-eye-slash" : "fa-eye"} showPassBtnIcon`} onClick={handleClickShowPassword}></i>

                    {inputErros.userPasswordError && <p className='inputErrorMsg'>{inputErros.inputErrorMsg}</p>}
                </div>

                <div className="UpdatePasswordCard__ItemBox">
                    <input type={IsShowPass ? "text" : "password"} name='ConfirmPassword' placeholder='Confirm Password' className='UpdatePassword_itemBox__Item' onChange={handleOneChangeInput} value={updatedData.ConfirmPassword} autoComplete='new-password' />

                    {inputErros.ConfirmPasswordError && <p className='inputErrorMsg'>{inputErros.inputErrorMsg}</p>}
                </div>

                <button className='userUpdatePasswordButton' onClick={handleUpdatePasswordClick}>Update</button>
            </form>
        </>
    )
}

export default UpdatePassword
