import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'



function UserInfo() {
  const navigateTO = useNavigate();

  const { userDetails} = useSelector((state) => state.MsCart.UserCart);
  return (
    <section className='dashboard__Section'>
      <h3 className='dashboard__Section_Headers'>Welcome {userDetails[0]?.userName}</h3>



      <button className='continueshopingButton' onClick={() => navigateTO("/")}>continue shopping</button>
    </section>
  )
}

export default UserInfo
