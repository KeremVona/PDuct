import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HeatLevelState {
  value: number;
}

const initialState: HeatLevelState = {
  value: 50,
};

export const heatLevelSlice = createSlice({
  name: "heatLevelSlice",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement } = heatLevelSlice.actions;
export default heatLevelSlice.reducer;
