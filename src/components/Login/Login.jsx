import Style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import { UserContext } from '../Context/UserContext';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';


export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const{setUsertoken}=useContext(UserContext)
   
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required('Email is required'),
        password: Yup.string().required('Please enter your password')
            .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase")
    })

    async function LoginSubmit(values) {
        setIsLoading(true)
        setError(null)
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            if (data.message === "success") {
                setIsLoading(false)
                localStorage.setItem('usertoken',data.token)
                setUsertoken(data.token)
                
                
                
                navigate("/home")
            }
        } catch (err) {
            setIsLoading(false)
            setError(err.response?.data?.message || "Login failed")
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: LoginSubmit
    })

    return (
        <>
            <Helmet>
                <title>Login - FreshCart</title>
                <meta name="description" content="Sign in to your FreshCart account" />
            </Helmet>
            <div className="min-vh-100 d-flex align-items-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7">
                        <div className="card shadow-lg border-0 rounded-lg">
                            <div className="card-header bg-success text-white text-center py-4">
                                <h3 className="mb-0 fw-bold">
                                    <i className="fas fa-sign-in-alt me-2"></i>
                                    Welcome Back
                                </h3>
                                <p className="mb-0 opacity-75">Sign in to your account</p>
                            </div>
                            
                            <div className="card-body p-5">
                                {error && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <i className="fas fa-exclamation-triangle me-2"></i>
                                        {error}
                                    </div>
                                )}
                                
                                <form onSubmit={formik.handleSubmit}>
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
                                            placeholder="Enter your email"
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
                                    
                                    <div className="mb-4">
                                        <label htmlFor='password' className="form-label fw-semibold">
                                            <i className="fas fa-lock me-2 text-success"></i>
                                            Password
                                        </label>
                                        <input
                                            id='password'
                                            type="password"
                                            name="password"
                                            className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                            placeholder="Enter your password"
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
                                    
                                    <div className="d-grid mb-4">
                                        <button 
                                            disabled={!(formik.isValid && formik.dirty) || isLoading} 
                                            type="submit" 
                                            className="btn btn-success btn-lg py-3"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <PropagateLoader 
                                                        color="#ffffff" 
                                                        size={8} 
                                                        cssOverride={{ display: 'inline-block', marginRight: '8px' }}
                                                    />
                                                    Signing In...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-sign-in-alt me-2"></i>
                                                    Sign In
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            
                            <div className="card-footer bg-light text-center py-4">
                                <div className="small">
                                    <span className="text-muted">Don't have an account? </span>
                                    <Link to={'/register'} className="text-success text-decoration-none fw-semibold">
                                        Create Account
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