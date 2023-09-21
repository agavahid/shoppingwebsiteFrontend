import { configureStore } from '@reduxjs/toolkit'
import loginHandler  from './features/loginValue/loginValue';



export const store = configureStore({
    reducer: {
        login: loginHandler,
    },
})