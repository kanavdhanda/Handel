/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard/Dashboard'
import DashHome from './pages/Home/DashHome'
import Login from './pages/Auth/Login'
import Home from './pages/Home/Home'
import SignUp from './pages/Auth/SignUp'
import ProductViewer from './components/improve/getprod'
import AddNew from './pages/Dashboard/AddNew'
import Products from './pages/Products/Products'
import ShippingDoc from './pages/Dashboard/ShippingDoc'
import PaymentRec from './pages/Dashboard/PaymentRec'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<DashHome />} />
        <Route path="/products" element={<Products />} />
        <Route path="/getprod" element={<ProductViewer />} />
        <Route path="/addprod" element={<AddNew />} />
        <Route path="/shippingdoc" element={<ShippingDoc />} />
        <Route path="/paymentrec" element={<PaymentRec />} />
        
      </Routes>
    </Router>
  )
}

export default App