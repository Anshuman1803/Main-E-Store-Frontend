import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    UserCart: {
        "userDetails": localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : [],
        "cartItems": localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        "Total__Quantity": localStorage.getItem("Total__Quantity") ? (localStorage.getItem("Total__Quantity")) : 0,
        "isLoggedIN": localStorage.getItem("userDetails") ? true : false,
        "totalAmmount": 0,
    }

}
const ReduxCartSlice = createSlice({
    name: "Ms Cart",
    initialState,
    reducers: {

        addLoginUser(state, action) {
            state.UserCart.userDetails.push(action.payload[0]);
            state.UserCart.isLoggedIN = true;
            localStorage.setItem("userDetails", JSON.stringify(state.UserCart.userDetails));
        },

        userLogOut(state, action) {
            state.UserCart.userDetails = [];
            state.UserCart.cartItems = [];
            state.UserCart.Total__Quantity = 0;
            state.UserCart.isLoggedIN = false;
            state.UserCart.totalAmmount = 0;
            localStorage.removeItem("userDetails", "cartItems", "Total__Quantity")
        },

        addToCart(state, action) {
            delete (action.payload["_id"]);

            const itemIndex = state.UserCart.cartItems.findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                state.tempLoading = true
                state.UserCart.cartItems[itemIndex].ItemQuantity += 1;
                const tempProduct = { ...action.payload, ItemQuantity: state.UserCart.cartItems[itemIndex].ItemQuantity, "userEmail": state.UserCart.userDetails[0].userEmail };
                axios.post("https://mainstoreapi.onrender.com/api/updateCartProduct", tempProduct)

            } else {
                const tempProduct = { ...action.payload, ItemQuantity: 1, "userEmail": state.UserCart.userDetails[0].userEmail };
                state.UserCart.cartItems.push(tempProduct);
                axios.post("https://mainstoreapi.onrender.com/api/addtocart", tempProduct);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.UserCart.cartItems));
        },

        removeFromCart(state, action) {
            state.UserCart.cartItems = state.UserCart.cartItems.filter((product) => product.id !== action.payload.id);
            axios.post("https://mainstoreapi.onrender.com/api/removetocart", action.payload)
            localStorage.setItem("cartItems", JSON.stringify(state.UserCart.cartItems));
        }
    }

});
export const { addLoginUser, userLogOut, addToCart, removeFromCart } = ReduxCartSlice.actions
export default ReduxCartSlice.reducer