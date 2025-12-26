//import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';

export default function Register() {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    
    const validationSchema = Yup.object({
        name: Yup.string().max(10, 'Name must be less than 10 characters').min(3, "Name must be more than 3 characters").required("Name is required"),
        email: Yup.string().email("Invalid email").required('Email is required'),
        phone: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone is required"),
        password: Yup.string().required('Please enter your password')
            .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase"),
        rePassword: Yup.string().required('Please confirm your password')
            .oneOf([Yup.ref("password"), null], "Passwords must match")
    })

    async function RegisterSubmit(values) {
        setIsLoading(true)
        setError(null)
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            if (data.message === "success") {
                setIsLoading(false)
                navigate("/login")
            }
        } catch (err) {
            setIsLoading(false)
            setError(err.response?.data?.message || "Registration failed")
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            rePassword: ''
        },
        validationSchema,
        onSubmit: RegisterSubmit
    })

    return (
        <>
            <Helmet>
                <title>Register - FreshCart</title>
                <meta name="description" content="Create your FreshCart account" />
            </Helmet>
            <div className="min-vh-100 d-flex align-items-center bg-light py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <div className="card shadow-lg border-0 rounded-lg">
                            <div className="card-header bg-success text-white text-center py-4">
                                <h3 className="mb-0 fw-bold">
                                    <i className="fas fa-user-plus me-2"></i>
                                    Create Account
                                </h3>
                                <p className="mb-0 opacity-75">Join our community today</p>
                            </div>
                            
                            <div className="card-body p-5">
                                {error && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <i className="fas fa-exclamation-triangle me-2"></i>
                                        {error}
                                    </div>
                                )}
                                
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor='name' className="form-label fw-semibold">
                                                <i className="fas fa-user me-2 text-success"></i>
                                                Full Name
                                            </label>
                                            <input
                                                id='name'
                                                type="text"
                                                name="name"
                                                className={`form-control form-control-lg ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                                placeholder="Enter your full name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.name}
                                            />
                                            {formik.touched.name && formik.errors.name && (
                                                <div className="invalid-feedback">
                                                    <i className="fas fa-times-circle me-1"></i>
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor='phone' className="form-label fw-semibold">
                                                <i className="fas fa-phone me-2 text-success"></i>
                                                Phone Number
                                            </label>
                                            <input
                                                id='phone'
                                                type="tel"
                                                name="phone"
                                                className={`form-control form-control-lg ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                                                placeholder="Enter your phone number"
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
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor='email' className="form-label fw-semibold">
                                            <i className="fas fa-envelope me-2 text-success"></i>
                                            Email Address
                                        </label>
                                        <input
                                            id='email'
                                            type="email"
                                            name="email"
                                            className={`form-control form-control-lg ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                            placeholder="Enter your email address"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="invalid-feedback">
                                                <i className="fas fa-times-circle me-1"></i>
                                                {formik.errors.email}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor='password' className="form-label fw-semibold">
                                                <i className="fas fa-lock me-2 text-success"></i>
                                                Password
                                            </label>
                                            <input
                                                id='password'
                                                type="password"
                                                name="password"
                                                className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                                placeholder="Create a password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                            />
                                            {formik.touched.password && formik.errors.password && (
                                                <div className="invalid-feedback">
                                                    <i className="fas fa-times-circle me-1"></i>
                                                    {formik.errors.password}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor='rePassword' className="form-label fw-semibold">
                                                <i className="fas fa-lock me-2 text-success"></i>
                                                Confirm Password
                                            </label>
                                            <input
                                                id='rePassword'
                                                type="password"
                                                name="rePassword"
                                                className={`form-control form-control-lg ${formik.touched.rePassword && formik.errors.rePassword ? 'is-invalid' : ''}`}
                                                placeholder="Confirm your password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.rePassword}
                                            />
                                            {formik.touched.rePassword && formik.errors.rePassword && (
                                                <div className="invalid-feedback">
                                                    <i className="fas fa-times-circle me-1"></i>
                                                    {formik.errors.rePassword}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="d-grid mb-4">
                                        <button 
                                            disabled={!(formik.isValid && formik.dirty) || isLoading} 
                                            type="submit" 
                                            className="btn btn-success btn-lg py-3"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <PacmanLoader 
                                                        color="#ffffff" 
                                                        size={8} 
                                                        cssOverride={{ display: 'inline-block', marginRight: '8px' }}
                                                    />
                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-user-plus me-2"></i>
                                                    Create Account
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            
                            <div className="card-footer bg-light text-center py-4">
                                <div className="small">
                                    <span className="text-muted">Already have an account? </span>
                                    <Link to={'/login'} className="text-success text-decoration-none fw-semibold">
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}