import { createContext, useState } from "react";



export  let UserContext=createContext()

export default  function UserContextProvider(props){

 const [Usertoken,setUsertoken]=useState(localStorage.getItem('usertoken'))

return <UserContext.Provider value={{Usertoken,setUsertoken}}>
    {props.children}

</UserContext.Provider>
}