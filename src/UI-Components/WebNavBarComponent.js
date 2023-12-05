import React from 'react'
import { NavLink } from 'react-router-dom'
import homeIcon from '../assests/homeIcon.png'
import laptopIcon from '../assests/laptopIcon.png'
import headphoneIcon from '../assests/headphoneIcon.png'
import mobileIcon from '../assests/mobileIcon.png'
import cameraIcon from '../assests/cameraIcon.png'
import tvIcon from '../assests/tvICON.png'
function WebNavBarComponent() {
    return (
        <nav className='webNavBarContainer'>

            <NavLink className="navItemContainer" to={'/'}>
                <img src={homeIcon} alt="homeICOn" className='NavitemIcon' />
            </NavLink>

            <NavLink className="navItemContainer" to={'/product/mobile'}>
                <img src={mobileIcon} alt="homeICOn" className='NavitemIcon' />
            </NavLink>


            <NavLink className="navItemContainer" to={'/product/laptop'}>
                <img src={laptopIcon} alt="homeICOn" className='NavitemIcon' />
            </NavLink>



            <NavLink className="navItemContainer" to={'/product/camera'}>
                <img src={cameraIcon} alt="homeICOn" className='NavitemIcon' />
            </NavLink>

            <NavLink className="navItemContainer" to={'/product/headphone'}>
                <img src={headphoneIcon} alt="homeICOn" className='NavitemIcon' />
            </NavLink>

            <NavLink className="navItemContainer" to={'/product/television'}>
                <img src={tvIcon} alt="homeICOn" className='NavitemIcon' />
            </NavLink>



        </nav>
    )
}

export default WebNavBarComponent
