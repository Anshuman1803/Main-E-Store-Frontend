import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
function AllProducts() {
    const [Allproduct, setAllProduct] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [showConfirmation, SetShowConfirmation] = useState(false);
    const [deleteProductID, setDeleteProductID] = useState("")

    const loadProductFun = () => {
        setIsloading(true)
        axios.get("http://localhost:5000/api/product").then((response) => {
            setAllProduct(response.data)
            setIsloading(false);
        });
    }

    useEffect(loadProductFun, []);

    const hideConfirmationPopup = (e) => {
        SetShowConfirmation(false)
        setDeleteProductID("");
    }

    const handleShowConfirmationPopup = (id) => {
        setDeleteProductID(id);
        SetShowConfirmation(true)
    }

    const handleDeleteProduct = (e) => {
        setIsloading(true)
        axios.post(`http://localhost:5000/api/admin/deleteproduct/${deleteProductID}`).then((response) => {

            toast.success('Product Deleted Successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                loadProductFun();
                hideConfirmationPopup();
                setIsloading(false)
            }, 4000);
        })
    }
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {
                isLoading ? <Loader /> : <div className='admin__AllProductContainer'>
                    {
                        Allproduct.map((product) => {
                            return <div className="AllProductBox" key={product.id}>
                                <div className="homeProductPosterContainer">
                                    <img src={product?.images.LinkOne} alt="ProductPoster" className="ProductPoster" />
                                </div>
                                <div className="homeProduct__InformationContainer">
                                    <span className='homeProduct__titleText'>{product?.title.slice(0, 15)}...</span>
                                    <span className='homeProduct__titleText'>₹ {product?.Dprice}</span>
                                    <i title='Edit Product' className="fa-regular fa-pen-to-square homeProduct__IconButton homeProduct__EditIconButton"></i>

                                    <i title='Delete Product' className="fa-regular fa-trash-can homeProduct__IconButton homeProduct__DeleteIconButton" onClick={() => handleShowConfirmationPopup(product.id)}></i>
                                </div>
                            </div>
                        })
                    }
                </div>
            }
            {showConfirmation && <div className='confirmationPopup_conainer'>

                <div className="ConfirmationPopup_box">
                    <h2 className='confirmationBox_heading'>Do You Really Want To Delete The Product</h2>
                    <div className="confirmationButton_box">
                        <button className='confirmationButtons' onClick={handleDeleteProduct}>Delete</button>
                        <button className='confirmationButtons' onClick={hideConfirmationPopup}>Cancel</button>
                    </div>
                </div>

            </div>}
        </>
    )
}

export default AllProducts
