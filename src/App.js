import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Product from './components/Product/Product';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import UserContextProvider from './components/Context/UserContext';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import { useState } from 'react';
import AddCartContextProvider from './components/Context/AddCartcontext';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { HelmetProvider } from 'react-helmet-async';
import  { Toaster } from 'react-hot-toast';
import Adress from './components/Adress/Adress';
import Order from './components/Order/Order';
import Contact from './components/Contact/Contact';
const queryClient = new QueryClient()

export default function App(){
  const [userdata, setUserdata] = useState(null)
  
  function saveuserdata(userData) {
    setUserdata(userData)
  }
  
  let routers=createBrowserRouter([
    {path:'/',element:<Layout setuserdata={setUserdata} userdata={userdata}/>,children:[
      {path:'home',element:<ProtectRoute><Home/></ProtectRoute>},
      {path:'brands',element:<ProtectRoute><Brands/></ProtectRoute>},
      {path:'cart',element:<ProtectRoute><Cart/></ProtectRoute>},
      {path:'categories',element:<ProtectRoute><Categories/></ProtectRoute>},
      {index:true,element:<Login saveuserdata={saveuserdata}/>},
      {path:'product',element:<ProtectRoute><Product/></ProtectRoute>},
      {path:'productdetails/:id',element:<ProtectRoute><ProductDetails/></ProtectRoute>},
      {path:'register',element:<Register/>},
      {path:'Adress',element:<ProtectRoute><Adress/></ProtectRoute>},
      {path:'order',element:<ProtectRoute><Order/></ProtectRoute>},
      {path:'contact',element:<ProtectRoute><Contact/></ProtectRoute>},
      {path:'*',element:<Notfound/>},
    

 
 





    ]}


  ], {
    future: {
      v7_startTransition: true
    }
  })
   


  return (
    <HelmetProvider>
      <AddCartContextProvider>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <RouterProvider router={routers} />
          </UserContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AddCartContextProvider>
      <Toaster />
    </HelmetProvider>
  )
   
}