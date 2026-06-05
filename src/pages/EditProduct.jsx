import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function EditProduct() {
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    title:"",
    Description:"",
    About_item:"",
    quantity:"",
    price:"",
    category:""
  })
  const [file,setFile]=useState(null)

 const {id} =useParams();

  function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

  async function getProduct(){
      try{
          const res=await axios.get(`https://ecomflask.duckdns.org/api/admin/item/${id}`,
            {
              withCredentials:true
            }
          )
          console.log(res.data.product)
          const p=res.data.product
          setFormData({
               title:p.itemname,
                Description:p.item_desc,
                About_item:p.item_about,
                quantity:p.quantity,
                price:p.price,
                category:p.category
             })
      }
      catch(error){
        console.log(error.response?.data || error.message)
      }
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

if(file){
  data.append("file",file);
}

const result=await axios.put(`https://ecomflask.duckdns.org/api/admin/update-item/${id}`,
  data,
  {
    withCredentials:true,
    headers:{
      "Content-Type":"multipart/form-data"
    }
  }

)
alert("updated successfully");
navigate("/admin-products")

    }
    catch(error){
console.log(error.response?.data || error.message)
    }


  }

  useEffect(()=>{
      getProduct()
  },[])
  return (
    <div>
  <h2>Edit Product</h2>
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

<button>Update Product</button>
  </form>
    </div>
  )
}
