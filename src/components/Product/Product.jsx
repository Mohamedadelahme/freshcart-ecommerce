import { useContext, useEffect, useState } from 'react'
import Style from './Product.module.css'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import { PacmanLoader } from 'react-spinners'
import { AddCartContext } from '../Context/AddCartcontext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Product() {

    let [products, setProducts] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    let {AddCart} = useContext(AddCartContext)

    async function GetProducts(){
        setIsLoading(true)
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        setProducts(data.data)
        setIsLoading(false)
    }

    async function AddProductToCart(productId, product){
        let response = await AddCart(productId)
        
        // Always save to localStorage regardless of API response
        const savedItems = JSON.parse(localStorage.getItem('myCartItems') || '[]');
        const newItem = {
            id: product._id,
            title: product.title,
            price: product.price,
            imageCover: product.imageCover,
            category: product.category
        };
        if (!savedItems.find(item => item.id === product._id)) {
            savedItems.push(newItem);
            localStorage.setItem('myCartItems', JSON.stringify(savedItems));
            toast('Product added to your list!', { duration: 3000, position: 'top-center', type: 'success' })
        }
        
        if (response && response.data && response.data.status === 'success'){
            console.log('Also added to API cart');
        } else {
            console.log('Added to local storage only (login required for API cart)');
        }
    }
    
    useEffect(()=>{
        GetProducts()
    },[])

    if (isLoading) {
        return (
            <>
                <Helmet>
                    <title>Products - FreshCart</title>
                    <meta name="description" content="Browse all products at FreshCart" />
                </Helmet>
                <div className="container py-5 text-center">
                    <div className="d-flex flex-column align-items-center">
                        <PacmanLoader color="#28a745" size={25} />
                        <p className="mt-3 text-muted fw-semibold">Loading products...</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Products - FreshCart</title>
                <meta name="description" content="Browse all products at FreshCart" />
            </Helmet>
            
            <div className="container py-5">
                <h2 className="text-center mb-5 fw-bold text-success">All Products</h2>
                <div className="row g-4">
                    {products?.map((product)=> (
                        <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
                            <div className={`${Style.productCard} card h-100 shadow-sm border-0`}>
                                <Link to={`/productdetails/${product._id}`} className="text-decoration-none">
                                    <div className={Style.productImage}>
                                        <img src={product.imageCover} alt={product.title} className="card-img-top" />
                                        <div className={Style.badge}>
                                            <i className="fas fa-star text-warning"></i>
                                            {product.ratingsAverage}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <span className="text-success small mb-1">{product.category.name}</span>
                                        <h5 className="card-title h6 mb-2 text-dark">{product.title.split(" ").slice(0, 2).join(' ')}</h5>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-bold text-dark">{product.price} EGP</span>
                                        </div>
                                    </div>
                                </Link>
                                <div className="card-body pt-0">
                                    <button onClick={()=>AddProductToCart(product._id, product)} className="btn btn-success btn-sm w-100">
                                        <i className="fas fa-cart-plus me-2"></i>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}