
import { useEffect, useState } from 'react'
import Style from './Brands.module.css'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'

export default function Brands() {


    let [brands,setbrands]=useState([])

    async function GetBrand(){

        let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        setbrands(data)
    }
useEffect(()=>{

    GetBrand()
},[])
    return<>
   <Helmet>
                        <title>Bands - FreshCart</title>
                        <meta name="description" content="Browse product categories at FreshCart" />
                    </Helmet>
    
        <div className="container py-5">
            <h2 className="text-center mb-5 fw-bold text-success">Our Brands</h2>
            <div className="row g-4">
                {brands?.data?.map((brand)=> (
                    <div key={brand._id} className="col-lg-3 col-md-4 col-sm-6">
                        <a href={`https://${brand.slug}.com`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            <div className={`${Style.brandCard} card h-100 shadow-sm border-0`}>
                                <div className={Style.brandImage}>
                                    <img src={brand.image} alt={brand.name} className="card-img-top" />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-semibold text-dark">{brand.name}</h5>
                                    <p className="text-muted small">{brand.slug}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </>
}

