import Style from './Adress.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { AddCartContext } from '../Context/AddCartcontext';
import { useNavigate } from 'react-router-dom';

export default function Adress() {
    let {OnlinePament, getlooggedUserCart, CashOnDelivery} = useContext(AddCartContext)
    let [cartId, setCartId] = useState(null)
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        details: Yup.string().required('Details are required').min(10, 'Details must be at least 10 characters'),
        city: Yup.string().required('City is required').min(2, 'City must be at least 2 characters'),
        phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number')
    })

    useEffect(() => {
        async function getCartId() {
            let {data} = await getlooggedUserCart()
            console.log('Cart data:', data);
            if (data && data.data && data.data._id) {
                setCartId(data.data._id)
                console.log('Cart ID set:', data.data._id);
            }
        }
        getCartId()
    }, [])

   async function GetadressSubmit(values) {
        console.log('Submitting with cart ID:', cartId);
        
        // Get current cart items from cart localStorage
        const cartItems = localStorage.getItem('myCartItems');
        
        if (cartId) {
            try {
                let response = await CashOnDelivery(values, cartId)
                console.log('Order response:', response);
                if (response.data && response.data.status === 'success') {
                    // Save cart items to order localStorage only after successful address confirmation
                    if (cartItems) {
                        localStorage.setItem('confirmedOrderItems', cartItems);
                        localStorage.removeItem('myCartItems'); // Clear cart
                    }
                    navigate('/order');
                }
            } catch (error) {
                console.log('Order error:', error.response?.data);
                // If API order fails but we have items, still save to order and proceed
                if (cartItems) {
                    localStorage.setItem('confirmedOrderItems', cartItems);
                    localStorage.removeItem('myCartItems'); // Clear cart
                    navigate('/order');
                }
            }
        } else {
            console.log('No cart ID available, but proceeding with localStorage items');
            // If no cart ID but we have localStorage items, save to order and proceed
            if (cartItems) {
                localStorage.setItem('confirmedOrderItems', cartItems);
                localStorage.removeItem('myCartItems'); // Clear cart
                navigate('/order');
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        validationSchema,
        onSubmit: GetadressSubmit
    })

    return (
        <>
            <Helmet>
                <title>Shipping Address - FreshCart</title>
                <meta name="description" content="Enter your shipping address" />
            </Helmet>
            
            <div className="min-vh-100 d-flex align-items-center bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="card shadow-lg border-0 rounded-lg">
                                <div className="card-header bg-success text-white text-center py-4">
                                    <h3 className="mb-0 fw-bold">
                                        <i className="fas fa-map-marker-alt me-2"></i>
                                        Shipping Address
                                    </h3>
                                    <p className="mb-0 opacity-75">Enter your delivery details</p>
                                </div>
                                
                                <div className="card-body p-5">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="details" className="form-label fw-semibold">
                                                <i className="fas fa-home me-2 text-success"></i>
                                                Address Details
                                            </label>
                                            <textarea
                                                id="details"
                                                name="details"
                                                rows="3"
                                                className={`form-control form-control-lg ${formik.touched.details && formik.errors.details ? 'is-invalid' : ''}`}
                                                placeholder="Enter your full address"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.details}
                                            />
                                            {formik.touched.details && formik.errors.details && (
                                                <div className="invalid-feedback">
                                                    <i className="fas fa-times-circle me-1"></i>
                                                    {formik.errors.details}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="city" className="form-label fw-semibold">
                                                <i className="fas fa-city me-2 text-success"></i>
                                                City
                                            </label>
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                className={`form-control form-control-lg ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
                                                placeholder="Enter your city"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.city}
                                            />
                                            {formik.touched.city && formik.errors.city && (
                                                <div className="invalid-feedback">
                                                    <i className="fas fa-times-circle me-1"></i>
                                                    {formik.errors.city}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="phone" className="form-label fw-semibold">
                                                <i className="fas fa-phone me-2 text-success"></i>
                                                Phone Number
                                            </label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                className={`form-control form-control-lg ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                                                placeholder="01xxxxxxxxx"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.phone}
                                            />
                                            {formik.touched.phone && formik.errors.phone && (
                                                <div className="invalid-feedback">
                                                    <i className="fas fa-times-circle me-1"></i>
                                                    {formik.errors.phone}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="d-grid">
                                            <button 
                                                disabled={!(formik.isValid && formik.dirty)} 
                                                type="submit" 
                                                className="btn btn-success btn-lg py-3"
                                            >
                                                <i className="fas fa-check me-2"></i>
                                                Confirm Address
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}