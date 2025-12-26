import Style from './Notfound.module.css'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function Notfound() {
    return (
        <>
            <Helmet>
                <title>Sign In Required - FreshCart</title>
            </Helmet>
            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="text-center">
                    <div className="mb-4">
                        <i className="fas fa-lock fa-5x text-success mb-4"></i>
                        <h1 className="display-4 fw-bold text-success mb-3">Access Required</h1>
                        <h2 className="h4 text-muted mb-3">Please sign in to continue</h2>
                        <p className="text-muted mb-4">
                            You need to be logged in to access this page and enjoy our fresh products.
                        </p>
                    </div>
                    <div>
                        <Link to="/" className="btn btn-success btn-lg me-3">
                            <i className="fas fa-sign-in-alt me-2"></i>
                            Sign In
                        </Link>
                        <Link to="/register" className="btn btn-outline-success btn-lg">
                            <i className="fas fa-user-plus me-2"></i>
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}