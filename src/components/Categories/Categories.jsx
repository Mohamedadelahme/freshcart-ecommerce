import { useEffect, useState } from 'react'
import Style from './Categories.module.css'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import { PacmanLoader } from 'react-spinners'

export default function Categories() {

    let [categories, setCategories] = useState([])
    let [isLoading, setIsLoading] = useState(true)

    async function GetCategories(){
        setIsLoading(true)
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategories(data)
        setIsLoading(false)
    }
    
    useEffect(()=>{
        GetCategories()
    },[])

    if (isLoading) {
        return (
            <>
                <Helmet>
                    <title>Categories - FreshCart</title>
                    <meta name="description" content="Browse product categories at FreshCart" />
                </Helmet>
                <div className="container py-5 text-center">
                    <div className="d-flex flex-column align-items-center">
                        <PacmanLoader color="#28a745" size={25} />
                        <p className="mt-3 text-muted fw-semibold">Loading categories...</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Categories - FreshCart</title>
                <meta name="description" content="Browse product categories at FreshCart" />
            </Helmet>
            
            <div className="container py-5">
                <h2 className="text-center mb-5 fw-bold text-success">Shop by Categories</h2>
                <div className="row g-4">
                    {categories?.data?.map((category)=> (
                        <div key={category._id} className="col-lg-4 col-md-6">
                            <div className={`${Style.categoryCard} card border-0 shadow-sm h-100`}>
                                <div className={Style.categoryImage}>
                                    <img src={category.image} alt={category.name} className="card-img-top" />
                                    <div className={Style.overlay}>
                                        <h4 className="text-white fw-bold">{category.name}</h4>
                                        <p className="text-white-50 mb-0">Explore Products</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}