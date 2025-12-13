import React, { useState } from "react";
import tree1 from "../../assets/fuel_main/tree 1.svg";
import tree2 from "../../assets/fuel_main/tree 2.svg";
import tree3 from "../../assets/fuel_main/tree 3.svg";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { chopTree } from "../../features/fuel_main/treeSlice";
import { useToast } from "../ui/toast/ToastProvider";

type TreeFileName = "tree1.svg" | "tree2.svg" | "tree3.svg";

const TREE_PATHS: Record<TreeFileName, string> = {
  "tree1.svg": tree1,
  "tree2.svg": tree2,
  "tree3.svg": tree3,
};

type SetHeatLevelAction = React.Dispatch<React.SetStateAction<number>>;

interface FuelMainProps {
  heatLevel: number;
  setHeatLevel: SetHeatLevelAction;
}

const FuelMain: React.FC<FuelMainProps> = ({ heatLevel, setHeatLevel }) => {
  const { addToast } = useToast();
  const dispatch = useDispatch();
  const trees = useSelector((state: RootState) => state.tree.trees);

  const handleChop = (treeId: number) => {
    dispatch(chopTree(treeId));
    setHeatLevel((prev) => prev + 5);
    addToast("Heat Level +5", "success");
  };

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
