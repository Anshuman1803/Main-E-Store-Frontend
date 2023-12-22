import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import Loader from './Loader';
import { addToCart } from '../ReduxSlice/CartSlice';
import { ToastContainer, toast } from 'react-toastify';
function HomeProductSlider({ category, title }) {
    const [isLoading, setIsloading] = useState(false);
    const [productData, setproductData] = useState([]);
    const dispatch = useDispatch();
    const { isLoggedIN } = useSelector((state) => state.MsCart.UserCart);

    useEffect(() => {
        setIsloading(true)
        axios.get(`https://mainstoreapi.onrender.com/api/product/${category}`).then((response) => {
            setproductData(response.data);
            setIsloading(false)
        });
    }, [category])

    const navigateTO = useNavigate()
    const handleNextBtnClick = (e) => {
        e.preventDefault();
        let box = e.target.previousSibling
        box.scrollLeft = box.scrollLeft + 310
    }

    const handlePrevBtnClick = (e) => {
        e.preventDefault();
        let box = e.target.nextSibling
        box.scrollLeft = box.scrollLeft - 310
    }
    const handleShowProductClick = (e, ID, title, category) => {
        e.preventDefault();
        navigateTO(`/products/${title.slice(0, 5)}${category}-${ID}`)
    }

    const handleAddToCartClick = (e, product) => {
        e.preventDefault();
        if (isLoggedIN) {
            e.target.classList.add("disabledAddTocartButton")
            e.target.innerHTML = "Saving<i class='fa-solid fa-spinner fa-spin'></i>"
            dispatch(addToCart(product));
            toast.success('Product Added Successfully!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                e.target.innerHTML = "Add To Cart"
                e.target.classList.remove("disabledAddTocartButton")
            }, 3000);

        } else {
            toast.error('You are not Logged In !', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }



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

            <section className='homeProduct__SliderContainers'>
                <h1 className='homeProduct__ContainersHeader'>{title}</h1>
                <i className="fa-solid fa-caret-left leftArrow sliderArrow" onClick={handlePrevBtnClick} ></i>
                {
                    isLoading ? <Loader /> : <div className='homeProduct__SliderBox'>
                        {
                            productData?.map((product) => {
                                return <div className="homeProduct" key={product.id}>
                                    <i className="fa-regular fa-heart homeProductCommpnIConButton wishListButton"></i>
                                    <i className="fa-regular fa-eye homeProductCommpnIConButton viewItemButton" onClick={(e) => handleShowProductClick(e, product.id, product.title, product.category)}></i>
                                    <div className="homeProductPosterContainer">
                                        <img src={product?.images.LinkOne} alt="ProductPoster" className="ProductPoster" />
                                    </div>
                                    <div className="homeProduct__InformationContainer">
                                        <span className='homeProduct__discountPercentageText'>{product?.discountPercentage} % Off</span>
                                        <button className='addToCartButton' onClick={(e) => handleAddToCartClick(e, product)}>
                                           Add To Cart                                            
                                            </button>
                                    </div>
                                </div>
                            })
                        }


                    </div>
                }
                <i className="fa-solid fa-caret-right rightArrow sliderArrow" onClick={handleNextBtnClick}></i>

            </section>
        </>
    )
}

export default memo(HomeProductSlider)
