
import { Helmet } from 'react-helmet-async'
import CategorySlider from '../CategorySlider/CategorySlider'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import Style from './Home.module.css'



export default function Home() {
    


    
    return<>
         <Helmet>
                        <title>Home - FreshCart</title>
                        <meta name="description" content="Fresh market for online shopping" />
                    </Helmet>
    <MainSlider/>
    <CategorySlider/>
    <FeatureProducts/>

    </>
}

 