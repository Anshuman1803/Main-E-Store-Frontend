import { createSlice } from '@reduxjs/toolkit'
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
        }

    }

});
export const { addLoginUser, userLogOut} = ReduxCartSlice.actions
export default ReduxCartSlice.reducer