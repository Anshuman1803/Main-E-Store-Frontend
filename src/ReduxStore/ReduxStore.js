import { configureStore } from "@reduxjs/toolkit";
import CartSliceReducer from "../ReduxSlice/CartSlice";
import AdminSliceReducer from "../ReduxSlice/AdminSlice";
const ReduxStore = configureStore({
    reducer: {
        MsCart: CartSliceReducer,
        AppAdmin: AdminSliceReducer
    }
});
export default ReduxStore;