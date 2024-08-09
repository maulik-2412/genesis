// import React from 'react';
import bannerImage from "../assets/banner.jpg";  // Import the large image

const Banner = () => {
  return (
    <div className="w-full h-[91vh] bg-gray-100">
      <div
        className="relative w-full h-full bg-cover"
        style={{ 
          backgroundImage: `url(${bannerImage})`,  // Use the large image
          backgroundSize: 'cover',  // Ensures the image covers the entire container
          backgroundPosition: 'center top',  // Adjust position to show more of the top
          backgroundRepeat: 'no-repeat'  // Prevents image repetition
        }}
      >
        <div className="absolute bottom-8 left-0 right-0 flex justify-center lg:justify-start lg:pl-8">
          <button className="px-10 py-6 bg-gradient-to-r from-de-york to-de-york text-wheat font-bold text-3xl rounded-full shadow-2xl hover:from-salem hover:to-salem transform hover:scale-105 transition-transform duration-300 ease-in-out">
            Find Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;