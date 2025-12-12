import { createSlice } from "@reduxjs/toolkit";

export interface HouseState {
  value: number;
}

const initialState: HouseState = {
  value: 0,
};

export const houseSlice = createSlice({
  name: "houseSlice",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = houseSlice.actions;
export default houseSlice.reducer;
