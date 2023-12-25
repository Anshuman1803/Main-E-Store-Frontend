import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
const ProductStoreComponent = lazy(() => import('../UI-Components/ProductStoreComponent'));
const FormContainer = lazy(() => import('../UI-Components/UserComponents/FormContainer'));
const UserRegister = lazy(() => import('../UI-Components/UserComponents/UserRegister'));
const UserLogIn = lazy(() => import('../UI-Components/UserComponents/UserLogIn'));
const AdminLogin = lazy(() => import('../UI-Components/UserComponents/AdminLogin'));
const DashboardContainer = lazy(() => import('../UI-Components/DashBoard/DashboardContainer'));
const UserInfo = lazy(() => import('../UI-Components/DashBoard/UserInfo'));
const Cart = lazy(() => import('../UI-Components/DashBoard/Cart'));
const Wishlist = lazy(() => import('../UI-Components/DashBoard/Wishlist'));
const OrderHistory = lazy(() => import('../UI-Components/DashBoard/OrderHistory'));
const AdminDashboardContainer = lazy(() => import('../UI-Components/Admin/AdminDashboardContainer'));
const AddProduct = lazy(() => import('../UI-Components/Admin/AddProduct'));
const AllProducts = lazy(() => import('../UI-Components/Admin/AllProducts'));
const SingleProductCompo = lazy(() => import('../UI-Components/SingleProductCompo'));
const Loader = lazy(() => import('../UI-Components/Loader'));
const HomeComponent = lazy(() => import('../UI-Components/HomeComponent'))

function RouterComponent() {
  return (
    <Routes>
      <Route path='/' element={
        <Suspense fallback={<Loader />}>
          <HomeComponent />
        </Suspense>
      } />

      <Route path='/product/:category' element={
        <Suspense fallback={<Loader />}>
          <ProductStoreComponent />
        </Suspense>
      } />


      <Route path='/products/:title' element={
        <Suspense fallback={<Loader />}>
          <SingleProductCompo />
        </Suspense>
      } />

      <Route path='/user' element={
        <Suspense fallback={<Loader />}>
          <FormContainer />
        </Suspense>
      }>
        <Route path="/user/register" element={
          <Suspense fallback={<Loader />}>
            <UserRegister />
          </Suspense>
        } />

        <Route path="/user/login" element={
          <Suspense fallback={<Loader />}>
            <UserLogIn />
          </Suspense>
        } />

        <Route path="/user/admin" element={
          <Suspense fallback={<Loader />}>
            <AdminLogin />
          </Suspense>
        } />
      </Route>


      <Route path='/user/dashboard' element={
        <Suspense fallback={<Loader />}>
          <DashboardContainer />
        </Suspense>
      }>
        <Route path='/user/dashboard/userprofile' element={
          <Suspense fallback={<Loader />}>
            <UserInfo />
          </Suspense>
        } />
        <Route path='/user/dashboard/cart' element={
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        } />
        <Route path='/user/dashboard/wishlist' element={
          <Suspense fallback={<Loader />}>
            <Wishlist />
          </Suspense>
        } />
        <Route path='/user/dashboard/history' element={
          <Suspense fallback={<Loader />}>
            <OrderHistory />
          </Suspense>
        } />
      </Route>

      <Route path='/admin/dashboard' element={
        <Suspense fallback={<Loader />}>
          <AdminDashboardContainer />
        </Suspense>
      }>
        <Route path='/admin/dashboard/All-products' element={
          <Suspense fallback={<Loader />}>
            <AllProducts />
          </Suspense>
        } />
        <Route path='/admin/dashboard/add-product' element={
          <Suspense fallback={<Loader />}>
            <AddProduct />
          </Suspense>
        } />
      </Route>

    </Routes>
  )
}

export default RouterComponent
