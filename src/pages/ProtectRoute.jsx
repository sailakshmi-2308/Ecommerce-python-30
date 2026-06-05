import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectRoute({children}) {

    const navigate=useNavigate()
    const admin= JSON.parse(localStorage.getItem("admin"))

    return admin?children:navigate("/login")

   
}
