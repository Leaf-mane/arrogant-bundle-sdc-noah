import Banner from "./Banner.jsx"
import CurtainModal from "./CurtainModal.jsx"
import Navbar from "./Navbar.jsx"
import Hero from "./AppContent/Hero.jsx"
import ProductDetails from "./AppContent/ProductDetails.jsx"
import ProductDescription from "./AppContent/ProductDescription.jsx"
import CriticalReception from "./AppContent/CriticalReception.jsx"
import PopularCarousel from "./AppContent/PopularCarousel/PopularCarousel.jsx"
import SystemReq from "./AppContent/SystemReq.jsx"
import Footer from "./Footer.jsx"
import ShoppingCartContext from "./ShoppingCartContext/ShoppingCartContext.mjs"
import React, { useState, useEffect, useContext } from "react"
import getProductData from "../api.js"
import { createClient } from '@supabase/supabase-js'
import Bundle from "./Bundle.jsx"
import Store from "./Store.jsx"
import About from "./About.jsx"
import { useSupabase } from './SupabaseContext.jsx';

// TODO put the div containers into their own components
// TODO Context API for all app images and text content?
const App = () => {
    const supabase = useSupabase();
    const {
        cartDisplay,
        bundleDisplay
    } = useContext(ShoppingCartContext)

    const [isLoading, setIsLoading] = useState(true)
    const [sampleProduct, setProductData] = useState({})

    // useEffect(() => {


        setIsLoading(false)


    //get
    useEffect(() => {
        async function fetchProduct() {
            try{
                let { data: productData, error} = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', 2) 
                if(error) {
                    console.log("Yup. Here")
                    throw error;
                }
                console.log(productData[0])
                setProductData(productData[0]);
            } catch (error) {
                console.log("Error down here")
                console.error('Error fetching product:', error)
            }
        }
        fetchProduct();
    }, [supabase])

    if (!isLoading) {
        return (
            <>
                {cartDisplay && <CurtainModal sampleProduct={sampleProduct} setProductData={setProductData} />}
                <Banner />
                <Navbar />
                <div className='body ctn'>
                    <div className="app-content ctn">
                        <Hero sampleProduct={sampleProduct} />
                        <ProductDetails platforms={sampleProduct.platforms} publisher={sampleProduct.publisher} operatingSystems={sampleProduct.operating_systems} links={sampleProduct.links} rating={sampleProduct.rating} />
                        <ProductDescription />
                        <CriticalReception criticalReceptions={sampleProduct.critical_receptions} />
                        <PopularCarousel sampleProduct={sampleProduct}/>
                        <SystemReq systemRequirements={sampleProduct.system_requirements} />
                    </div> {/* end app-content ctn */}
                </div> {/* end body ctn */}
                <Footer />
            </>
        )
    }
}

export default App