import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Keep track of the wood count
// Increment when a tree is chopped
// Decrement when it is used in heating or smelting

export interface WoodState {
  value: number;
}

const initialState: WoodState = {
  value: 0,
};

export const woodSlice = createSlice({
  name: "woodSlice",
  initialState,
  reducers: {
    incrementWC: (state) => {
      state.value += 1;
    },
    decrementWC: (state) => {
      state.value -= 1;
    },
    incrementWCByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { incrementWC, decrementWC, incrementWCByAmount } =
  woodSlice.actions;
export default woodSlice.reducer;
