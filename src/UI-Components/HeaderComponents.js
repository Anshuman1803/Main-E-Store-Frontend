import React, { useState } from 'react'
import Logo from "../assests/Logo.png"
import SearchComponent from './SearchComponent';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function HeaderComponents() {
    const natigateTo = useNavigate();
    const [isSearchShow, setIssearchShow] = useState(false);
    const { isLoggedIN } = useSelector((state) => state.MsCart.UserCart);


    return (
        <>
            <header className='appHeader'>
                <Link to="/"className="appHeader__LogoContainer">
                    <img src={Logo} alt="MsStore" className='appHeader__Logo' />
                    <h1 className='appHeader__StoreName'>Ms <span className='appHeader__StoreText'>Store</span></h1>
                </Link>
                <i className="fa-solid fa-bars hamMenuClick"></i>

                <div className="userProfilecontainer">
                    {isLoggedIN ? <i className="fa-solid fa-user-tie userProfileIcon" onClick={() => natigateTo("/user/dashboard/userprofile")}></i> : <button className='navigateToButton' onClick={() => natigateTo("/user/login")}> Log In</button>}
                    <i className="fa-solid fa-magnifying-glass searchIconButton" onClick={() => setIssearchShow(true)}></i>
                </div>

            </header>

            {isSearchShow && <SearchComponent setterFun={setIssearchShow} />}

        </>
    )
}

export default HeaderComponents
