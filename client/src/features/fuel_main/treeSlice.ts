import { createSlice } from "@reduxjs/toolkit";

export type TreeFileName = "tree1.svg" | "tree2.svg" | "tree3.svg";

export interface Tree {
  id: number;
  src: TreeFileName;
  isChopped: boolean;
}

interface TreeState {
  trees: Tree[];
  woodCount: number;
}

const a = (id: number): Tree => {
  const availableTrees: TreeFileName[] = [
    "tree1.svg",
    "tree2.svg",
    "tree3.svg",
  ];
  const b = Math.floor(Math.random() * availableTrees.length);
  return {
    id: id,
    src: availableTrees[b],
    isChopped: false,
  };
};

const initialState = () => {
  const availableTrees = ["tree1.svg", "tree2.svg", "tree3.svg"];
  const initialTrees = Array(20)
    .fill(null)
    .map((_, index) => a(index));
  return {
    trees: initialTrees,
    woodCount: 0,
  };
};

const treeSlice = createSlice({
  name: "tree",
  initialState: initialState(),
  reducers: {
    chopTree: (state, action) => {
      const treeId = action.payload;
      const tree = state.trees.find((t) => t.id === treeId);
      if (tree && !tree.isChopped) {
        tree.isChopped = true;
        state.woodCount += 1;
      }
    },
    addTree: (state, action) => {
      const newId = state.trees.length;
      const availableTrees = ["tree1.svg", "tree2.svg", "tree3.svg"];
      const newTree = a(newId);
      state.trees.push(newTree);
    },
  },
});

export const { chopTree, addTree } = treeSlice.actions;
export default treeSlice.reducer;
