import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    isAdminLogged: false
}
export const loginHandler = createSlice({
    name : 'login',
    initialState, 
    reducers : {
        setLogin: (state) => {
            state.isLoggedIn = true
        },
        setLogOut: (state) => {
            state.isLoggedIn = false
        },
        setAdminLogIn: (state) => {
            state.isAdminLogged = true
        },
        setAdminLogOut: (state) => {
            state.isAdminLogged = false
        }
    }
})

export const { setLogin, setLogOut, setAdminLogIn, setAdminLogOut } = loginHandler.actions;
export default loginHandler.reducer