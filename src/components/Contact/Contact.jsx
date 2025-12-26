import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendToWhatsApp = (e) => {
        e.preventDefault();
        const message = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
        const whatsappUrl = `https://wa.me/201552703954?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    return (
        <>
            <Helmet>
                <title>Contact Us - FreshCart</title>
                <meta name="description" content="Get in touch with FreshCart" />
            </Helmet>
            
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-5">
                            <h2 className="fw-bold text-dark">
                                <i className="fas fa-envelope text-success me-2"></i>
                                Contact Us
                            </h2>
                            <p className="text-muted">We'd love to hear from you</p>
                        </div>
                        
                        <div className="card shadow-lg border-0">
                            <div className="card-body p-5">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <h5 className="text-success mb-3">Get in Touch</h5>
                                        <div className="mb-3">
                                            <i className="fas fa-phone text-success me-2"></i>
                                            <span>01552703954</span>
                                        </div>
                                        <div className="mb-3">
                                            <i className="fas fa-envelope text-success me-2"></i>
                                            <span>mohamed.adel.011464@gmail.com</span>
                                        </div>
                                        <div className="mb-3">
                                            <i className="fas fa-map-marker-alt text-success me-2"></i>
                                            <span>Cairo, Egypt</span>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <form onSubmit={sendToWhatsApp}>
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <input 
                                                    type="text" 
                                                    name="name"
                                                    className="form-control" 
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    className="form-control" 
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Message</label>
                                                <textarea 
                                                    name="message"
                                                    className="form-control" 
                                                    rows="4"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    required
                                                ></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-success">
                                                <i className="fab fa-whatsapp me-2"></i>
                                                Send to WhatsApp
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}