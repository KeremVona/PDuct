import React from "react";
import type { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../features/base/house/houseSlice";
import {
  incrementWFCount,
  decrementWFCount,
} from "../../features/base/workforce/workforceSlice";
import { useToast } from "../ui/toast/ToastProvider";

type SetHeatLevelAction = React.Dispatch<React.SetStateAction<number>>;

interface BaseMainProps {
  heatLevel: number;
  setHeatLevel: SetHeatLevelAction;
}

// Part of the heat system
const MAX_HEAT = 100;
const MIN_HEAT = 0;

// TODO:
// Add workforce
// When a house is added, a person is incremented in the workforce
// Tasks such as chopping trees cost workforce
// After the task is done, the workforce that worked on the task become available in the workforce

const BaseMain: React.FC<BaseMainProps> = ({ heatLevel, setHeatLevel }) => {
  const { addToast } = useToast();
  const dispatch = useDispatch();

  const houseCount = useSelector((state: RootState) => state.house.value);
  const woodCount = useSelector((state: RootState) => state.wood.value);
  const workforceCount = useSelector(
    (state: RootState) => state.workforce.value,
  );

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
      addToast("No heating is available to heat new houses", "error");
    } else {
      dispatch(increment());
      dispatch(incrementWFCount());
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
        <div className="border-white border-10 border-solid p-4 text-center ml-2">
          <p className="text-white text-xl font-bold">Wood Storage</p>
          <p className="text-xl font-bold transition duration-300">
            Wood Count: {woodCount}
          </p>
        </div>
        <div className="border-white border-10 border-solid p-4 text-center ml-2">
          <p className="text-white text-xl font-bold">Workforce</p>
          <p className="text-xl font-bold transition duration-300">
            Workforce count: {workforceCount}
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
