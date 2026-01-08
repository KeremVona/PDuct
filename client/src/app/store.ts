import { configureStore } from "@reduxjs/toolkit";
import heatLevelReducer from "../features/base/heat/heatLevelSlice";
import houseReducer from "../features/base/house/houseSlice";
import treeReducer from "../features/fuel_main/treeSlice";
import woodReducer from "../features/fuel_main/woodSlice";
import workforceReducer from "../features/base/workforce/workforceSlice.ts";
import researchReducer from "../features/base/research/researchSlice.ts";
import oreReducer from "../features/mine_main/ore/oreSlice.ts";
import furnaceReducer from "../features/base/furnace/furnaceSlice.ts";

export const store = configureStore({
  reducer: {
    heatLevel: heatLevelReducer,
    house: houseReducer,
    tree: treeReducer,
    wood: woodReducer,
    workforce: workforceReducer,
    research: researchReducer,
    ore: oreReducer,
    furnace: furnaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
