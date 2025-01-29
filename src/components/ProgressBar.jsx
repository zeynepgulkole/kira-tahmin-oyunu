import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ProgressBar = ({ currentHouse, totalHouses }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="lg:w-full">
      <div className="lg:h-2 bg-gray-200 dark:bg-gray-700 lg:rounded-3xl overflow-hidden flex">
        {Array.from({ length: totalHouses }).map((_, index) => (
          <div
            key={index}
            style={{
              width: `${100 / totalHouses}%`,
              backgroundColor:
                index < currentHouse
                  ? theme === "dark"
                    ? "#3b82f6" // Mavi (Dark Mode)
                    : "#2563eb" // Daha açık mavi (Light Mode)
                  : theme === "dark"
                  ? "#374151" // Koyu gri (Dark Mode)
                  : "#e5e7eb", // Açık gri (Light Mode)
            }}
          ></div>
        ))}
      </div>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
        Ev: {currentHouse}/{totalHouses}
      </p>
    </div>
  );
};

export default ProgressBar;
