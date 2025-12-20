import React, { useState } from "react";
import tree1 from "../../assets/fuel_main/tree 1.svg";
import tree2 from "../../assets/fuel_main/tree 2.svg";
import tree3 from "../../assets/fuel_main/tree 3.svg";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { chopTree } from "../../features/fuel_main/treeSlice";
import { useToast } from "../ui/toast/ToastProvider";
import { incrementWCByAmount } from "../../features/fuel_main/woodSlice";
import {
  decrementWFCount,
  incrementWFCount,
} from "../../features/base/workforce/workforceSlice";

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

// TO DO
// Add cooldown once the tree is going to be chopped - Done
// Notify when the tree is chopped - Done
// Replace the chopped tree console.log with a good message to the user - Done

const FuelMain: React.FC<FuelMainProps> = ({ heatLevel, setHeatLevel }) => {
  const { addToast } = useToast();
  const dispatch = useDispatch();

  const [isBeingChopped, setIsBeingChopped] = useState(false);

  const trees = useSelector((state: RootState) => state.tree.trees);
  const woodCount = useSelector((state: RootState) => state.wood.value);
  const workforceCount = useSelector(
    (state: RootState) => state.workforce.value,
  );

  const handleChop = (treeId: number, tree: string) => {
    if (trees[treeId].isChopped) {
      addToast("Tree already chopped", "error");
    }
    if (workforceCount === 0) {
      addToast("No workforce available", "error");
    } else if (workforceCount > 0 && !isBeingChopped) {
      dispatch(decrementWFCount());

      setIsBeingChopped(true);

      setTimeout(() => {
        dispatch(chopTree(treeId));

        setHeatLevel((prev) => prev + 5);

        switch (tree) {
          case "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%204C4%201.79086%205.79086%200%208%200C9.86384%200%2011.4299%201.27477%2011.874%203H12C14.2091%203%2016%204.79086%2016%207C16%209.20914%2014.2091%2011%2012%2011H9V14H11V16H5V14H7V11H3.5C1.567%2011%200%209.433%200%207.5C0%205.567%201.567%204%203.5%204H4Z'%20fill='%23000000'/%3e%3c/svg%3e":
            dispatch(incrementWCByAmount(3));
            addToast(
              `Heat Level +5, Wood Count + 3/${woodCount + 3}`,
              "success",
            );
            break;
          case "/src/assets/fuel_main/tree%202.svg":
            dispatch(incrementWCByAmount(1));
            addToast(
              `Heat Level +5, Wood Count + 1/${woodCount + 1}`,
              "success",
            );
            break;
          case "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20enable-background='new%200%200%2024%2024'%20xml:space='preserve'%3e%3cpath%20d='M11,21v-4.3c-0.5,0.2-1,0.3-1.5,0.3C7,17,5,15,5,12.5c0-1.3,0.5-2.4,1.4-3.2C6.1,8.7,6,8.1,6,7.5C6,5,8,3,10.5,3%20c1.6,0,2.9,0.8,3.8,2c0.1,0,0.2,0,0.2,0c3,0,5.5,2.5,5.5,5.5S17.5,16,14.5,16c-0.5,0-1-0.1-1.5-0.2V21H11z'/%3e%3crect%20fill='none'%20width='24'%20height='24'/%3e%3c/svg%3e":
            dispatch(incrementWCByAmount(2));
            addToast(
              `Heat Level +5, Wood Count + 2/${woodCount + 2}`,
              "success",
            );
            break;
          default:
            break;
        }
      }, 2000);

      dispatch(incrementWFCount());
    }
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
                onClick={() => handleChop(tree.id, TREE_PATHS[tree.src])}
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
