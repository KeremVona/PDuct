import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FurnaceItem {
  id: number;
  title: string;
  currentlySmelting: string;
  fuelSource: string;
  elapsedSmeltTime: number;
  isSmelting: boolean;
  smeltProgress: number;
  progressMultiplier: number;
  smeltSpeed: number;
}

export interface FurnaceSliceState {
  items: FurnaceItem[];
}

const initialState: FurnaceSliceState = {
  items: [],
};

export const furnaceSlice = createSlice({
  name: "furnaceSlice",
  initialState: initialState,
  reducers: {
    smeltTick: (state) => {
      state.items.forEach((item) => {
        if (item.isSmelting) {
          item.smeltProgress += item.progressMultiplier;

          if (item.smeltProgress >= 100) {
            item.smeltProgress = 100;
          }
        }
      });
    },
    handleSmelting: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.isSmelting) {
          item.isSmelting = false;
        } else {
          item.isSmelting = true;
        }
      }
    },
    addFurnace: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { smeltTick, addFurnace } = furnaceSlice.actions;
export default furnaceSlice.reducer;
