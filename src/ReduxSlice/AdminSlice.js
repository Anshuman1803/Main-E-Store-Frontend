import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    "AdminDetails": {
        "Admin": localStorage.getItem("Admin") ? JSON.parse(localStorage.getItem("Admin")) : [],
        "isLoggedIN": localStorage.getItem("Admin") ? true : false,
    }

}
const ReduxAdminSlice = createSlice({
    name: "ADMIN",
    initialState,
    reducers: {
        admingLogin(state, action) {
            state.AdminDetails.Admin.push(action.payload[0]);
            state.AdminDetails.isLoggedIN = true;
            localStorage.setItem("Admin", JSON.stringify(state.AdminDetails.Admin));
        },
        adminLogOut(state, action) {
            state.AdminDetails.Admin = [];
            state.AdminDetails.isLoggedIN = false;
            localStorage.removeItem("Admin")
        }
    }

});
export const { admingLogin, adminLogOut } = ReduxAdminSlice.actions
export default ReduxAdminSlice.reducer