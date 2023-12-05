import React, { useEffect, useState } from 'react'

function HomeProductSlider({ productData, category }) {

    let [currentIndex, setCurrentIndex] = useState(0);


    return (
        <div className='homeProduct__Box'>
            {/* <i className="fa-solid fa-caret-left leftArrow sliderArrow"></i>
            <i className="fa-solid fa-caret-right rightArrow sliderArrow"></i> */}
            <div className="homeProduct">
                <div className="homeProductPosterContainer">
                    <img src={productData[currentIndex]?.images[0]} alt="ProductPoster" className="ProductPoster" />
                </div>
                <div className="homeProduct__InformationContainer">
                    
                </div>
            </div>

            <div className="homeProduct">
                <div className="homeProductPosterContainer">
                    <img src={productData[++currentIndex]?.images[0]} alt="ProductPoster" className="ProductPoster" />
                </div>
            </div>

            <div className="homeProduct">
                <div className="homeProductPosterContainer">
                    <img src={productData[++currentIndex]?.images[0]} alt="ProductPoster" className="ProductPoster" />
                </div>
            </div>

            <div className="homeProduct">
                <div className="homeProductPosterContainer">
                    <img src={productData[++currentIndex]?.images[0]} alt="ProductPoster" className="ProductPoster" />
                </div>
            </div>

            <div className="homeProduct">
                <div className="homeProductPosterContainer">
                    <img src={productData[++currentIndex]?.images[0]} alt="ProductPoster" className="ProductPoster" />
                </div>
            </div>
        </div>
    )
}

export default HomeProductSlider
