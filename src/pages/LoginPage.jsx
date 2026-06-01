import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const [user,setuser] = useState("");
    const navigate=useNavigate()

    function handleSubmit(){
        console.log(user);
        const userdata={
            username:user
        }
        localStorage.setItem("user",JSON.stringify(userdata))
        navigate("/products")


    }
  return (
    <div>

 <h1>Login Pge</h1>

 <input type="text"
 placeholder="enter your name"
 value={user}
 onChange={e=>setuser(e.target.value)}
  
 />
 <button onClick={handleSubmit}>submit</button>

    </div>
  )
}
