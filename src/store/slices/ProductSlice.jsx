import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts=createAsyncThunk(
    "products/feProducts", async function(){
        const res=await axios.get("https://ecomflask.duckdns.org/api/products")
        console.log(res.data)
        return res.data
    }
)

const ProductSlice=createSlice({
        name:'Products',
        initialState:{
            items:[],
            error:'',
            loading:false
        },
        extraReducers:(builder)=>{

            builder.addCase(fetchProducts.pending,(state,action)=>{
                state.loading=true
            })
            builder.addCase(fetchProducts.fulfilled,(state,action)=>{
                state.loading=false
                state.items=action.payload.products
            })
            builder.addCase(fetchProducts.rejected,(state,action)=>{
                state.loading=false
                state.error="failed to fetch"
            })

        }
}

)
export default ProductSlice.reducer