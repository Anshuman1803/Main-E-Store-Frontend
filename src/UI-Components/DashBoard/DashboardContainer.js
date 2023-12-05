import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { userLogOut } from '../../ReduxSlice/CartSlice';
function DashboardContainer() {
const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIN } = useSelector((state) => state.MsCart.UserCart);
  return (

    <section className='dashboardContainer'>
      {!isLoggedIN && <div className='protectedAreaContainer'>
       <div className="protectedBox">
       <h3 className='protectedMessage'>Dashboard Locked <i className="fa-solid fa-user-lock protectedLOCkIcon"></i></h3>
     <div className="protectedButtonsContainer">
     <button className='protectedNavigateToBtn' onClick={()=> navigateTo("/user/login")}>Sign In </button>
       <button className='protectedNavigateToBtn' onClick={()=> navigateTo("/user/register")}>Sign Up </button>
     </div>
       </div>
      </div> }
      <aside className='dashboard__sidebar'>
        <div className='UserName_initials'>U</div>
        <NavLink to='/user/dashboard/userprofile' className="dashboard__sidebarItems"><i className="fa-solid fa-user-tie dashboard__sidebarItemsICON"></i>User Profile</NavLink>
        <NavLink to='/user/dashboard/cart' className="dashboard__sidebarItems"><i className="fa-solid fa-cart-shopping dashboard__sidebarItemsICON"></i>Cart</NavLink>
        <NavLink to='/user/dashboard/wishlist' className="dashboard__sidebarItems"><i className="fa-solid fa-heart dashboard__sidebarItemsICON"></i>WishList</NavLink>
        <NavLink to='/user/dashboard/history' className="dashboard__sidebarItems"><i className="fa-solid fa-clock-rotate-left dashboard__sidebarItemsICON"></i>History</NavLink>
        <button className='signoutButton' onClick={()=> dispatch(userLogOut())}>Sign Out</button>
      </aside>
      <div className='outletContainer'>
        <Outlet />

      </div>
    </section>
  )
}

export default DashboardContainer
