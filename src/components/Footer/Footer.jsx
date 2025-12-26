
export default function Footer() {
    return (
        <footer className="bg-light text-dark py-2 mt-auto w-100 border-top">
            <div className="container-fluid px-3">
                {/* Mobile Layout */}
                <div className="d-block d-md-none text-center">
                    <div className="mb-2">
                        <span className="text-success fw-bold fs-6">FreshCart</span>
                    </div>
                    <div className="d-flex justify-content-center gap-4 mb-2">
                        <a href="#" className="text-dark fs-5">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="text-dark fs-5">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-dark fs-5">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                    <div className="small text-muted lh-sm">
                        <div>© 2024 All rights reserved</div>
                        <div>Developed by Mohamed Adel</div>
                    </div>
                </div>
                
                {/* Desktop Layout */}
                <div className="d-none d-md-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-success fw-bold">FreshCart</span>
                        <span className="text-muted small">© 2024 All rights reserved | Developed by Mohamed Adel</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="d-flex gap-2">
                            <a href="#" className="text-dark">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" className="text-dark">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-dark">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                        <div className="d-flex gap-2 small">
                            <a href="#" className="text-muted text-decoration-none">Privacy</a>
                            <span className="text-muted">|</span>
                            <a href="#" className="text-muted text-decoration-none">Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

