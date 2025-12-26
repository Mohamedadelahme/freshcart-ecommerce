import { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { AddCartContext } from '../Context/AddCartcontext'
import { Helmet } from 'react-helmet-async'
import { PacmanLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import { Link } from 'react-router-dom'
export default function Cart() {

    let {getlooggedUserCart}=useContext(AddCartContext)
   let  [Cartdetails,setCartdetails]=useState(null)
   let [isLoading, setIsLoading] = useState(true)
 let{removeCartItem}=useContext(AddCartContext)  
 let{UpdateproductQuantaity}=useContext(AddCartContext)
let navigate=useNavigate()

    async function GetCard(){
        setIsLoading(true)
        try {
            let {data} = await getlooggedUserCart()
            console.log('API cart data:', data);
            
            if (data && data.data && data.data.products && data.data.products.length > 0) {
                setCartdetails(data)
            } else {
                // If API cart is empty, check localStorage
                const savedItems = localStorage.getItem('myCartItems');
                if (savedItems) {
                    const localItems = JSON.parse(savedItems);
                    console.log('Using localStorage items:', localItems);
                    
                    // Format localStorage items to match API structure
                    const formattedData = {
                        numOfCartItems: localItems.length,
                        data: {
                            totalCartPrice: localItems.reduce((total, item) => total + item.price, 0),
                            products: localItems.map(item => ({
                                product: {
                                    id: item.id,
                                    title: item.title,
                                    imageCover: item.imageCover,
                                    category: item.category
                                },
                                price: item.price,
                                count: 1
                            }))
                        }
                    };
                    setCartdetails(formattedData);
                } else {
                    setCartdetails(null);
                }
            }
        } catch (error) {
            console.log('API error, checking localStorage:', error);
            // If API fails, check localStorage
            const savedItems = localStorage.getItem('myCartItems');
            if (savedItems) {
                const localItems = JSON.parse(savedItems);
                const formattedData = {
                    numOfCartItems: localItems.length,
                    data: {
                        totalCartPrice: localItems.reduce((total, item) => total + item.price, 0),
                        products: localItems.map(item => ({
                            product: {
                                id: item.id,
                                title: item.title,
                                imageCover: item.imageCover,
                                category: item.category
                            },
                            price: item.price,
                            count: 1
                        }))
                    }
                };
                setCartdetails(formattedData);
            } else {
                setCartdetails(null);
            }
        }
        setIsLoading(false)
    }

    async function DeletItemCart(productId){
        try {
            let response = await removeCartItem(productId)
            if(response.data.status === 'success') {
                toast('Product removed from cart successfully!', { duration: 3000, position: 'top-center', type: 'success' })
                setCartdetails(response.data)
            }
        } catch (error) {
            // If API fails, remove from localStorage
            const savedItems = localStorage.getItem('myCartItems');
            if (savedItems) {
                const localItems = JSON.parse(savedItems);
                const updatedItems = localItems.filter(item => item.id !== productId);
                localStorage.setItem('myCartItems', JSON.stringify(updatedItems));
                toast('Product removed from cart successfully!', { duration: 3000, position: 'top-center', type: 'success' })
                GetCard(); // Refresh cart
            }
        }
    }
    async function UpdateItemQuantity(productId,count){
        if(count <= 0) return;
        let response=await UpdateproductQuantaity(productId,count)
        
        if(response.data.status === 'success') {
            setCartdetails(response.data)
        }
    }

    
    useEffect(()=>{
        GetCard()
    },[])

    if (isLoading) {
        return (
            <>
                <Helmet>
                    <title>Shopping Cart - FreshCart</title>
                    <meta name="description" content="Your FreshCart shopping cart" />
                </Helmet>
                <div className="container py-5 text-center">
                    <div className="d-flex flex-column align-items-center">
                        <PacmanLoader color="#28a745" size={25} />
                        <p className="mt-3 text-muted fw-semibold">Loading your cart...</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Shopping Cart - FreshCart</title>
                <meta name="description" content="Your FreshCart shopping cart" />
            </Helmet>
            
            {Cartdetails ? (
                <div className="container py-5">
                    <div className={`${Style.cartContainer} bg-white rounded-4 shadow-sm p-4`}>
                        {/* Cart Header */}
                        <div className={`${Style.cartHeader} text-center mb-4`}>
                            <h2 className="fw-bold text-dark mb-3">
                                <i className="fas fa-shopping-cart text-success me-2"></i>
                                Shopping Cart
                            </h2>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={`${Style.cartStat} p-3 rounded-3 bg-light`}>
                                        <i className="fas fa-box text-success fs-4 mb-2"></i>
                                        <h6 className="text-muted mb-1">Items in Cart</h6>
                                        <h4 className="fw-bold text-success">{Cartdetails.numOfCartItems}</h4>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={`${Style.cartStat} p-3 rounded-3 bg-light`}>
                                        <i className="fas fa-money-bill-wave text-success fs-4 mb-2"></i>
                                        <h6 className="text-muted mb-1">Total Price</h6>
                                        <h4 className="fw-bold text-success">{Cartdetails.data.totalCartPrice} EGP</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className={Style.cartItems}>
                            {Cartdetails.data.products.map((product) => (
                                <div key={product.product.id} className={`${Style.cartItem} row align-items-center p-3 mb-3 bg-light rounded-3`}>
                                    {/* Product Image */}
                                    <div className="col-md-2 col-sm-3">
                                        <div className={Style.productImage}>
                                            <img 
                                                src={product.product.imageCover} 
                                                alt={product.product.title}
                                                className="img-fluid rounded-3"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Product Details */}
                                    <div className="col-md-4 col-sm-9">
                                        <h5 className="fw-semibold text-dark mb-2">{product.product.title}</h5>
                                        <p className="text-muted small mb-2">{product.product.category?.name}</p>
                                        <h6 className="text-success fw-bold">{product.price} EGP</h6>
                                    </div>
                                    
                                    {/* Quantity Controls */}
                                    <div className="col-md-3 col-sm-6">
                                        <div className={`${Style.quantityControls} d-flex align-items-center justify-content-center`}>
                                            <button onClick={()=>UpdateItemQuantity(product.product.id, product.count - 1)} className={`${Style.quantityBtn} btn btn-outline-success btn-sm`}>
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span className={`${Style.quantity} mx-3 fw-bold fs-5`}>{product.count}</span>
                                            <button onClick={()=>UpdateItemQuantity(product.product.id, product.count + 1)} className={`${Style.quantityBtn} btn btn-outline-success btn-sm`}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Remove Button */}
                                    <div className="col-md-3 col-sm-6 text-end">
                                        <button onClick={()=>DeletItemCart(product.product.id)} className={`${Style.removeBtn} btn btn-outline-danger btn-sm`}>
                                            <i className="fas fa-trash-can me-2"></i>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Footer */}
                        <div className={`${Style.cartFooter} mt-4 pt-4 border-top`}>
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <button onClick={()=>navigate('/home')} className="btn btn-outline-secondary btn-lg">
                                        <i className="fas fa-arrow-left me-2"></i>
                                        Continue Shopping
                                    </button>
                                </div>
                                <div className="col-md-6 text-end">
                                    <div className="d-flex flex-column align-items-end">
                                        <h5 className="text-muted mb-2">Total: <span className="text-success fw-bold">{Cartdetails.data.totalCartPrice} EGP</span></h5>
                                        <Link to="/Adress"
                                         className="btn btn-success btn-lg px-5">
                                            <i className="fas fa-credit-card me-2"></i>
                                
                                            Proceed to Checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container py-5 text-center">
                    <div className={`${Style.emptyCart} p-5`}>
                        <i className="fas fa-shopping-cart text-muted" style={{fontSize: '4rem'}}></i>
                        <h3 className="text-muted mt-3">Your cart is empty</h3>
                        <p className="text-muted">Add some products to get started!</p>
                        <button onClick={()=>navigate('/home')}  className="btn btn-success btn-lg mt-3">
                            <i className="fas fa-shopping-bag me-2"></i>
                            Start Shopping
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}