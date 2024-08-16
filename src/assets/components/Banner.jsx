import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    const [autoPlay, setAutoPlay] = useState(true);

    const handleSlideChange = (index) => {
        if (index === 3) {
            setAutoPlay(false);
        }
    };

    return (
        <div className='font-serif'>
            <Carousel
                autoPlay={autoPlay}
                infiniteLoop
                interval={3000}
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                onChange={handleSlideChange}
            >
                <div className="relative">
                    <img className="w-full h-[600px] object-cover"src="https://images.unsplash.com/photo-1550814684-6be34493c652?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Banner 1" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center">
                        <h2 className="text-5xl font-bold text-white drop-shadow-lg">Welcome to CarSphere</h2>
                        <p className="mt-2 text-lg text-gray-200">Explore the best cars for every road and adventure.</p>
                    </div>
                </div>
                <div className="relative">
                    <img className="w-full h-[600px] object-cover" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D" alt="Banner 2" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center">
                        <h2 className="text-4xl font-bold text-white drop-shadow-lg">Find Your Perfect Ride</h2>
                        <p className="mt-2 text-lg text-gray-200">From city streets to off-road trails, we've got you covered.</p>
                    </div>
                </div>
                <div className="relative">
                    <img className="w-full h-[600px] object-cover" src="https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D" alt="Banner 3" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center">
                        <h2 className="text-4xl font-bold text-white drop-shadow-lg">Unleash Your Drive</h2>
                        <p className="mt-2 text-lg text-gray-200">Discover cars that match your lifestyle and needs.</p>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
