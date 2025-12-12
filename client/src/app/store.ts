import { configureStore } from "@reduxjs/toolkit";
import heatLevelReducer from "../features/base/heat/heatLevelSlice";

export const store = configureStore({
  reducer: { heatLevel: heatLevelReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
