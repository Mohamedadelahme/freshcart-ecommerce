import axios from "axios"
import { useEffect, useState } from "react"

export default function CategorySlider() {
    const [categories, setCategories] = useState([])

    async function getCategories() {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategories(data.data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="container py-4">
            <h3 className="text-success mb-3">Shop by Category</h3>
            <div id="categoryCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {categories.map((category, index) => (
                        <div key={category._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="row">
                                {categories.slice(index, index + 6).map((cat) => (
                                    <div key={cat._id} className="col-2">
                                        <div className="text-center">
                                            <img 
                                                src={cat.image || 'https://via.placeholder.com/150x150/28a745/ffffff?text=Category'} 
                                                alt={cat.name}
                                                className="w-100 rounded-circle"
                                                style={{height: '150px', objectFit: 'cover'}}
                                            />
                                            <h6 className="mt-2 small">{cat.name}</h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                
                <button className="carousel-control-prev" type="button" data-bs-target="#categoryCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-success rounded-circle"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#categoryCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-success rounded-circle"></span>
                </button>
            </div>
        </div>
    )
}