import React, { useState, useEffect } from "react";

type SetHeatLevelAction = React.Dispatch<React.SetStateAction<number>>;

interface BaseMainProps {
  heatLevel: number;
  setHeatLevel: SetHeatLevelAction;
}

// Configuration for the heat system
const MAX_HEAT = 100;
const MIN_HEAT = 0;

// Add toast notification for the alert

const BaseMain: React.FC<BaseMainProps> = ({ heatLevel, setHeatLevel }) => {
  const [houseCount, setHouseCount] = useState(0);

  const boxes = Array(houseCount)
    .fill(null)
    .map((_, index) => (
      <div className="border-white border-2 border-solid p-4 justify-center flex">
        <p>House {index + 1}</p>
      </div>
    ));

  const handleHouseAdd = () => {
    if (heatLevel === MIN_HEAT) {
      alert("No heating is available to heat new houses");
    } else {
      setHouseCount((prev) => prev + 1);
      setHeatLevel((prev) => Math.max(MIN_HEAT, prev - 1));
    }
  };

  return (
    <div className="border-white border-2 p-2 bg-gray-500 border-solid w-250 h-140">
      <button
        onClick={handleHouseAdd}
        className="bg-gray-400 text-black p-1 rounded-lg"
      >
        add 1 person
      </button>
      <div className="items-center justify-center flex mb-10">
        <div className="border-white border-10 border-solid p-4 text-center ">
          <p className="text-xl font-bold">Base</p>
          <p className="text-lg">Heat Level: {heatLevel}</p>
        </div>
      </div>
      <div className="items-center justify-center grid grid-cols-4 gap-2">
        {boxes}
      </div>
    </div>
  );
};

export default BaseMain;
