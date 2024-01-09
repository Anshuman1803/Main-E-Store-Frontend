import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { userLogOut } from '../../ReduxSlice/CartSlice';
function DashboardContainer() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIN, userDetails } = useSelector((state) => state.MsCart.UserCart);
  const handleShowHideSidebar = (e) => {
    const Sidebar = document.querySelector(".dashboard__sidebar");
    const hamMenu = document.querySelector(".dashboardHamMenuClick");
    Sidebar.classList.toggle("activeDashboard__sidebar")
    hamMenu.classList.toggle("fa-xmark")
  }

  return (

    <section className='dashboardContainer'>
      <i className="fa-solid fa-bars hamMenuClick dashboardHamMenuClick" onClick={handleShowHideSidebar}></i>
      {!isLoggedIN && <div className='protectedAreaContainer'>
        <div className="protectedBox">
          <h3 className='protectedMessage'>Dashboard Locked <i className="fa-solid fa-user-lock protectedLOCkIcon"></i></h3>
          <div className="protectedButtonsContainer">
            <button className='protectedNavigateToBtn' onClick={() => navigateTo("/user/login")}>Sign In </button>
            <button className='protectedNavigateToBtn' onClick={() => navigateTo("/user/register")}>Sign Up </button>
          </div>
        </div>
      </div>}
      <aside className='dashboard__sidebar'>
        <div className='UserName_initials'>{isLoggedIN ? (userDetails[0].userName[0]) : "U"}</div>
        <NavLink onClick={handleShowHideSidebar} to='/user/dashboard/userprofile' className="dashboard__sidebarItems"><i className="fa-solid fa-user-tie dashboard__sidebarItemsICON"></i>User Profile</NavLink>
        <NavLink onClick={handleShowHideSidebar} to='/user/dashboard/cart' className="dashboard__sidebarItems"><i className="fa-solid fa-cart-shopping dashboard__sidebarItemsICON"></i>Cart</NavLink>
        <NavLink onClick={handleShowHideSidebar} to='/user/dashboard/wishlist' className="dashboard__sidebarItems"><i className="fa-solid fa-heart dashboard__sidebarItemsICON"></i>WishList</NavLink>
        <NavLink onClick={handleShowHideSidebar} to='/user/dashboard/history' className="dashboard__sidebarItems"><i className="fa-solid fa-clock-rotate-left dashboard__sidebarItemsICON"></i>History</NavLink>
        <button className='signoutButton' onClick={() => dispatch(userLogOut())}>Sign Out</button>
        <button className='continueshopingButton' onClick={() => navigateTo("/")}>continue shopping</button>
      </aside>
      <div className='outletContainer'>
        <Outlet />

      </div>
    </section>
  )
}

export default DashboardContainer
