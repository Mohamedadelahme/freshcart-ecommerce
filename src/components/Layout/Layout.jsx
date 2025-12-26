
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
//import Style from './Layout.module.css'
import Footer from '../Footer/Footer'
import { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext'
import { Offline
    
 } from "react-detect-offline";




export default function Layout() {

    const{setUsertoken}=useContext(UserContext)
    useEffect(()=>{
     if ( localStorage.getItem('usertoken') !==null) {
        setUsertoken(   localStorage.getItem('usertoken'))
       }

    },[])





    return <>
        <div className="d-flex flex-column min-vh-100">
            
            <Offline>
                <div className="alert alert-warning text-center py-2 mb-0">
                    <i className="fas fa-wifi-slash me-2"></i>You're offline
                </div>
            </Offline>
            <Navbar/>
            <main className="flex-grow-1">
                <Outlet></Outlet>
            </main>
            <Footer/>
        </div>
        
  
      
        </>
    
}
