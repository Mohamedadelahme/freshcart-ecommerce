import axios from "axios";
import { createContext } from "react";
import Product from "../Product/Product";




  export let AddCartContext=createContext()

   export default function AddCartContextProvider(props){

    
    let usertoken=localStorage.getItem('usertoken')
    let headers={token:usertoken}


    function AddCart (productId){

        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:productId

        },{
            headers:headers


        }).then((response)=>response)
        .catch((err)=>err)



    }
function getlooggedUserCart(){

  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
    headers:headers

    }).then((response)=>response)
.catch((err)=>err)

}
function removeCartItem(productId){

   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
        
            headers:headers
        }
    )
.then((response)=>response)
.catch((err)=>err)

}

function UpdateproductQuantaity(productId,count){

return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
        count:count
    },{
        headers:headers
    }
).then((response)=>response)
.catch((err)=>err)


}
function CashOnDelivery(values, cartId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        shippingAddress: values
    }, {
        headers: headers
    }).then((response) => response)
    .catch((err) => err)
}

function getUserOrders() {
    // Get user ID from token or use current user
    let usertoken = localStorage.getItem('usertoken');
    if (!usertoken) return Promise.resolve({ data: [] });
    
    // Decode token to get actual user ID
    try {
        let payload = JSON.parse(atob(usertoken.split('.')[1]));
        let userId = payload.id;
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
            headers: headers
        }).then((response) => response)
        .catch((err) => err)
    } catch (error) {
        return Promise.resolve({ data: [] });
    }
}

function OnlinePament(values,url,cartId){

  return axios.post(`https://ecommerce.routemisr.com/api/v1/checkout-session/${cartId}?url=${url}`,{
        shippingAddress:values

    },{
    headers:headers

    }).then((response)=>response)
.catch((err)=>err)

}






    return<AddCartContext.Provider value={{AddCart,getlooggedUserCart,removeCartItem,UpdateproductQuantaity,OnlinePament,CashOnDelivery,getUserOrders}}>

    {props.children}
    </AddCartContext.Provider>


  }