import React, { useState } from "react";
import tree1 from "../../assets/fuel_main/tree 1.svg";
import tree2 from "../../assets/fuel_main/tree 2.svg";
import tree3 from "../../assets/fuel_main/tree 3.svg";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { chopTree } from "../../features/fuel_main/treeSlice";

type TreeFileName = "tree1.svg" | "tree2.svg" | "tree3.svg";

const TREE_PATHS: Record<TreeFileName, string> = {
  "tree1.svg": tree1,
  "tree2.svg": tree2,
  "tree3.svg": tree3,
};

const FuelMain = () => {
  const dispatch = useDispatch();
  const trees = useSelector((state: RootState) => state.tree.trees);

  const handleChop = (treeId: number) => {
    dispatch(chopTree(treeId));
  };
  const [a] = useState(() => {
    const treesArray = Array(20).fill(null);

    return treesArray.map((_, index) => {
      const b = Math.floor(Math.random() * 3);
      return {
        id: index,
        src: trees[b],
      };
    });
  });

  return (
    <div className="border-white border-2 p-2 bg-gray-500 border-solid w-250 h-140">
      <h2 className="text-white text-xl">Fuel</h2>
      <div className="items-center justify-center flex">
        <div className="border-white border-2 border-solid p-4 h-120 w-140">
          <p>Fuel</p>
          <div className="grid grid-cols-8">
            {trees.map((tree) => (
              <img
                key={tree.id}
                src={TREE_PATHS[tree.src]}
                alt={`Tree ${tree.id}`}
                onClick={() => handleChop(tree.id)}
                className={`w-10 h-10 cursor-pointer ${
                  tree.isChopped ? "opacity-30" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelMain;
