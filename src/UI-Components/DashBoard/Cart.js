import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Loader from '../Loader';
import emptyCartPoster from '../../assests/emptyCartPoster.png'
function Cart() {
  const navigateTO = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [cartProducts, setCartProducts] = useState([])
  const { isLoggedIN, userDetails } = useSelector((state) => state.MsCart.UserCart);
  useEffect(() => {
    if(isLoggedIN){
     setIsloading(true)
    axios.get(`https://mainstoreapi.onrender.com/api/user/cartItems/${userDetails[0].userEmail}`).then((response)=>{
      setCartProducts(response.data)
      setIsloading(false)
    })
   }
  }, [userDetails, isLoggedIN]);
  return (
    <>
    {isLoading ? <Loader/> : <div className='cart__ItemContainer'>
    
   {
     cartProducts.length === 0 ? <div className='cartEmptyContainer'>
      <img src={emptyCartPoster} alt="EmptyCart" className='cartEmptyContainer__Poster' />
      <p className='cartEmptyContainer__text'>Your cart is empty!</p>
      <button className='cartEmptyContainer__shopNowButton' onClick={()=>navigateTO("/")}>Show Now</button>
     </div> : <p>{cartProducts.length}</p>
   }

    </div>}
    
    </>
  )
}

export default Cart
