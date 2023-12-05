import React from 'react'
import { useParams } from 'react-router-dom'
import WebNavBarComponent from './WebNavBarComponent'
import HeaderComponents from './HeaderComponents'
function ProductStoreComponent() {
  const category = useParams().category
  return (
    <>
    <HeaderComponents/>
      <WebNavBarComponent />
      {category} Page

    </>
  )
}

export default ProductStoreComponent
