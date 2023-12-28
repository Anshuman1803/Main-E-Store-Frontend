import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader';
import HeaderComponents from './HeaderComponents'
import HomeProductSlider from "./HomeProductSlider"

import { addToCart } from '../ReduxSlice/CartSlice';
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
function SingleProductCompo() {
    const CurrentID = useParams().title.split("-")[1];
    const [currentProduct, setCurrentProduct] = useState([]);
    const [currentImage, setCurrentImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIN, userDetails } = useSelector((state) => state.MsCart.UserCart);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://mainstoreapi.onrender.com/api/products/${CurrentID}`).then((response) => {
            setCurrentProduct(response.data[0])
            setCurrentImage(response.data[0].images.LinkOne)
            setIsLoading(false)
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [CurrentID]);

    const handleImageChangeClick = (e) => {
        e.preventDefault();
        setCurrentImage(e.target.src)
    }

    const handleAddToCartClick = (e, product) => {
        e.preventDefault();
        if (isLoggedIN) {
            product.userEmail = userDetails[0]?.userEmail
            toast.success('Item Added Successfully')
            dispatch(addToCart(product));
        } else {
            toast.error("Log In Fist !");
        }
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <HeaderComponents />
            <section className='singleProducView_Container'>
                {
                    isLoading ? <Loader /> : <>
                        <div className="singleProductView_imageContainer">

                            <div className="currentImageContainer">
                                <img src={currentImage} loading="lazy" alt="productImage" className='currentProductImage' />
                            </div>
                            <div className="otherImageContainer">
                                <div className="otherImageBox">
                                    <img loading="lazy" src={currentProduct?.images?.LinkOne} alt="ProductImages" className='otherProductImges' onClick={handleImageChangeClick} />
                                </div>
                                <div className="otherImageBox">
                                    <img loading="lazy" src={currentProduct?.images?.LinkTwo} alt="ProductImages" className='otherProductImges' onClick={handleImageChangeClick} />
                                </div>
                                <div className="otherImageBox">
                                    <img loading="lazy" src={currentProduct?.images?.LinkThree} alt="ProductImages" className='otherProductImges' onClick={handleImageChangeClick} />
                                </div>
                                <div className="otherImageBox">
                                    <img loading="lazy" src={currentProduct?.images?.LinkFour} alt="ProductImages" className='otherProductImges' onClick={handleImageChangeClick} />
                                </div>
                                {
                                    currentProduct?.images?.LinkFive && <div className="otherImageBox">
                                        <img loading="lazy" src={currentProduct?.images?.LinkFive} alt="ProductImages" className='otherProductImges' onClick={handleImageChangeClick} />
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="singleProductView_detailsContainer">
                            <h1 className="singleProduct___title">{currentProduct?.title}</h1>

                            <p className="singleProduct__rating ">{currentProduct?.rating}<i className="fa-solid fa-star sinlgeProduct__ratingICON"></i></p>
                            <div className="singleProduct__priceInfoBox">
                                <p className="singleProduct__Dprice">₹{currentProduct?.Dprice}</p>
                                <p className="singleProduct__Aprice">₹{currentProduct?.Aprice}</p>
                                <p className="singleProduct__DiscountPercentage"> {currentProduct?.discountPercentage}% Off</p>
                            </div>

                            <button className={`singleProduct__addToCartButton`} onClick={(e) => handleAddToCartClick(e, currentProduct)}>
                                <i className="fa-solid fa-cart-arrow-down singleProduct__addTocartButtonICon"></i>Add To Cart
                            </button >


                            <p className="singleProduct__description">
                                <span className='singleProduct_descriptionLabel'>Product Description</span>
                                {currentProduct?.description}
                            </p>
                        </div>
                    </>
                }


            </section>
            <HomeProductSlider category={currentProduct?.category} title={"You May Like "} />
        </>
    )
}

export default SingleProductCompo
