import React, { useRef, useState, useEffect } from "react";
import type { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { incrementHC } from "../../features/base/house/houseSlice";
import {
  incrementWFCount,
  decrementWFCount,
} from "../../features/base/workforce/workforceSlice";
import { useToast } from "../ui/toast/ToastProvider";
import { decrementWC } from "../../features/fuel_main/woodSlice";
import house1 from "../../assets/base_main/house 1.svg";

type SetHeatLevelAction = React.Dispatch<React.SetStateAction<number>>;

interface BaseMainProps {
  heatLevel: number;
  setHeatLevel: SetHeatLevelAction;
}

// Part of the heat system
const MAX_HEAT = 100;
const MIN_HEAT = 0;

const BaseMain: React.FC<BaseMainProps> = ({ heatLevel, setHeatLevel }) => {
  const [isBuildingHouse, setIsBuildingHouse] = useState(false);
  const [isCurrentlyResearching, setIsCurrentlyResearching] = useState(false);

  const { addToast } = useToast();
  const dispatch = useDispatch();
  const lastHeatLevelRef = useRef(heatLevel);

  const houseCount = useSelector((state: RootState) => state.house.value);
  const woodCount = useSelector((state: RootState) => state.wood.value);
  const workforceCount = useSelector(
    (state: RootState) => state.workforce.value,
  );

  const houseBoxes = Array(houseCount)
    .fill(null)
    .map((_, index) => <img key={index} src={house1} className="w-6 h-6" />);

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
      addToast("No heating is available to heat new houses", "error");
    } else {
      setIsBuildingHouse(true);
      setTimeout(() => {
        dispatch(incrementHC());
        dispatch(incrementWFCount());
        setHeatLevel((prev) => Math.max(MIN_HEAT, prev - 1));
        setIsBuildingHouse(false);
      }, 2000);
    }
  };

  const handleHeat = () => {
    if (woodCount == 0) {
      addToast("No wood available", "error");
      return;
    }
    dispatch(decrementWC());
    setHeatLevel((prev) => prev + 1);
  };

  useEffect(() => {
    lastHeatLevelRef.current = heatLevel;
  }, [heatLevel]);

  const lastHeatLevel = lastHeatLevelRef.current;

  return (
    <div className="border-white border-2 p-2 bg-gray-500 border-solid w-250 h-140">
      <button
        onClick={handleHouseAdd}
        className="bg-gray-400 text-black p-1 rounded-lg"
      >
        add 1 person
      </button>
      <div className="items-center justify-center grid mb-10 grid-cols-3">
        <div className="border-white border-10 border-solid p-4 text-center ">
          <p className="text-white text-xl font-bold">Base</p>
          <div className="relative inline-block">
            <p
              key={heatLevel}
              className={`text-xl font-bold animate-numberPop ${status.colorClass}`}
            >
              Heat Level: {heatLevel}
            </p>
            {heatLevel !== lastHeatLevel && (
              <span
                key={`diff-${heatLevel}`}
                className={`absolute -right-10 top-0 text-sm font-bold animate-fade-out-up 
        ${heatLevel > lastHeatLevel ? "text-green-400" : "text-red-400"}`}
              >
                {heatLevel > lastHeatLevel
                  ? `+${heatLevel - lastHeatLevel}`
                  : heatLevel - lastHeatLevel}
              </span>
            )}
          </div>
          <p className={`text-sm ${status.colorClass}`}>
            Status: {status.message}
          </p>
        </div>
        <div className="border-white border-10 border-solid p-4 text-center ml-2">
          <p className="text-white text-xl font-bold">Wood Storage</p>
          <p className="text-xl font-bold transition duration-300">
            Wood Count: {woodCount}
          </p>
          <button
            onClick={handleHeat}
            className="bg-gray-400 text-black p-1 rounded-lg"
          >
            Heat
          </button>
        </div>
        <div className="border-white border-10 border-solid p-4 text-center ml-2">
          <p className="text-white text-xl font-bold">Workforce</p>
          <p className="text-xl font-bold transition duration-300">
            Workforce count: {workforceCount}
          </p>
        </div>
        <div className="border-white border-10 border-solid p-4 text-center ml-2">
          <p className="text-white text-xl font-bold">Research Center</p>
          <p className="text-xl font-bold transition duration-300">
            Currently researching: {0}
          </p>
        </div>
      </div>
      {isBuildingHouse && (
        <div className="items-center justify-center grid grid-cols-4 gap-2">
          <p>Building house...</p>
        </div>
      )}
      <div className="items-center justify-center grid grid-cols-4 gap-2">
        {houseBoxes}
      </div>
    </div>
  );
};

export default BaseMain;
