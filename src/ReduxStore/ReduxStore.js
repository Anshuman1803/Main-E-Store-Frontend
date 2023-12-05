import { configureStore } from "@reduxjs/toolkit";
import CartSliceReducer from "../ReduxSlice/CartSlice";
const ReduxStore = configureStore({
    reducer :{
        MsCart : CartSliceReducer
    }
});
export default ReduxStore;