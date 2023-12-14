import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import axios from 'axios'
function AllProducts() {
    const [Allproduct, setAllProduct] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    const loadProductFun = () => {
        setIsloading(true)
        axios.get("http://localhost:5000/api/product").then((response) => {
            setAllProduct(response.data)
        });
        setIsloading(false);
    }

    useEffect(loadProductFun, []);


    const handleProductDelete = (id) => {
        setIsloading(true)
        axios.post(`http://localhost:5000/api/admin/deleteproduct/${id}`).then((response) => {
            console.log(response.data)
            loadProductFun();
        })
    }
    return (
        <>
            {
                isLoading ? <Loader /> : <div className='admin__AllProductContainer'>
                    {
                        Allproduct.map((product) => {
                            return <div className="AllProductBox" key={product.id}>
                                <div className="homeProductPosterContainer">
                                    <img src={product?.images[0]} alt="ProductPoster" className="ProductPoster" />
                                </div>
                                <div className="homeProduct__InformationContainer">
                                    <span className='homeProduct__titleText'>{product?.title.slice(0, 15)}...</span>
                                    <span className='homeProduct__titleText'>₹ {product?.Dprice}</span>
                                    <i title='Edit Product' className="fa-regular fa-pen-to-square homeProduct__IconButton homeProduct__EditIconButton"></i>

                                    <i title='Delete Product' className="fa-regular fa-trash-can homeProduct__IconButton homeProduct__DeleteIconButton" onClick={() => handleProductDelete(product.id)}></i>
                                </div>
                            </div>
                        })
                    }
                </div>
            }
        </>
    )
}

export default AllProducts
