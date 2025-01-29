import React, { useState } from "react";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full flex justify-center overflow-hidden rounded-lg lg:pl-20 lg:pr-20 lg:pt-5 lg:pb-5 p-10">
      {/* Resim */}
      <img
        src={images[currentIndex]}
        alt={`Slider Image ${currentIndex + 1}`}
        
      />

      {/* Önceki Düğme */}
      <button
        onClick={handlePrev}
        className="prev_arrow_btn absolute top-1/2 lg:left-5 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 w-10 rounded-full"
      >
        ◀
      </button>

      {/* Sonraki Düğme */}
      <button
        onClick={handleNext}
        className="next_arrow_btn absolute top-1/2 lg:right-5 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 w-10 rounded-full"
      >
        ▶
      </button>
    </div>
  );
};

export default Slider;
