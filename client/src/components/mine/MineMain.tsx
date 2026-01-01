import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementWCByAmount } from "../../features/fuel_main/woodSlice";
import {
  decrementWFCount,
  incrementWFCount,
} from "../../features/base/workforce/workforceSlice";
import type { RootState } from "../../app/store";

const MineMain = () => {
  const dispatch = useDispatch();
  const workforceCount = useSelector(
    (state: RootState) => state.workforce.value,
  );

  return (
    <div className="border-solid border-white border-2 p-2 bg-gray-500 w-250 h-140">
      <p className="text-white text-center bg-gray-600 text-xl">Cave</p>
      <div className="text-center mb-2 flex">
        <p className="flex-1/3">Workforce count: {workforceCount}</p>
        <p className="flex-1/3">Using: Pickaxe</p>
        <div className="flex-1/3">
          <label>Using:</label>
        </div>
      </div>
    </div>
  );
};

export default MineMain;
