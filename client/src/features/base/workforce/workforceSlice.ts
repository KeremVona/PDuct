import { createSlice } from "@reduxjs/toolkit";

export interface WorkforceState {
  value: number;
}

const initialState: WorkforceState = {
  value: 0,
};

export const workforceSlice = createSlice({
  name: "workforceSlice",
  initialState,
  reducers: {
    incrementWFCount: (state) => {
      state.value += 1;
    },
    decrementWFCount: (state) => {
      state.value -= 1;
    },
  },
});

export const { incrementWFCount, decrementWFCount } = workforceSlice.actions;
export default workforceSlice.reducer;
