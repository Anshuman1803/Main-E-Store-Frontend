import React, { useEffect, useState } from 'react'
import WebNavBarComponent from './WebNavBarComponent'
import HeaderComponents from './HeaderComponents'
import HomeSlider from './HomeSlider'
import axios from 'axios'
import HomeProductSlider from './HomeProductSlider'
import Loader from './Loader'

function HomeComponent() {
  const [productMobile, setProductMobile] = useState([]);
  const [productCamera, setProductCamera] = useState([]);
  const [productLaptop, setProductLaptop] = useState([]);
  const [productHeadphone, setProductHeadphone] = useState([]);
  const [productTelevision, setProductTelevision] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    setIsloading(true)
    axios.get("http://localhost:5000/api/product").then((response) => {
      setProductMobile(response.data.filter((item) => item.category === "mobile"))
      setProductCamera(response.data.filter((item) => item.category === "camera"))
      setProductLaptop(response.data.filter((item) => item.category === "laptop"))
      setProductHeadphone(response.data.filter((item) => item.category === "headphone"))
      setProductTelevision(response.data.filter((item) => item.category === "television"));
      setIsloading(false)
    })
  }, []);

  return (
    <>
      <HeaderComponents />
      <WebNavBarComponent />
      <HomeSlider />
      {
        isLoading ? <Loader /> : <>

          <HomeProductSlider productData={productMobile} category={"mobile"} />
          <HomeProductSlider productData={productLaptop} category={"laptop"} />
          <HomeProductSlider productData={productCamera} category={"Camera"} />
          <HomeProductSlider productData={productHeadphone} category={"headphone"} />
          <HomeProductSlider productData={productTelevision} category={"television"} />
        </>
      }

    </>
  )
}

export default HomeComponent
