import { useNavigate } from "react-router-dom"




export default  function ProtectRoute(props) {
    const Navigate=useNavigate()
    if(localStorage.getItem('usertoken')!==null){
        return props.children

    }
    else{
Navigate('/login')
         
    }



    return <>
    
    </>
}