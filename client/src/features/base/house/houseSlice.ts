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
    incrementHC: (state) => {
      state.value += 1;
    },
    decrementHC: (state) => {
      state.value -= 1;
    },
  },
});

export const { incrementHC, decrementHC } = houseSlice.actions;
export default houseSlice.reducer;
