import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { PacmanLoader } from "react-spinners"
import { AddCartContext } from "../Context/AddCartcontext"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"


export default  function FeatureProducts() {

   const [Products,setproduct]=useState([])
   const [isLoading, setIsLoading] = useState(true)
  let {AddCart}= useContext(AddCartContext)

  
  async function Addproduct(productId, product){
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
  
  if (response && response.data && response.data.status==='success'){
    console.log('Also added to API cart');
  } else {
    console.log('Added to local storage only (login required for API cart)');
  }
  
  console.log(response);
  }
   async function Getproducts() {
     setIsLoading(true)
     let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
     console.log('API Response:', data.data[0]) // Check first product structure
     setproduct(data.data)
     setIsLoading(false)
   }
useEffect(()=>{

    Getproducts()
},[])



    if (isLoading) {
        return (
            <div className="container py-5 text-center">
                <div className="d-flex flex-column align-items-center">
                    <PacmanLoader color="#28a745" size={25} />
                    <p className="mt-3 text-muted fw-semibold">Loading Products...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4 text-success">Featured Products</h2>
            <div className="row g-4">
                {Products.map((product)=> 
                    <div key={product._id} className="col-lg-2 col-md-3 col-sm-6">
                        <div className="card h-100 shadow-sm border-0 product-card" style={{
                            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            cursor: 'pointer',
                            overflow: 'hidden'
                        }} onMouseEnter={(e) => {
                            const card = e.target.closest('.card');
                            card.style.transform = 'translateY(-10px) scale(1.02)';
                            card.style.boxShadow = '0 20px 40px rgba(40, 167, 69, 0.2)';
                            card.querySelector('.card-img-top').style.transform = 'scale(1.1)';
                        }} onMouseLeave={(e) => {
                            const card = e.target.closest('.card');
                            card.style.transform = 'translateY(0) scale(1)';
                            card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                            card.querySelector('.card-img-top').style.transform = 'scale(1)';
                        }}>
                            <Link to={`/productdetails/${product._id}`} className="text-decoration-none">
                                <img 
                                    className="card-img-top" 
                                    src={product.imageCover || product.imgCover || product.image || 'https://via.placeholder.com/200x200/28a745/ffffff?text=No+Image'} 
                                    alt={product.title} 
                                    style={{
                                        height: '200px', 
                                        objectFit: 'cover',
                                        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                    }} 
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/200x200/28a745/ffffff?text=No+Image'
                                    }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <span className="text-success small mb-1">{product.category.name}</span>
                                    <h5 className="card-title h6 mb-2 text-dark">{product.title.split(" ").slice(0, 2).join(' ')}</h5>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <span className="fw-bold text-dark">{product.price} EGP</span>
                                        <span className="text-warning">
                                            <i className="fas fa-star"></i>
                                            {product.ratingsAverage}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            <div className="card-body pt-0">
                                <button className="btn btn-success btn-sm w-100" onClick={()=>{Addproduct(product._id, product)}}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}