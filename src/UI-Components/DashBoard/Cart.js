import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Loader from '../Loader';
import emptyCartPoster from '../../assests/emptyCartPoster.png'
import { ToastContainer } from 'react-toastify';
function Cart() {
  const navigateTO = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [cartProducts, setCartProducts] = useState([])
  const { isLoggedIN, userDetails, cartItems } = useSelector((state) => state.MsCart.UserCart);

  useEffect(() => {
    if (isLoggedIN) {
      setIsloading(true)
      axios.get(`https://mainstoreapi.onrender.com/api/user/cartItems/${userDetails[0].userEmail}`).then((response) => {
        setCartProducts(response.data);
        setIsloading(false);
      })
    }
  }, [userDetails, isLoggedIN, cartItems]);






  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading ? <Loader /> :
        <div className='cart__ItemContainer'>

          {
            cartProducts.length === 0 ? <div className='cartEmptyContainer'>
              <img src={emptyCartPoster} alt="EmptyCart" className='cartEmptyContainer__Poster' />
              <p className='cartEmptyContainer__text'>Your cart is empty!</p>
              <button className='cartEmptyContainer__shopNowButton' onClick={() => navigateTO("/")}>Show Now</button>
            </div>
              :
              <div className='userCart__Card_itemContainer'>

                {
                  cartProducts.map((product) => {
                    return <div className="userCart__itemCard" key={product.id}>

                      <div className="userCart_itemCard_itemPosterBox">
                        <img src={product.images.LinkOne} alt="ProductImages" className='userCart_itemCard_itemPosterBox_itemPoster' />
                      </div>
                      <div className="userCart__itemCard__infoBox">

                        <div className="itemCard__infoBox__PriceBox">
                          <button className='itemCard__infoBox__button' 
                          ><i className="fa-solid fa-minus"></i></button>

                          <span className='itemCard__inforBox_QuantityLable'>{product.ItemQuantity}</span>

                          <button className='itemCard__infoBox__button'><i className="fa-solid fa-plus"></i></button>
                        </div>
                        <button className='itemCard_removeFromCartButton'>Remove</button>

                      </div>

                    </div>
                  })
                }

              </div>
          }

        </div>
      }
    </>
  )
}

export default Cart