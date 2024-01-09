import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import validator from "validator";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import Loader from "../Loader"

function UpdatePassword({ userPost, validUser }) {
    const [Isloading, Setisloading] = useState(false)
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
    const handleUpdatePasswordClick = (e) => {
        e.preventDefault();
        if (!validator.isEmail(updatedData.userEmail.trim()) || updatedData.userEmail !== userDetails[0].userEmail) {
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
            // else if (userPost === 'admin') {
            //     console.log(updatedData)

            // }
        }
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="UserInformationContainer__UpdatePasswordCard">
                {Isloading && <Loader />}

                <div className="UpdatePasswordCard__ItemBox">
                    <input type="text" name='userEmail' id='userEmail' placeholder='Enter Your Email Address' className='UpdatePassword_itemBox__Item' onChange={handleOneChangeInput} value={updatedData.userEmail} />
                    {inputErros.userEmailError && <p className='inputErrorMsg'>{inputErros.inputErrorMsg}</p>}
                </div>

                <div className="UpdatePasswordCard__ItemBox">
                    <input type="text" name='userPassword' id='userPassword' placeholder='Enter New Password ' className='UpdatePassword_itemBox__Item' onChange={handleOneChangeInput} value={updatedData.userPassword} />
                    {inputErros.userPasswordError && <p className='inputErrorMsg'>{inputErros.inputErrorMsg}</p>}
                </div>

                <div className="UpdatePasswordCard__ItemBox">
                    <input type="text" name='ConfirmPassword' id='ConfirmPassword' placeholder='Confirm Password' className='UpdatePassword_itemBox__Item' onChange={handleOneChangeInput}  value={updatedData.ConfirmPassword} />
                    {inputErros.ConfirmPasswordError && <p className='inputErrorMsg'>{inputErros.inputErrorMsg}</p>}
                </div>

                <button className='userUpdatePasswordButton' onClick={handleUpdatePasswordClick}>Update</button>
            </div>
        </>
    )
}

export default UpdatePassword
