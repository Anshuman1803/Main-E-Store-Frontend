import React, { useState, createRef, useEffect } from 'react'

function SearchComponent(props) {
    const [searchProduct] = useState([]);
    const searchProductInputRef = createRef();

    useEffect(()=>{
        searchProductInputRef.current.focus();
    })
    return (
        <div className='ItemsearchContainer'>

             <div className="searchInputContainer">
             <input type="text" id='searchInputBar' name='searchProduct' placeholder='Search Your Product Here' ref={searchProductInputRef}/>
             <i className="fa-solid fa-xmark closebuttonIcon" onClick={()=> props.setterFun(false)}></i>
             </div>

               {
                searchProduct.length >0 ? <div className="searchedProdcutContainer">
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>
                <div className="searchedProduct"></div>

            </div> : <p className='MessageText'>Prodcut Not Found</p>

               }

        </div>
    )
}

export default SearchComponent
