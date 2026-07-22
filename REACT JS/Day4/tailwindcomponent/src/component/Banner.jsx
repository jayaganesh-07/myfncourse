import React from 'react'
import Image from '../assets/1.png'
import cardone from '../assets/2.png'
import cardtwo from '../assets/3.png'
import cardthree from '../assets/4.png'
import cardfour from '../assets/5.png'
import cardfive from '../assets/6.png'
import cardsix from '../assets/7.png'


const Banner = () => {
    return (
        <>
            <div>
                <img src={Image} alt="" />
            </div>
        </>
    )
}

export default Banner


export const CardsDisplay = () => {
    return (
        <>

            <div className='p-10'>
                <div className='p-10 bg-fuchsia-300 h-93 flex gap-10 justify-center items-center '>
                    <div className='w-50 h-76 bg-white p-2 rounded-2xl transition-transform duration-400 hover:scale-110'>
                        <img src={cardone} className='w-40' />
                        <h2 > Iphone</h2>
                        <p className='mb-5'> 17e (white,256GB) MRP/-1 Lakhs</p>

                         <button className=' bg-indigo-600 text-center  rounded w-40 text-white p-2 transition-all duration-300 hover:bg-blue-900 hover:scale-105 active:scale-95'>Buy Now</button>
                    </div>
                    <div className='w-50 h-76 bg-white p-2  rounded-2xl transition-transform duration-400 hover:scale-110'>
                        <img src={cardtwo} className='w-40' />
                        <h2 > Iphone</h2>
                        <p className='mb-5'> 17pro Max (Orange,1TB) MRP/-1.75 Lakhs</p>

                        <button className=' bg-indigo-600 text-center  rounded w-40 text-white p-2 transition-all duration-300 hover:bg-blue-900 hover:scale-105 active:scale-95'>Buy Now</button>
                    </div>
                    <div className='w-50 h-76 bg-white p-2  rounded-2xl transition-transform duration-400 hover:scale-110'>
                        <img src={cardthree} className='w-40' />
                        <h2 > Iphone</h2>
                        <p className='mb-5'> 17 Air (Black,256GB) MRP/-1.33 Lakhs</p>

                         <button className=' bg-indigo-600 text-center  rounded w-40 text-white p-2 transition-all duration-300 hover:bg-blue-900 hover:scale-105 active:scale-95'>Buy Now</button>
                    </div>
                    <div className='w-50 h-76 bg-white p-2  rounded-2xl transition-transform duration-400 hover:scale-110'>
                        <img src={cardfour} className='w-40' />
                        <h2 > Iphone</h2>
                        <p className='mb-5'> 17 Air (White,256GB) MRP/-99,000</p>

                         <button className=' bg-indigo-600 text-center  rounded w-40 text-white p-2 transition-all duration-300 hover:bg-blue-900 hover:scale-105 active:scale-95'>Buy Now</button>
                    </div>
                    <div className='w-50 h-76 bg-white p-2  rounded-2xl transition-transform duration-400 hover:scale-110'>
                        <img src={cardfive} className='w-40' />
                        <h2 > Iphone</h2>
                        <p className='mb-5'> 16pro (Blue,256GB) MRP/-1.10 Lakhs</p>

                         <button className=' bg-indigo-600 text-center  rounded w-40 text-white p-2 transition-all duration-300 hover:bg-blue-900 hover:scale-105 active:scale-95'>Buy Now</button>
                    </div>
                    <div className='w-50 h-76 bg-white p-2  rounded-2xl transition-transform duration-400 hover:scale-110'>
                        <img src={cardsix} className='w-40' />
                        <h2 > Iphone</h2>
                        <p className='mb-5'> 16e (Blue,256GB) MRP/-1.16 Lakhs</p>

                        <button className=' bg-indigo-600 text-center  rounded w-40 text-white p-2 transition-all duration-300 hover:bg-blue-900 hover:scale-105 active:scale-95'>Buy Now</button>
                    </div>
                    

                </div>
            </div>

        </>
    )
}