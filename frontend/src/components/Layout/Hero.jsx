import React from 'react'
import { Link } from 'react-router-dom';
import heroImg from "../../assets/ecommes.jpg";

const Hero = () => {
  return (
    <section className='relative'>
        <img src={heroImg} alt="hero" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' />
   
   
    <div className='absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center'>
        <div className='text-center text-white p-6'> 
            <h1 className='text-4xl md:text-9xl font-bold tracking-tighter-tighter uppercase mb-4'>
                Lucid Stores <br />  <small className='md:hidden'>Ready For Purchase</small>
            </h1>
            <p className='text-sm tracking-tighter md:text-lg mb-6'>
                Discover the best products <br /> at unbeatable prices.
                <br /> Shop now and save big!
            </p>
            <Link to="#" className="bg-white text-gray-950 px-6 py-2 round-sm text-l hover:bg-black hover:text-white transition-colors duration-300">
            Shop Now
            </Link>
        </div>
    </div>
    </section>
  )
}

export default Hero