import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand ps-4" to="/">Order Manager</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
            <li className="nav-item active">
              <Link className={`nav-link link ${location.pathname === "/list-orders" ? "active" : ""}`} to={"/list-orders"}>List orders</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link link ${location.pathname === "/new-product" ? "active" : ""}`} to="new-product">Add product</Link >
            </li>
          </ul>
        </div>
      </nav >
    </>
  )
}
