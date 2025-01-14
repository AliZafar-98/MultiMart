import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetail from '../pages/ProductDetail'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'


// form admin dashboard
// import AddProducts from "../admin/AddProducts"
// import AllProducts from "../admin/AllProducts"
// import Dashboard from "../admin/Dashboard"

import ProtectedRoute from './ProtectedRoute'





const Routers = () => {
    return <Routes>
       <Route path='/' element={<Navigate to='home'/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='shop' element={<Shop/>}/>
        <Route path='shop/:id' element={<ProductDetail/>}/>
        <Route path='cart' element={<Cart/>}/>
        {/* <Route path='checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>}/> */}
        <Route path='/*' element={<ProtectedRoute/>}>
          <Route path='checkout' element={<Checkout />} />
          {/* <Route path='dashboard' element={<Dashboard />} /> */}
          {/* <Route path='dashboard/all-products' element={<AllProducts />} />
          <Route path='dashboard/add-products' element={<AddProducts />} /> */}
          
          
        </Route>
        

        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>

       



    </Routes>
};
export default Routers