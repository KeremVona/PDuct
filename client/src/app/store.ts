import { configureStore } from "@reduxjs/toolkit";
import heatLevelReducer from "../features/base/heat/heatLevelSlice";
import houseReducer from "../features/base/house/houseSlice";

export const store = configureStore({
  reducer: { heatLevel: heatLevelReducer, house: houseReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
