import React, { useState, useEffect } from "react";
import type { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../features/base/house/houseSlice";

type SetHeatLevelAction = React.Dispatch<React.SetStateAction<number>>;

interface BaseMainProps {
  heatLevel: number;
  setHeatLevel: SetHeatLevelAction;
}

// Part of the heat system
const MAX_HEAT = 100;
const MIN_HEAT = 0;

// Add toast notification for the alert

const BaseMain: React.FC<BaseMainProps> = ({ heatLevel, setHeatLevel }) => {
  const houseCount = useSelector((state: RootState) => state.house.value);
  const dispatch = useDispatch();

  const houseBoxes = Array(houseCount)
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        className="border-white border-2 border-solid p-4 justify-center flex"
      >
        <p>House {index + 1}</p>
      </div>
    ));

  const getHeatStatus = () => {
    if (heatLevel > 34) {
      return {
        colorClass: "text-green-500",
        message: "Stable",
      };
    }
    if (heatLevel >= 14) {
      return {
        colorClass: "text-yellow-500",
        message: "Caution",
      };
    }
    return {
      colorClass: "text-red-500 animate-pulse",
      message: "CRITICAL",
    };
  };

  const status = getHeatStatus();

  const handleHouseAdd = () => {
    if (heatLevel === MIN_HEAT) {
      alert("No heating is available to heat new houses");
    } else {
      dispatch(increment());
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
          <p className="text-white text-xl font-bold">Base</p>
          <p
            className={`text-xl font-bold transition duration-300 ${status.colorClass}`}
          >
            Heat Level: {heatLevel}
          </p>

          <p className={`text-sm ${status.colorClass}`}>
            Status: {status.message}
          </p>
        </div>
      </div>
      <div className="items-center justify-center grid grid-cols-4 gap-2">
        {houseBoxes}
      </div>
    </div>
  );
};

export default BaseMain;
