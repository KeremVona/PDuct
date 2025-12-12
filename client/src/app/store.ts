import { configureStore } from "@reduxjs/toolkit";
import heatLevelReducer from "../features/base/heat/heatLevelSlice";
import houseReducer from "../features/base/house/houseSlice";
import treeReducer from "../features/fuel_main/treeSlice";

export const store = configureStore({
  reducer: {
    heatLevel: heatLevelReducer,
    house: houseReducer,
    tree: treeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
