import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../Loader'
import { ToastContainer, toast } from 'react-toastify';
function AddProduct() {
  const [isLoading, setIsloading] = useState(false);
  const [Message, setMessage] = useState(
    {
      "IsError__id": false,
      "IsError__title": false,
      "IsError__Aprice": false,
      "IsError__Dprice": false,
      "IsError__discountPercentage": false,
      "IsError__rating": false,
      "IsError__brand": false,
      "IsError__category": false,
      "IsError__description": false,
      "IsError__images": false,
      "msgVal": ""
    });

  const [newProduct, setNewProduct] = useState({

    "id": "",
    "title": "",
    "description": "",
    "Aprice": "",
    "Dprice": "",
    "discountPercentage": "",
    "rating": "",
    "brand": "",
    "category": "",
    "images": {
      "LinkOne": "",

      "LinkTwo": "",

      "LinkThree": "",

      "LinkFour": "",

      "LinkFive": "",

    },
  });

  const clearAllFields = (e) => {
    setNewProduct({

      "id": "",
      "title": "",
      "description": "",
      "Aprice": "",
      "Dprice": "",
      "discountPercentage": "",
      "rating": "",
      "brand": "",
      "category": "",
      "images": {
        "LinkOne": "",

        "LinkTwo": "",

        "LinkThree": "",

        "LinkFour": "",

        "LinkFive": "",

      },
    })
  }
  const handleInputOnChange = (e) => {
    setMessage({
      "IsError__id": false,
      "IsError__title": false,
      "IsError__description": false,
      "IsError__Aprice": false,
      "IsError__Dprice": false,
      "IsError__discountPercentage": false,
      "IsError__rating": false,
      "IsError__brand": false,
      "IsError__category": false,
      "IsError__images": false,
      "msgVal": ""
    });

    if (e.target.name === "id" || e.target.name === "Aprice" || e.target.name === "Dprice" || e.target.name === "discountPercentage") {
      setNewProduct({ ...newProduct, [e.target.name]: Number(e.target.value) });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value.trim() });
    }
  }
  
  const handleLinkInputOnChange = (e) => {
    setMessage({
      "IsError__id": false,
      "IsError__title": false,
      "IsError__description": false,
      "IsError__Aprice": false,
      "IsError__Dprice": false,
      "IsError__discountPercentage": false,
      "IsError__rating": false,
      "IsError__brand": false,
      "IsError__category": false,
      "IsError__images": false,
      "msgVal": ""
    });
    newProduct.images[e.target.name] = e.target.value
    setNewProduct(newProduct)
  }

  const calculateDiscountedPrice = (e) => {
    e.preventDefault();
    if (newProduct.Aprice === "") {
      setMessage({
        "IsError__id": false,
        "IsError__title": false,
        "IsError__Aprice": true,
        "IsError__Dprice": false,
        "IsError__discountPercentage": false,
        "IsError__rating": false,
        "IsError__brand": false,
        "IsError__category": false,
        "IsError__description": false,
        "IsError__images": false,
        "msgVal": "Provide Actual Price of Product"
      });
    }
    else if (newProduct.discountPercentage === "" || Number(newProduct.discountPercentage) > 95) {
      setMessage({
        "IsError__id": false,
        "IsError__title": false,
        "IsError__Aprice": false,
        "IsError__Dprice": false,
        "IsError__discountPercentage": true,
        "IsError__rating": false,
        "IsError__brand": false,
        "IsError__category": false,
        "IsError__description": false,
        "IsError__images": false,
        "msgVal": "Discount Percent between 0 to 95"
      });
    } else {
      let Dprice = parseInt(Number(newProduct.Aprice) - (Number(newProduct.Aprice) * Number(newProduct.discountPercentage) / 100));
      setNewProduct({ ...newProduct, Dprice: Dprice });
    }
  }

  const handlegenerateNExtID = (e) => {
    e.preventDefault();
    setIsloading(true)
    axios.get("http://localhost:5000/api/product").then((response) => {
      let generatedID = response.data.length + 1;
      setNewProduct({ ...newProduct, id: generatedID })
      setIsloading(false);
    });
  }

  const handleAddNewProductClick = (e) => {
    if (newProduct.id === "") {
      setMessage({
        "IsError__id": true,
        "IsError__title": false,
        "IsError__description": false,
        "IsError__Aprice": false,
        "IsError__Dprice": false,
        "IsError__discountPercentage": false,
        "IsError__rating": false,
        "IsError__brand": false,
        "IsError__category": false,
        "IsError__images": false,
        "msgVal": "Generate Product ID"
      });
    } else if (newProduct.title === "") {
      setMessage({
        "IsError__id": false,
        "IsError__title": true,
        "IsError__description": false,
        "IsError__Aprice": false,
        "IsError__Dprice": false,
        "IsError__discountPercentage": false,
        "IsError__rating": false,
        "IsError__brand": false,
        "IsError__category": false,
        "IsError__images": false,
        "msgVal": "Provide Correct Product Name"
      });
    }
    else if (newProduct.Aprice === "") {
      setMessage({
        "IsError__id": false,
        "IsError__title": false,
        "IsError__Aprice": true,
        "IsError__Dprice": false,
        "IsError__discountPercentage": false,
        "IsError__rating": false,
        "IsError__brand": false,
        "IsError__category": false,
        "IsError__description": false,
        "IsError__images": false,
        "msgVal": "Provide Actual Price of Product"
      });
    }
    else if (newProduct.discountPercentage === "" || Number(newProduct.discountPercentage) > 95) {
      setMessage({
        "IsError__id": false,
        "IsError__title": false,
        "IsError__Aprice": false,
        "IsError__Dprice": false,
        "IsError__discountPercentage": true,
        "IsError__rating": false,
        "IsError__brand": false,
        "IsError__category": false,
        "IsError__description": false,
        "IsError__images": false,
        "msgVal": "Discount Percent between 0 to 95"
      });
    }
    else if (newProduct.rating === "" || Number(newProduct.rating) > 5) {
      setMessage({
        "IsError__id": false,
        "IsError__title": false,
        "IsError__Aprice": false,
        "IsError__Dprice": false,
        "IsError__discountPercentage": false,
        "IsError__rating": true,
        "IsError__brand": false,
        "IsError__category": false,
        "IsError__description": false,
        "IsError__images": false,
        "msgVal": "Provide Rating between 1 to 5"
      });
    }
    else if (newProduct.brand === "") {
      setMessage({
        "IsError__id": false,
        "IsError__title": false,
        "IsError__Aprice": false,
        "IsError__Dprice": false,
        "IsError__discountPercentage": false,
        "IsError__rating": false,
        "IsError__brand": true,
        "IsError__category": false,
        "IsError__description": false,
        "IsError__images": false,
        "msgVal": "Provide Brand Name"
      });
    }
    else if (newProduct.category === "") {
      setMessage({
        "IsError__id": false,
        "IsError__title": false,
        "IsError__Aprice": false,
        "IsError__Dprice": false,
        "IsError__discountPercentage": false,
        "IsError__rating": false,
        "IsError__brand": false,
        "IsError__category": true,
        "IsError__description": false,
        "IsError__images": false,
        "msgVal": "Provide Brand Category"
      });
    }
    else if (newProduct.description === "") {
      setMessage({
        "IsError__id": false,
        "IsError__title": false,
        "IsError__Aprice": false,
        "IsError__Dprice": false,
        "IsError__discountPercentage": false,
        "IsError__rating": false,
        "IsError__brand": false,
        "IsError__category": false,
        "IsError__description": true,
        "IsError__images": false,
        "msgVal": "Provide Description of Product"
      });
    }
    else if (newProduct.images.LinkOne === "" || newProduct.images.LinkTwo === "" || newProduct.images.LinkThree === "" || newProduct.images.LinkFour === "" || newProduct.images.LinkFive === "") {
      setMessage({
        "IsError__id": false,
        "IsError__title": false,
        "IsError__Aprice": false,
        "IsError__Dprice": false,
        "IsError__discountPercentage": false,
        "IsError__rating": false,
        "IsError__brand": false,
        "IsError__category": false,
        "IsError__description": false,
        "IsError__images": true,
        "msgVal": "Provide Coorect Image Link"
      });
    }
    else if (newProduct.Dprice === "") {
      setMessage({
        "IsError__id": false,
        "IsError__title": false,
        "IsError__Aprice": false,
        "IsError__Dprice": true,
        "IsError__discountPercentage": false,
        "IsError__rating": false,
        "IsError__brand": false,
        "IsError__category": false,
        "IsError__description": false,
        "IsError__images": false,
        "msgVal": "Calculate Discounted Price"
      });
    }
    else {
      setIsloading(true)
      axios.post("http://localhost:5000/api/admin/add-product", newProduct).then((response) => {
        toast.success('New Product Added Successfully', {
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
          clearAllFields();
          setIsloading(false)
        }, 4000);

      })
    }
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
      <h1 className='addProduct__mainHeading'>Add New Product</h1>
      {
        isLoading ? <Loader /> : <div className="addProduct__FormContainer">

          <div className="addProduct_formItemBox">
            <label htmlFor="productID">Product ID*</label>
            <input type="number" inputMode="numeric" id='productID' name='id' placeholder='Product ID' className='addProduct_formItem' readOnly value={newProduct.id} />
            <button className='calDiscountPriceButton generateIDButton' onClick={handlegenerateNExtID}>Generate</button>
            {Message.IsError__id && <p className='inputErrorMsg'>{Message.msgVal} </p>}
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="productName">Product Name *</label>
            <input type="text" id='productName' name='title' placeholder=' Product Name' className='addProduct_formItem' onChange={handleInputOnChange} value={newProduct.title} />
            {Message.IsError__title && <p className='inputErrorMsg'>{Message.msgVal} </p>}
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="Aprice">Actual Price *</label>
            <input type="number" inputMode="numeric" id='Aprice' name='Aprice' placeholder='Product Actual Price' className='addProduct_formItem' onChange={handleInputOnChange} value={newProduct.Aprice} />
            {Message.IsError__Aprice && <p className='inputErrorMsg'>{Message.msgVal} </p>}
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="discountPercentage">Discount Percentage *</label>
            <input type="number" inputMode="numeric" id='discountPercentage' name='discountPercentage' placeholder='Product Discount Percentage' className='addProduct_formItem' onChange={handleInputOnChange} value={newProduct.discountPercentage} />
            {Message.IsError__discountPercentage && <p className='inputErrorMsg'>{Message.msgVal} </p>}
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="Dprice">Discounted Price *</label>
            <input type="number" inputMode="numeric" id='Dprice' name='Dprice' placeholder='Product Discounted Price' className='addProduct_formItem' value={newProduct.Dprice} readOnly />
            <button className='calDiscountPriceButton' onClick={calculateDiscountedPrice}>Get</button>
            {Message.IsError__Dprice && <p className='inputErrorMsg'>{Message.msgVal} </p>}
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="rating">Product Rating *</label>
            <input type="number" inputMode="numeric" id='rating' name='rating' placeholder='Product Rating' className='addProduct_formItem' onChange={handleInputOnChange} value={newProduct.rating} />
            {Message.IsError__rating && <p className='inputErrorMsg'>{Message.msgVal} </p>}
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="brand">Product Brand *</label>
            <input type="text" id='brand' name='brand' placeholder='Product Brand' className='addProduct_formItem' onChange={handleInputOnChange} value={newProduct.brand} />
            {Message.IsError__brand && <p className='inputErrorMsg'>{Message.msgVal} </p>}
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="category">Product Category *</label>
            <input type="text" id='category' name='category' placeholder='Product Category' className='addProduct_formItem' onChange={handleInputOnChange} value={newProduct.category} />
            {Message.IsError__category && <p className='inputErrorMsg'>{Message.msgVal} </p>}
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="description">Product Description *</label>
            <textarea name="description" id="description" className='addProduct_formItem_Desc' placeholder='Write Some Description about Product' onChange={handleInputOnChange} value={newProduct.description}></textarea>
            {Message.IsError__description && <p className='inputErrorMsg'>{Message.msgVal} </p>}
          </div>

          <div className="addProduct_formItemBox">
            <label htmlFor="images">Product Images *</label>
            <input type="text" id='images' name='LinkOne' placeholder='Product Image Link 1' className='addProduct_formItem' onChange={handleLinkInputOnChange} value={newProduct.images.LinkOne} />

            <input type="text" id='Secondimages' name='LinkTwo' placeholder='Product Image Link 2' className='addProduct_formItem' onChange={handleLinkInputOnChange} value={newProduct.images.LinkTwo} />

            <input type="text" id='Thirdimages' name='LinkThree' placeholder='Product Image Link 3' className='addProduct_formItem' onChange={handleLinkInputOnChange} value={newProduct.images.LinkThree} />

            <input type="text" id='Fourthimages' name='LinkFour' placeholder='Product Image Link 4' className='addProduct_formItem' onChange={handleLinkInputOnChange} value={newProduct.images.LinkFour} />

            <input type="text" id='fifthimages' name='LinkFive' placeholder='Product Image Link 5' className='addProduct_formItem' onChange={handleLinkInputOnChange} value={newProduct.images.LinkFive} />
            {Message.IsError__images && <p className='inputErrorMsg'>{Message.msgVal} </p>}

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
