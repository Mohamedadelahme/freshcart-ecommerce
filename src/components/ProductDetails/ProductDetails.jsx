import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { PacmanLoader } from 'react-spinners'
import { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { AddCartContext } from '../Context/AddCartcontext'
import toast from "react-hot-toast"


export default function ProductDetails() {
    const { id } = useParams()
    const [mainImage, setMainImage] = useState('')
      let{AddCart}= useContext(AddCartContext)


       async function addProduct(productId){
        let {data}=await AddCart(productId)
        if (data.status==='success'){
            toast('Product added to cart successfully!', { duration: 3000, position: 'top-center', type: 'success' })

        }else{
            toast('Failed to add product to cart.', { duration: 3000, position: 'top-center', type: 'error' })
        }
        
       }

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: async () => {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            return data.data
        },
        onSuccess: (data) => {
            setMainImage(data.imageCover)
        }
    })

    if (isLoading) {
        return (
            <div className="container py-5 text-center">
                <PacmanLoader color="#28a745" size={25} />
                <p className="mt-3 text-muted">Loading Product Details...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-5 text-center">
                <h3 className="text-danger">Error loading product details</h3>
            </div>
        )
    }

    return (
        <div className="container py-5">
            <Helmet>
                <title>{product.title} - FreshCart</title>
                <meta name="description" content={product.description} />
            </Helmet>
            <div className="row g-5">
                {/* Product Images */}
                <div className="col-lg-6">
                    <div className="position-sticky" style={{top: '100px'}}>
                        <img 
                            src={mainImage || product.imageCover} 
                            alt={product.title}
                            className="w-100 rounded-3 shadow-lg mb-3"
                            style={{height: '500px', objectFit: 'cover', transition: 'opacity 0.3s ease'}}
                        />
                       
                        {product.images && product.images.length > 0 && (
                            <div className="d-flex gap-2 overflow-auto">
                                <img 
                                    src={product.imageCover}
                                    alt="Main"
                                    className={`rounded-2 border ${mainImage === product.imageCover ? 'border-success border-3' : ''}`}
                                    style={{width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer', transition: 'border-color 0.3s ease'}}
                                    onMouseEnter={() => setMainImage(product.imageCover)}
                                />
                                {product.images.slice(0, 4).map((img, index) => (
                                    <img 
                                        key={index}
                                        src={img}
                                        alt={`Product ${index + 1}`}
                                        className={`rounded-2 border ${mainImage === img ? 'border-success border-3' : ''}`}
                                        style={{width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer', transition: 'border-color 0.3s ease'}}
                                        onMouseEnter={() => setMainImage(img)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Product Details */}
                <div className="col-lg-6">
                    {/* Breadcrumb */}
                    <nav className="mb-3">
                        <span className="text-success fw-semibold text-uppercase small">
                            <i className="fas fa-tag me-1"></i>
                            {product.category?.name}
                        </span>
                        {product.subcategory && (
                            <span className="text-muted ms-2">/ {product.subcategory[0]?.name}</span>
                        )}
                    </nav>
                    
                    {/* Title & Brand */}
                    <h1 className="display-6 fw-bold mb-2">{product.title}</h1>
                    {product.brand && (
                        <p className="text-muted mb-3">
                            <i className="fas fa-copyright me-1"></i>
                            Brand: <span className="fw-semibold">{product.brand.name}</span>
                        </p>
                    )}
                    
                    {/* Rating & Reviews */}
                    <div className="d-flex align-items-center mb-4">
                        <div className="text-warning me-2">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fas fa-star ${i < Math.floor(product.ratingsAverage) ? '' : 'text-muted'}`}></i>
                            ))}
                        </div>
                        <span className="text-muted">
                            {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                        </span>
                    </div>
                    
                    {/* Price & Availability */}
                    <div className="bg-light rounded-3 p-4 mb-4">
                        <div className="row">
                            <div className="col-6">
                                <h4 className="text-success fw-bold mb-1">{product.price} EGP</h4>
                                <small className="text-muted">Price per unit</small>
                            </div>
                            <div className="col-6 text-end">
                                <span className="badge bg-success fs-6">
                                    <i className="fas fa-check me-1"></i>
                                    In Stock
                                </span>
                                <br />
                                <small className="text-muted">Quantity: {product.quantity || 'Available'}</small>
                            </div>
                        </div>
                    </div>
                    
                    {/* Description */}
                    <div className="mb-4">
                        <h5 className="fw-bold mb-2">Description</h5>
                        <p className="text-muted lh-lg">{product.description}</p>
                    </div>
                    
                    {/* Product Specifications */}
                    <div className="mb-4">
                        <h5 className="fw-bold mb-3">Product Details</h5>
                        <div className="row g-3">
                            <div className="col-6">
                                <div className="border rounded p-3 h-100">
                                    <i className="fas fa-box text-success mb-2"></i>
                                    <h6 className="mb-1">Product ID</h6>
                                    <small className="text-muted">{product._id?.slice(-8)}</small>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="border rounded p-3 h-100">
                                    <i className="fas fa-calendar text-success mb-2"></i>
                                    <h6 className="mb-1">Added Date</h6>
                                    <small className="text-muted">{new Date(product.createdAt).toLocaleDateString()}</small>
                                </div>
                            </div>
                            {product.sold && (
                                <div className="col-6">
                                    <div className="border rounded p-3 h-100">
                                        <i className="fas fa-shopping-bag text-success mb-2"></i>
                                        <h6 className="mb-1">Units Sold</h6>
                                        <small className="text-muted">{product.sold} units</small>
                                    </div>
                                </div>
                            )}
                            <div className="col-6">
                                <div className="border rounded p-3 h-100">
                                    <i className="fas fa-truck text-success mb-2"></i>
                                    <h6 className="mb-1">Shipping</h6>
                                    <small className="text-muted">Free delivery</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="d-grid gap-2">
                        <button onClick={()=>{addProduct(product._id)}} className="btn btn-success btn-lg py-3">
                            <i className="fas fa-shopping-cart me-2"></i>
                            Add to Cart
                        </button>
                        <div className="row g-2">
                            <div className="col-6">
                                <button className="btn btn-outline-danger w-100">
                                    <i className="fas fa-heart me-1"></i>
                                    Wishlist
                                </button>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-outline-info w-100">
                                    <i className="fas fa-share me-1"></i>
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="mt-4 p-3 bg-light rounded">
                        <div className="row text-center">
                            <div className="col-4">
                                <i className="fas fa-shield-alt text-success fs-4 mb-2 d-block"></i>
                                <small className="text-muted">Secure Payment</small>
                            </div>
                            <div className="col-4">
                                <i className="fas fa-undo text-success fs-4 mb-2 d-block"></i>
                                <small className="text-muted">Easy Returns</small>
                            </div>
                            <div className="col-4">
                                <i className="fas fa-headset text-success fs-4 mb-2 d-block"></i>
                                <small className="text-muted">24/7 Support</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}