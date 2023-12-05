import React, { useEffect, useState } from 'react'
import WebNavBarComponent from './WebNavBarComponent'
import HeaderComponents from './HeaderComponents'
import HomeSlider from './HomeSlider'
import axios from 'axios'
import HomeProductSlider from './HomeProductSlider'

function HomeComponent() {
  const [productMobile, setProductMobile] = useState([]);
  const [productCamera, setProductCamera] = useState([]);
  const [productLaptop, setProductLaptop] = useState([]);
  const [productHeadphone, setProductHeadphone] = useState([]);
  const [productTelevision, setProductTelevision] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5000/api/product").then((response)=>{
      setProductMobile(response.data.filter((item)=>item.category === "mobile"))
      setProductCamera(response.data.filter((item)=>item.category === "camera"))
      setProductLaptop(response.data.filter((item)=>item.category === "laptop"))
      setProductHeadphone(response.data.filter((item)=>item.category === "headphone"))
      setProductTelevision(response.data.filter((item)=>item.category === "television"))
    })
  }, []);

  return (
    <>
      <HeaderComponents />
      <WebNavBarComponent />
      <HomeSlider />

      <section className='homeProduct__Containers'>
        <h1 className='homeProduct__ContainersHeader'>best of mobiles</h1>
       <HomeProductSlider productData={productMobile} category={"mobile"}/>
      </section>

      <section className='homeProduct__Containers'>
        <h1 className='homeProduct__ContainersHeader'>best of laptop</h1>
       <HomeProductSlider productData={productLaptop} category={"laptop"}/>
      </section>

      <section className='homeProduct__Containers'>
        <h1 className='homeProduct__ContainersHeader'>best of camera</h1>
       <HomeProductSlider productData={productCamera} category={"camera"}/>
      </section>

      <section className='homeProduct__Containers'>
        <h1 className='homeProduct__ContainersHeader'>best of laptop</h1>
       <HomeProductSlider productData={productHeadphone} category={"camera"}/>
      </section>

    </>
  )
}

export default HomeComponent
