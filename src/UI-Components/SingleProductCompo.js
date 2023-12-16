import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader';
import HeaderComponents from './HeaderComponents'
import HomeProductSlider from './HomeProductSlider';

function SingleProductCompo() {
    const CurrentID = useParams().title.split("-")[1];
    const [currentProduct, setCurrentProduct] = useState([]);
    const [currentImage, setCurrentImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`http://localhost:5000/api/products/${CurrentID}`).then((response) => {
            setCurrentProduct(response.data[0])
            setCurrentImage(response.data[0].images.LinkOne)
            setIsLoading(false)
        })
    }, [CurrentID]);

    const handleImageChangeClick = (e) => {
        e.preventDefault();
        setCurrentImage(e.target.src)
    }
    return (
        <>
            <HeaderComponents />
            <section className='singleProducView_Container'>
                {
                    isLoading ? <Loader /> : <>
                        <div className="singleProductView_imageContainer">

                            <div className="currentImageContainer">
                                <img src={currentImage} alt="productImage" className='currentProductImage' />
                            </div>
                            <div className="otherImageContainer">
                                <div className="otherImageBox">
                                    <img src={currentProduct?.images?.LinkOne} alt="ProductImages" className='otherProductImges' onClick={handleImageChangeClick} />
                                </div>
                                <div className="otherImageBox">
                                    <img src={currentProduct?.images?.LinkTwo} alt="ProductImages" className='otherProductImges' onClick={handleImageChangeClick} />
                                </div>
                                <div className="otherImageBox">
                                    <img src={currentProduct?.images?.LinkThree} alt="ProductImages" className='otherProductImges' onClick={handleImageChangeClick} />
                                </div>
                                <div className="otherImageBox">
                                    <img src={currentProduct?.images?.LinkFour} alt="ProductImages" className='otherProductImges' onClick={handleImageChangeClick} />
                                </div>
                                {
                                    currentProduct?.images?.LinkFive && <div className="otherImageBox">
                                        <img src={currentProduct?.images?.LinkFive} alt="ProductImages" className='otherProductImges' onClick={handleImageChangeClick} />
                                    </div>
                                }

                            </div>
                        </div>

                        <div className="singleProductView_detailsContainer">

                        </div>

                        <div className="singleProductView_moreProductContainer">

                            <HomeProductSlider category={currentProduct.category} />

                        </div>
                    </>
                }

            </section>
        </>
    )
}

export default SingleProductCompo
