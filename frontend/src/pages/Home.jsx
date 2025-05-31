import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'  
import NewArrivals from '../components/Products/NewArrivals'
import ProductsData from '../components/Products/ProductsData'
import Moreproducts from '../components/Products/Moreproducts'
import FeaturesSection from '../components/Products/FeaturesSection'
import CollectionPage from './MyOrders'



const Home = () => {
  return (
    <div>
        {/* lucid Stores */}
        <Hero />

        {/* Gender Collections */}
        {/* <GenderCollectionSection /> */}
       
       {/* New Arrivals */}
        <NewArrivals />
        <hr />           
        <CollectionPage />
        <hr />

       {/*Best Seller*/}
      {/* <ProductsData /> */}
        {/* <h2 className='text-3xl text-center font-bold mb-4'>
        Best Seller
       </h2> */}

    {/* YOU MAY ALSO LIKE */}

            
    {/* <ProductGrid products={placeholderProducts} /> */}

    <FeaturesSection />
    
    </div>
  )
}

export default Home