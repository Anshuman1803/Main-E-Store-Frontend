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

         <section className='homeProduct__Containers'>
            <h1 className='homeProduct__ContainersHeader'>best of mobile</h1>
            <HomeProductSlider productData={productMobile} />
          </section>

          <section className='homeProduct__Containers'>
            <h1 className='homeProduct__ContainersHeader'>best of laptop</h1>
            <HomeProductSlider productData={productLaptop} />
          </section>

          <section className='homeProduct__Containers'>
            <h1 className='homeProduct__ContainersHeader'>best of camera</h1>
            <HomeProductSlider productData={productCamera} />
          </section>

          <section className='homeProduct__Containers'>
            <h1 className='homeProduct__ContainersHeader'>best of headphone</h1>
            <HomeProductSlider productData={productHeadphone} />
          </section>

          <section className='homeProduct__Containers'>
            <h1 className='homeProduct__ContainersHeader'>best of television</h1>
            <HomeProductSlider productData={productTelevision} />
          </section>
        </>
      }

    </>
  )
}

export default HomeComponent
