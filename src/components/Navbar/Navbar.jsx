import { Link, useNavigate} from 'react-router-dom'
import img from '../../assets/images/freshcart-logo.svg'
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext'

export default function Navbar() {
    const{Usertoken,setUsertoken}=useContext(UserContext)
    let Navigate=useNavigate()

    function logout(){
        localStorage.removeItem('usertoken')
        setUsertoken(null)
        Navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">
                <Link className="navbar-brand fw-bold text-success" to="/">
                    <img src={img} width={100} alt="fresh market" />
                </Link> 
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {Usertoken !== null ? (
                        <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="cart">Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="brands">Brands</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="categories">Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="product">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="contact">Contact</Link>
                                </li>
                            </ul>
                            
                            <ul className="navbar-nav align-items-center">
                                <li className="nav-item me-3">
                                    <Link to="/order" className="btn btn-outline-success btn-sm rounded-pill px-3 py-2 text-decoration-none">
                                        <i className="fas fa-receipt me-2"></i>
                                        <span className="d-none d-md-inline">My Orders</span>
                                    </Link>
                                </li>
                                <li className="nav-item me-3">
                                    <div className="d-flex">
                                        <i className="fab fa-facebook text-primary mx-2 fs-5"></i>
                                        <i className="fab fa-twitter text-info mx-2 fs-5"></i>
                                        <i className="fab fa-youtube text-danger mx-2 fs-5"></i>
                                        <i className="fab fa-whatsapp text-success mx-2 fs-5"></i>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="register">Register</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    )
}