import slider1 from '../../assets/images/slider-2.jpeg'
import slider2 from '../../assets/images/slider-image-1.jpeg'
import slider3 from '../../assets/images/slider-image-2.jpeg'

export default function MainSlider() {
    return (
        <div className="container my-4">
            <div 
                id="mainCarousel" 
                className="carousel slide carousel-fade shadow-lg" 
                data-bs-ride="carousel"
                data-bs-interval="5000"
                style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                }}
            >
                <div className="carousel-indicators" style={{bottom: '20px'}}>
                    <button 
                        type="button" 
                        data-bs-target="#mainCarousel" 
                        data-bs-slide-to="0" 
                        className="active"
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            margin: '0 5px',
                            backgroundColor: '#28a745'
                        }}
                    ></button>
                    <button 
                        type="button" 
                        data-bs-target="#mainCarousel" 
                        data-bs-slide-to="1"
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            margin: '0 5px',
                            backgroundColor: '#28a745'
                        }}
                    ></button>
                    <button 
                        type="button" 
                        data-bs-target="#mainCarousel" 
                        data-bs-slide-to="2"
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            margin: '0 5px',
                            backgroundColor: '#28a745'
                        }}
                    ></button>
                </div>
                
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img 
                            src={slider1} 
                            className="d-block w-100" 
                            alt="Slider 1"
                            style={{
                                height: '500px', 
                                objectFit: 'cover',
                                filter: 'brightness(0.9)'
                            }}
                        />
                        <div className="carousel-caption d-none d-md-block" style={{bottom: '60px'}}>
                            <h3 className="fw-bold text-white mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>Fresh Products</h3>
                            <p className="text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>Quality groceries delivered fresh</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img 
                            src={slider2} 
                            className="d-block w-100" 
                            alt="Slider 2"
                            style={{
                                height: '500px', 
                                objectFit: 'cover',
                                filter: 'brightness(0.9)'
                            }}
                        />
                        <div className="carousel-caption d-none d-md-block" style={{bottom: '60px'}}>
                            <h3 className="fw-bold text-white mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>Best Deals</h3>
                            <p className="text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>Amazing prices on your favorites</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img 
                            src={slider3} 
                            className="d-block w-100" 
                            alt="Slider 3"
                            style={{
                                height: '500px', 
                                objectFit: 'cover',
                                filter: 'brightness(0.9)'
                            }}
                        />
                        <div className="carousel-caption d-none d-md-block" style={{bottom: '60px'}}>
                            <h3 className="fw-bold text-white mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>Fast Delivery</h3>
                            <p className="text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>Quick delivery to your door</p>
                        </div>
                    </div>
                </div>
                
                <button 
                    className="carousel-control-prev" 
                    type="button" 
                    data-bs-target="#mainCarousel" 
                    data-bs-slide="prev"
                    style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'rgba(40, 167, 69, 0.8)',
                        borderRadius: '50%',
                        border: 'none',
                        left: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                >
                    <span className="carousel-control-prev-icon" style={{filter: 'brightness(0) invert(1)'}}></span>
                </button>
                <button 
                    className="carousel-control-next" 
                    type="button" 
                    data-bs-target="#mainCarousel" 
                    data-bs-slide="next"
                    style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'rgba(40, 167, 69, 0.8)',
                        borderRadius: '50%',
                        border: 'none',
                        right: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                >
                    <span className="carousel-control-next-icon" style={{filter: 'brightness(0) invert(1)'}}></span>
                </button>
            </div>
        </div>
    )
}