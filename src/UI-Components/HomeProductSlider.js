import React, { useState } from 'react'
import RatingComponent from './MUI-Components/RatingComponent';
function HomeProductSlider({ productData, category }) {

    let [currentIndex] = useState(0);


    return (
        <div className='homeProduct__Box'>
            {/* <i className="fa-solid fa-caret-left leftArrow sliderArrow"></i>
            <i className="fa-solid fa-caret-right rightArrow sliderArrow"></i> */}
            <div className="homeProduct">
                <i className="fa-regular fa-heart homeProductCommpnIConButton wishListButton"></i>
                <i className="fa-regular fa-eye homeProductCommpnIConButton viewItemButton"></i>
                <div className="homeProductPosterContainer">
                    <img src={productData[currentIndex]?.images[0]} alt="ProductPoster" className="ProductPoster" />
                </div>
                <div className="homeProduct__InformationContainer">
                    <RatingComponent rating={productData[currentIndex]?.rating} />
                    <span className='homeProduct__discountPercentageText'>{productData[currentIndex]?.discountPercentage} % Off</span>
                    <button className='addToCartButton'>Add To Cart</button>
                </div>
            </div>

            <div className="homeProduct">
            <i className="fa-regular fa-heart homeProductCommpnIConButton wishListButton"></i>
                <i className="fa-regular fa-eye homeProductCommpnIConButton viewItemButton"></i>
                <div className="homeProductPosterContainer">
                    <img src={productData[++currentIndex]?.images[0]} alt="ProductPoster" className="ProductPoster" />
                </div>
                <div className="homeProduct__InformationContainer">
                    <RatingComponent rating={productData[currentIndex]?.rating} />
                    <span className='homeProduct__discountPercentageText'>{productData[currentIndex]?.discountPercentage} % Off</span>
                    <button className='addToCartButton'>Add To Cart</button>
                </div>
            </div>

            <div className="homeProduct">
            <i className="fa-regular fa-heart homeProductCommpnIConButton wishListButton"></i>
                <i className="fa-regular fa-eye homeProductCommpnIConButton viewItemButton"></i>
                <div className="homeProductPosterContainer">
                    <img src={productData[++currentIndex]?.images[0]} alt="ProductPoster" className="ProductPoster" />
                </div>
                <div className="homeProduct__InformationContainer">
                    <RatingComponent rating={productData[currentIndex]?.rating} />
                    <span className='homeProduct__discountPercentageText'>{productData[currentIndex]?.discountPercentage} % Off</span>
                    <button className='addToCartButton'>Add To Cart</button>
                </div>
            </div>

            <div className="homeProduct">
            <i className="fa-regular fa-heart homeProductCommpnIConButton wishListButton"></i>
                <i className="fa-regular fa-eye homeProductCommpnIConButton viewItemButton"></i>
                <div className="homeProductPosterContainer">
                    <img src={productData[++currentIndex]?.images[0]} alt="ProductPoster" className="ProductPoster" />
                </div>
                <div className="homeProduct__InformationContainer">
                    <RatingComponent rating={productData[currentIndex]?.rating} />
                    <span className='homeProduct__discountPercentageText'>{productData[currentIndex]?.discountPercentage} % Off</span>
                    <button className='addToCartButton'>Add To Cart</button>
                </div>
            </div>

            <div className="homeProduct">
            <i className="fa-regular fa-heart homeProductCommpnIConButton wishListButton"></i>
                <i className="fa-regular fa-eye homeProductCommpnIConButton viewItemButton"></i>
                <div className="homeProductPosterContainer">
                    <img src={productData[++currentIndex]?.images[0]} alt="ProductPoster" className="ProductPoster" />
                </div>
                <div className="homeProduct__InformationContainer">
                    <RatingComponent rating={productData[currentIndex]?.rating} />
                    <span className='homeProduct__discountPercentageText'>{productData[currentIndex]?.discountPercentage} % Off</span>
                    <button className='addToCartButton'>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default HomeProductSlider
