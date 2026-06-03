import React,{use, useState} from 'react'
import axios from 'axios';

export default function AddProduct() {
    const [formData,setFormData]=useState({
        title:"",
        Description:"",
        About_item:"",
        quantity:"",
        price:"",
        category:""
    })
    const[file,setFile]=useState(null);

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

   async function handleSubmit(e){
    e.preventDefault();
    try{
        const data= new FormData();
data.append("title",formData.title);
data.append("Description",formData.Description);
data.append("About_item",formData.About_item);
data.append("quantity",formData.quantity);
data.append("price",formData.price);
data.append("category",formData.category);
data.append("file",file);

        const res = await axios.post("https://ecomflask.duckdns.org/api/admin/add-item",data,
            {
                withCredentials:true,
                header:{
                    "Content-Type":"multipart/form-data"

                }
            }
        )
        console.log(res.data)

        setFormData({
               title:"",
        Description:"",
        About_item:"",
        quantity:"",
        price:"",
        category:""
        })
        setFile(null)


    }
    catch(error){

    }
}

  return (
    <div>
  <h2>Add Product</h2>
  <form action="" onSubmit={ handleSubmit}>

    <div>
    <label htmlFor="">Product Title</label>
    <input type="text"
        name="title"
        placeholder="enter product title"
        value={formData.title}
        onChange={handleChange} 
    />
  </div>
  <div>
    <label htmlFor="">Description</label>
    <input type="text"
        name="Description"
        placeholder="enter product description"
        value={formData.Description}
        onChange={handleChange} 
    />
  </div>
  <div>
    <label htmlFor="">About item</label>
    <input type="text"
        name="About_item"
        placeholder="enter about product"
        value={formData.About_item}
        onChange={handleChange} 
    />
  </div>

    <div>
    <label htmlFor="">quantity</label>
    <input type="text"
        name="quantity"
        placeholder="enter quantity"
        value={formData.quantity}
        onChange={handleChange} 
    />
  </div>
   <div>
    <label htmlFor="">price</label>
    <input type="text"
        name="price"
        placeholder="enter price"
        value={formData.price}
        onChange={handleChange} 
    />
  </div>
    <div>
    <label htmlFor="">category</label>
    <input type="text"
        name="category"
        placeholder="enter category"
        value={formData.category}
        onChange={handleChange} 
    />
  </div>

   <div>
    <label htmlFor="">Upload Image</label>
    <input type="file"
        onChange={(e)=>setFile(e.target.files[0])} 
    />
  </div>

<button>Submit</button>
  </form>
    </div>
  )
}
