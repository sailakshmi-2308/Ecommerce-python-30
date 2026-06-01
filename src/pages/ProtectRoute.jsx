import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectRoute({children}) {

    const navigate=useNavigate()
    const user= JSON.parse(localStorage.getItem("user"))

    if(!user){
        return navigate("/login")
    }
  return  children
}
