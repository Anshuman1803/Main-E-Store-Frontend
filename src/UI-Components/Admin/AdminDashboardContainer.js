import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { adminLogOut } from '../../ReduxSlice/AdminSlice';
import axios from 'axios'
import Loader from '../Loader';
import UpdatePassword from '../UserComponents/UpdatePassword';
function AdminDashboardContainer() {
  const navigateTo = useNavigate()
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [totalProduct, settotalProduct] = useState(0);
  const [totalOders, setTotalOrder] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalIncom, setTotalIncom] = useState(0)
  const currentPath = useLocation().pathname;

  const { isLoggedIN, Admin } = useSelector((state) => state.AppAdmin.AdminDetails);

  useEffect(() => {
    setIsloading(true)
    axios.get("https://mainstoreapi.onrender.com/api/product").then((response) => {
      settotalProduct(response.data.length)
    });

    axios.get("https://mainstoreapi.onrender.com/api/admin/allUsers").then((response) => {
      setTotalUsers(response.data.length)
      setIsloading(false);
    });

    axios.get("https://mainstoreapi.onrender.com/api/admin/cartItems").then((response) => {
      let tempTotalOrder = 0;
      let tempTotalSales = 0;
      response.data.forEach((item) => {
        tempTotalOrder += item.ItemQuantity        ;
        tempTotalSales += item.Dprice * item.ItemQuantity
      })
      setTotalOrder(tempTotalOrder);
      setTotalIncom(tempTotalSales);
    })
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


              <UpdatePassword userPost="admin" validUser={true}/>
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
