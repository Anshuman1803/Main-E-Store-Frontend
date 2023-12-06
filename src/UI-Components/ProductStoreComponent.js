import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import WebNavBarComponent from './WebNavBarComponent'
import HeaderComponents from './HeaderComponents'
import RatingComponent from "./MUI-Components/RatingComponent"
import Loader from './Loader'
import axios from 'axios'
function ProductStoreComponent() {
  const [AllProduct, setAllProduct] = useState([])
  const category = useParams().category;
  const allCategoryName = []
  const allBrandName = []

  const [currentCategoryProduct, setCurrentCategoryProduct] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [ISproductFilterVisible, setISproductFilterVisible] = useState(false);

  useEffect(() => {
    setIsloading(true)
    axios.get(`http://localhost:5000/api/product/${category}`).then((response) => {
      setCurrentCategoryProduct(response.data);
      setIsloading(false)
    });
  }, [category]);

  useEffect(() => {
    setIsloading(true)
    axios.get("http://localhost:5000/api/product").then((response) => {
      setAllProduct(response.data)
    });
    setIsloading(false);
  }, []);

  AllProduct.forEach((product) => {
    if (!allBrandName.includes(product.brand)) {
      allBrandName.push(product.brand)
    }

    if (!allCategoryName.includes(product.category)) {
      allCategoryName.push(product.category)
    }
  });

  return (
    <>
      <HeaderComponents />
      <WebNavBarComponent />
      {
        isLoading ? <Loader /> : <section className='commonProductContaienr'>
          <i className="fa-solid fa-filter ProductfilterContainerButton" onClick={()=> setISproductFilterVisible(true)}></i>

        {
          ISproductFilterVisible &&   <div className="commonProductContainer__filterContainer">
          <h3 className='filterContainer__header'>Filter <i className="fa-solid fa-xmark filterContainer__closeButton" onClick={()=>setISproductFilterVisible(false)}></i></h3>
          <div className='filterContainer__FilterBox'>

              <h4 className='FilterOPTIONS__Heading'>Category</h4>
            <div className="FilterBox__FilterOPTIONS">
              {
                allCategoryName?.map((Category, index) => {
                  return <Link className='FilterOPTIONS__Items' key={index + 1}>{Category}</Link>
                })
              }
            </div>

              <h4 className='FilterOPTIONS__Heading'>Brand</h4>
            <div className="FilterBox__FilterOPTIONS">
              {
                allBrandName?.map((brand, index) => {
                  return <Link className='FilterOPTIONS__Items' key={index + 1}>{brand}</Link>
                })
              }
            </div>

          </div>
        </div>
        }

        {
          currentCategoryProduct?.map((productData, index)=>{
            return   <div className="homeProduct commonContainerProduct" key={productData.id + index}>
            <i className="fa-regular fa-heart homeProductCommpnIConButton wishListButton"></i>
            <i className="fa-regular fa-eye homeProductCommpnIConButton viewItemButton"></i>
            <div className="homeProductPosterContainer">
                <img src={productData?.images[0]} alt="ProductPoster" className="ProductPoster" />
            </div>
            <div className="homeProduct__InformationContainer">
                <RatingComponent rating={productData?.rating} />
                <span className='homeProduct__discountPercentageText'>{productData?.discountPercentage} % Off</span>
                <button className='addToCartButton'>Add To Cart</button>
            </div>
        </div>
          })

        }

        </section>
      }

    </>
  )
}

export default ProductStoreComponent
