import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/ProductSlice"
import Products from "../pages/Products";

const store=configureStore({
    reducer:{
        Products:ProductSlice

    }
}


)

export default store
