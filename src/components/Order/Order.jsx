import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AddCartContext } from '../Context/AddCartcontext';
import { PacmanLoader } from 'react-spinners';
import toast from 'react-hot-toast';

export default function Order() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get items from localStorage that were confirmed after address submission
        const confirmedItems = localStorage.getItem('confirmedOrderItems');
        console.log('Confirmed order items from localStorage:', confirmedItems);
        if (confirmedItems) {
            setCartItems(JSON.parse(confirmedItems));
        }
        setIsLoading(false);
    }, []);

    // Listen for storage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const confirmedItems = localStorage.getItem('confirmedOrderItems');
            if (confirmedItems) {
                setCartItems(JSON.parse(confirmedItems));
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const removeItem = (productId) => {
        const updatedItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedItems);
        localStorage.setItem('confirmedOrderItems', JSON.stringify(updatedItems));
        toast('Item removed successfully!', { duration: 3000, position: 'top-center', type: 'success' });
    };

    const clearAll = () => {
        if(window.confirm('Are you sure you want to clear all items?')) {
            setCartItems([]);
            localStorage.removeItem('confirmedOrderItems');
            toast('All items cleared!', { duration: 3000, position: 'top-center', type: 'success' });
        }
    };

    if (isLoading) {
        return (
            <>
                <Helmet>
                    <title>My Cart Items - FreshCart</title>
                </Helmet>
                <div className="container py-5 text-center">
                    <PacmanLoader color="#28a745" size={25} />
                    <p className="mt-3 text-muted">Loading your items...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>My Cart Items - FreshCart</title>
                <meta name="description" content="View your selected cart items" />
            </Helmet>
            
            <div className="container py-5">
                <h2 className="fw-bold text-dark mb-4">
                    <i className="fas fa-shopping-cart text-success me-2"></i>
                    My Selected Items
                </h2>
                
                {cartItems.length > 0 && (
                    <div className="mb-4">
                        <button onClick={clearAll} className="btn btn-danger">
                            <i className="fas fa-trash me-2"></i>
                            Clear All Items
                        </button>
                    </div>
                )}
                
                {cartItems.length > 0 ? (
                    <div className="row">
                        {cartItems.map((item, index) => (
                            <div key={index} className="col-md-6 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <img 
                                                src={item.imageCover} 
                                                alt={item.title} 
                                                className="img-fluid rounded" 
                                                style={{width: '80px', height: '80px'}} 
                                            />
                                            <div className="ms-3 flex-grow-1">
                                                <h5 className="mb-1">{item.title}</h5>
                                                <p className="text-muted mb-1">{item.category?.name}</p>
                                                <p className="text-success fw-bold mb-1">{item.price} EGP</p>
                                            </div>
                                            <button 
                                                onClick={() => removeItem(item.id)}
                                                className="btn btn-outline-danger btn-sm"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <i className="fas fa-shopping-cart text-muted" style={{fontSize: '4rem'}}></i>
                        <h3 className="text-muted mt-3">No items in cart</h3>
                        <button onClick={() => navigate('/home')} className="btn btn-success mt-3">
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}