import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader';
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
    }, [CurrentID])

    return (
        <section className='singleProducView_Container'>
            {
                isLoading ? <Loader/> : <>
                <div className="singleProductView_imageContainer">

                </div>
                
                <div className="singleProductView_detailsContainer">

                </div>

                <div className="singleProductView_moreProductContainer">
                    
                </div>
                </>
            }

        </section>
    )
}

export default SingleProductCompo
