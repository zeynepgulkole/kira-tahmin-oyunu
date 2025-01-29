import React from "react";
import Slider from "./Slider";

const House = ({ title, images, type, location, year, currentfloor, floor, area, }) => {
  return (
    <div className="lg:w-full bg-[rgb(45,45,45)] rounded-xl">
    <Slider images={images} />
      <h2>{title}</h2>
      <div className="lg:p-4 flex justify-center lg:gap-5 w-full gap-2 p-3 items-center flex-wrap">
        <h2 className="bg-[#161616] rounded-xl lg:text-sm border-black text-xs h-full p-2"> {location}</h2>
        <p className="bg-[#161616] rounded-xl lg:text-sm border-black text-xs h-full p-2">{type}</p>
        <p className="bg-[#161616] rounded-xl lg:text-sm border-black text-xs h-full p-2">{area}</p>

        <p className="bg-[#161616] rounded-xl border-black text-xs h-full p-2">
          <span className="lg:font-medium">{year} yıllık</span>
        </p>
        <p className="bg-[#161616] rounded-xl border-black text-xs h-full p-2">
          <span className="lg:font-medium">{currentfloor}. kat</span>
        </p>
        <p className="bg-[#161616] rounded-xl border-black text-xs h-full p-2">
          <span className="lg:font-medium">{floor} katlı</span>
        </p>
      </div>
    </div>
  );
};

export default House;
