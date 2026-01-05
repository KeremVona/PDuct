import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementWCByAmount } from "../../features/fuel_main/woodSlice";
import {
  decrementWFCount,
  incrementWFCount,
} from "../../features/base/workforce/workforceSlice";
import { handleMining } from "../../features/mine_main/ore/oreSlice";
import type { RootState } from "../../app/store";

const MineMain = () => {
  const dispatch = useDispatch();
  const workforceCount = useSelector(
    (state: RootState) => state.workforce.value,
  );
  const ores = useSelector((state: RootState) => state.ore.items);

  const handleMine = (id: number) => {
    const item = ores.find((i) => i.id === id);
    if (workforceCount > 0) {
      dispatch(handleMining(id));
      if (item) {
        if (!item.isBeingMined) {
          dispatch(decrementWFCount());
        } else {
          dispatch(incrementWFCount());
        }
      }
    } else if (item && item.isBeingMined) {
      dispatch(handleMining(id));
      dispatch(incrementWFCount());
    }
  };

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
      <div className="items-center justify-center flex">
        <div className="border-white border-2 border-solid p-4 h-120 w-140">
          <div className="grid grid-cols-3 gap-2">
            {ores.map((ore) => (
              <div key={ore.id}>
                <div
                  onClick={() => handleMine(ore.id)}
                  className="bg-gray-50 text-center"
                >
                  {ore.isBeingMined ? `Mining ${ore.title}` : ore.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MineMain;
