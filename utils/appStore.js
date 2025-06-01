import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice"
import feedReducer from "./feedSlice"
const appStore = configureStore({
    reducer : {
        user: userReducer,
        feed : feedReducer
    },
})
 export default appStore