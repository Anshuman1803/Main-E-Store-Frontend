import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import UpdatePassword from '../UserComponents/UpdatePassword';


function UserInfo() {
  const { userDetails } = useSelector((state) => state.MsCart.UserCart);

  return (
    <section className='dashboard__Section'>
      <h3 className='dashboard__Section_Headers'>Welcome {userDetails[0]?.userName} </h3>

      <div className="userDashboard_UserInformationContainer">

        <div className="UserInformationContainer__userInfoCard">
          <div className="UserInformation_ItemBox">
            <span className='ItemBox_labelText'>User Name :</span>
            <p className="itemBox_userName">{userDetails[0]?.userName}</p>
          </div>

          <div className="UserInformation_ItemBox">
            <span className='ItemBox_labelText'>User Email :</span>
            <p className="itemBox_userName">{userDetails[0]?.userEmail}</p>
          </div>

          <div className="UserInformation_ItemBox">
            <span className='ItemBox_labelText'>Mobile Number :</span>
            <p className="itemBox_userName">{userDetails[0]?.userPhone}</p>
          </div>
          <button className='userDeleteAccount'>Delete Account</button>
        </div>

        <UpdatePassword userPost="user" validUser= {true}/>

      </div>


    </section>
  )
}

export default memo(UserInfo)
