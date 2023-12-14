import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../Loader'
function AddProduct() {
  const [isLoading, setIsloading] = useState(false);


  const [newProduct, setNewProduct] = useState({

    "id": 72,
    "title": "Hisense E7K 108 cm (43 inch) QLED Ultra HD (4K) Smart VIDAA TV With Dolby Vision and Atmos  (43E7K)",
    "description": "In the realm of exceptional technology, where innovation meets entertainment, the Hisense E7K TV stands tall as a symbol of breathtaking visuals, immersive audio, and intelligent design. With Quantum Dot Color, 4K Resolution, Dolby Atmos, AI Picture, Dolby Vision & HDR 10, AI Sports Mode, Game Mode Plus, Voice Remote, and versatile connectivity options, this TV redefines what you can expect from your entertainment center. It's a masterpiece that brings your content to life, immersing you in a world of cinematic wonder. Elevate your viewing experience with the Hisense E7.",
    "Aprice": 46999,
    "Dprice": 25999,
    "discountPercentage": "44",
    "rating": "4.2",
    "brand": "Motorola",
    "category": "television",
    "images": [
      "https://rukminim2.flixcart.com/image/416/416/xif0q/television/y/1/f/-original-imagvbmczsgsz5sg.jpeg?q=70",

      "https://rukminim2.flixcart.com/image/416/416/xif0q/television/y/c/c/43e7k-hisense-original-imagtbp2hug3fcgj.jpeg?q=70",

      "https://rukminim2.flixcart.com/image/416/416/xif0q/television/a/9/z/43e7k-hisense-original-imagtbp2apdhgkhn.jpeg?q=70",

      "https://rukminim2.flixcart.com/image/416/416/xif0q/television/x/t/s/43e7k-hisense-original-imagtbp2ghyuv5fb.jpeg?q=70",
      
      "https://rukminim2.flixcart.com/image/416/416/xif0q/television/k/j/o/-original-imagvbmcbvktcdaz.jpeg?q=70",

    ],
  });

  const handleInputOnChange = (e) => {
    if (e.target.name === "id" || e.target.name === "Aprice" || e.target.name === "Dprice" || e.target.name === "discountPercentage") {
      setNewProduct({ ...newProduct, [e.target.name]: Number(e.target.value) });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  }

  const handleAddNewProductClick = (e) => {
    setIsloading(true)
    axios.post("http://localhost:5000/api/admin/add-product", newProduct).then((response)=>{
      console.log(response.data)
      setIsloading(false) 
    })
  }


  return (
    <>
      <h1 className='addProduct__mainHeading'>Add New Product</h1>
      {
        isLoading ? <Loader /> : <div className="addProduct__FormContainer">

          <div className="addProduct_formItemBox">
            <label htmlFor="productID">Product ID*</label>
            <input type="number" inputMode="numeric" id='productID' name='id' placeholder='Product ID' className='addProduct_formItem' onChange={handleInputOnChange} />
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="productName">Product Name *</label>
            <input type="text" id='productName' name='title' placeholder=' Product Name' className='addProduct_formItem' onChange={handleInputOnChange} />
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="Aprice">Actual Price *</label>
            <input type="number" inputMode="numeric" id='Aprice' name='Aprice' placeholder='Product Actual Price' className='addProduct_formItem' onChange={handleInputOnChange} />
          </div>


          <div className="addProduct_formItemBox">
            <label htmlFor="Dprice">Discounted Price *</label>
            <input type="number" inputMode="numeric" id='Dprice' name='Dprice' placeholder='Product Discounted Price' className='addProduct_formItem' onChange={handleInputOnChange} />
          </div>



          <div className="addProduct_formItemBox">
            <label htmlFor="discountPercentage">Discount Percentage *</label>
            <input type="number" inputMode="numeric" id='discountPercentage' name='discountPercentage' placeholder='Product Discount Percentage' className='addProduct_formItem' onChange={handleInputOnChange} />
          </div>


          <div className="addProduct_formItemBox">
            <label htmlFor="rating">Product Rating *</label>
            <input type="number" inputMode="numeric" id='rating' name='rating' placeholder='Product Rating' className='addProduct_formItem' onChange={handleInputOnChange} />
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="brand">Product Brand *</label>
            <input type="text" id='brand' name='brand' placeholder='Product Brand' className='addProduct_formItem' onChange={handleInputOnChange} />
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="category">Product Category *</label>
            <input type="text" id='category' name='category' placeholder='Product Category' className='addProduct_formItem' onChange={handleInputOnChange} />
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="description">Product Description *</label>
            <textarea name="description" id="description" className='addProduct_formItem_Desc' placeholder='Write Some Description about Product' onChange={handleInputOnChange}></textarea>
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="images">Product Images *</label>
            <input type="text" id='images' name='category' placeholder='Product Image Link 1' className='addProduct_formItem' />

            <input type="text" id='Secondimages' name='category' placeholder='Product Image Link 2' className='addProduct_formItem' />

            <input type="text" id='Thirdimages' name='category' placeholder='Product Image Link 3' className='addProduct_formItem' />

            <input type="text" id='Fourthimages' name='category' placeholder='Product Image Link 4' className='addProduct_formItem' />
            <input type="text" id='fifthimages' name='category' placeholder='Product Image Link 5' className='addProduct_formItem' />

          </div>
          <div className="addProduct_formItemBox addProduct_formItemBox_button">
            <button className='addNewProduct_button' onClick={handleAddNewProductClick}>Add New Product</button>
          </div>


        </div>
      }
    </>
  )
}

export default AddProduct
