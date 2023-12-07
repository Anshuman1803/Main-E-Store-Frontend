import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeComponent from '../UI-Components/HomeComponent'
import ProductStoreComponent from '../UI-Components/ProductStoreComponent'
import FormContainer from '../UI-Components/UserComponents/FormContainer'
import UserRegister from '../UI-Components/UserComponents/UserRegister'
import UserLogIn from '../UI-Components/UserComponents/UserLogIn'
import AdminLogin from '../UI-Components/UserComponents/AdminLogin'
import DashboardContainer from '../UI-Components/DashBoard/DashboardContainer'
import UserInfo from '../UI-Components/DashBoard/UserInfo'
import Cart from '../UI-Components/DashBoard/Cart'
import Wishlist from '../UI-Components/DashBoard/Wishlist'
import OrderHistory from '../UI-Components/DashBoard/OrderHistory'
import AdminDashboardContainer from '../UI-Components/DashBoard/AdminDashboardContainer'

function RouterComponent() {
  return (
    <Routes>
      <Route path='/' element={<HomeComponent />} />
      <Route path='/product/:category' element={<ProductStoreComponent />} />

      <Route path='/user' element={<FormContainer />}>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogIn />} />
        <Route path="/user/admin" element={<AdminLogin/>} />
      </Route>

      <Route path='/user/dashboard' element={<DashboardContainer />}>
       <Route path='/user/dashboard/userprofile' element={<UserInfo/>}/>
       <Route path='/user/dashboard/cart' element={<Cart/>}/>
       <Route path='/user/dashboard/wishlist' element={<Wishlist/>}/>
       <Route path='/user/dashboard/history' element={<OrderHistory/>}/>
      </Route>

      <Route path='/admin/dashboard' element={<AdminDashboardContainer />}>
       
      </Route>

    </Routes>
  )
}

export default RouterComponent
