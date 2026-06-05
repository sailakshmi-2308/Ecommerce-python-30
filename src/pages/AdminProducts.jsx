import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {

    const navigate=useNavigate()
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const res = await axios.get(
        "https://ecomflask.duckdns.org/api/admin/items",
        {
          withCredentials: true,
        }
      );

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id){
    try{

        const res=await axios.delete(`https://ecomflask.duckdns.org/api/admin/delete-item/${id}`,
            {
                withCredentials:true
            }
        )
        alert(res.data.message);
        getProducts();


    }
    catch(error){

    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Admin Products</h1>

      <div className="row g-4">
        {products.map((item) => (
          <div className="col-md-6 col-lg-4" key={item.itemid}>
            <div className="card h-100 shadow">

              <img
                src={item.image}
                alt={item.itemname}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.itemname}</h5>

                <p className="card-text text-muted">
                  {item.item_desc}
                </p>

                <h4 className="text-success mb-3">
                  ₹{item.price}
                </h4>

                <div className="mt-auto d-flex gap-2">
                  <button className="btn btn-primary flex-fill" onClick={()=>navigate(`/singleproduct/${item.itemid}`)}>
                    View
                  </button>

                  <button className="btn btn-warning flex-fill" onClick={()=>navigate(`/edit/${item.itemid}`)}>
                    Edit
                  </button>

                  <button className="btn btn-danger flex-fill" onClick={()=>deleteProduct(item.itemid)}>
                    Delete
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}