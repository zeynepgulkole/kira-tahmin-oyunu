import React from "react";

const ProgressBar = ({ currentHouse, totalHouses }) => {
  return (
    <div className="lg:w-full">
      <div className="lg:h-2 bg-gray-200 lg:rounded-3xl overflow-hidden flex">
        {Array.from({ length: totalHouses }).map((_, index) => (
          <div
            key={index}
            style={{
              width: `${100 / totalHouses}%`,
              backgroundColor: index < currentHouse ? "#3b82f6" : "#e5e7eb",
            }}
          ></div>
        ))}
      </div>
      <p className="mt-2 text-center text-sm text-gray-600">
        Ev: {currentHouse}/{totalHouses}
      </p>
    </div>
  );
};

export default ProgressBar;
