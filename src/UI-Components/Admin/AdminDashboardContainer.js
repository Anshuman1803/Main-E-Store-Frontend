import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { adminLogOut } from '../../ReduxSlice/AdminSlice';
import PasswordUpdate from './PasswordUpdate';
import axios from 'axios'
import Loader from '../Loader';
function AdminDashboardContainer() {
  const navigateTo = useNavigate()
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [totalProduct, settotalProduct] = useState(0);
  const [totalOders] = useState(0)
  const [totalUsers, settotalUsers] = useState(0)
  const [totalIncom] = useState(0)
  const currentPath = useLocation().pathname;

  const { isLoggedIN, Admin } = useSelector((state) => state.AppAdmin.AdminDetails);

  useEffect(() => {
    setIsloading(true)
    axios.get("http://localhost:5000/api/product").then((response) => {
      settotalProduct(response.data.length)
    });

    axios.get("http://localhost:5000/api/admin/allUsers").then((response) => {
      settotalUsers(response.data.length)
      setIsloading(false);
    });
  }, [currentPath]);

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
          <h3 className='protectedMessage'>Admin Dashboard Locked <i className="fa-solid fa-user-lock protectedLOCkIcon"></i></h3>
          <div className="protectedButtonsContainer">
            <button className='protectedNavigateToBtn' onClick={() => navigateTo("/user/admin")}>Sign In </button>
          </div>
        </div>
      </div>}
      <aside className='dashboard__sidebar'>
        <div className='UserName_initials'>{isLoggedIN ? (Admin[0]?.userName[0]) : "U"}</div>

        <NavLink to='/admin/dashboard' className="dashboard__sidebarItems adminprofile" onClick={handleShowHideSidebar}><i className="fa-solid fa-user-gear dashboard__sidebarItemsICON"></i>Profile</NavLink>

        <NavLink to='/admin/dashboard/All-products' className="dashboard__sidebarItems" onClick={handleShowHideSidebar}><i className="fa-solid fa-cart-shopping dashboard__sidebarItemsICON" ></i>Products</NavLink>

        <NavLink to='/admin/dashboard/add-product' className="dashboard__sidebarItems" onClick={handleShowHideSidebar}><i className="fa-solid fa-cart-plus dashboard__sidebarItemsICON" ></i>Add Product</NavLink>

        <button className='signoutButton' onClick={() => dispatch(adminLogOut())}>Sign Out</button>
      </aside>
      <div className='outletContainer'>
        {isLoading ? <Loader /> : <>
          {currentPath === "/admin/dashboard" && <div className='adminDashboard__adminProfileContainer'>
            <h1 className="adminProfileContainer__heading">Welcome {(Admin[0]?.userName.split("_")[0])}</h1>
            <div className="admindashboard_cardContainer">

              <div className="applicationCounterCards">
                <div className="admindashboard_cards">
                  <h3 className="admindashboard_cardItemheading">Total Products Quantity</h3>
                  <p className="admindashboard_counter">{totalProduct}</p>
                </div>

                <div className="admindashboard_cards">
                  <h3 className="admindashboard_cardItemheading">Total Order Received</h3>
                  <p className="admindashboard_counter">{totalOders}</p>
                </div>

                <div className="admindashboard_cards">
                  <h3 className="admindashboard_cardItemheading">Total Sales</h3>
                  <p className="admindashboard_counter">₹ {totalIncom}</p>
                </div>

                <div className="admindashboard_cards">
                  <h3 className="admindashboard_cardItemheading">Active Users</h3>
                  <p className="admindashboard_counter">{totalUsers}</p>
                </div>
              </div>

              <div className="adminPasswordUpdateContainer">
                <PasswordUpdate />
              </div>

            </div>

          </div>}
        </>
        }
        <Outlet />

      </div>
    </section>

  )
}

export default AdminDashboardContainer
