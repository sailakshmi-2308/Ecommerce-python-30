import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <Link to="/">home</Link>
    <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      <Link to="login">Login</Link>
        <Link to="/register">register</Link>
    </div>
  )
}
