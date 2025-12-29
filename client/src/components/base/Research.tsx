import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { researchSlice } from "../../features/base/research/researchSlice";

import { SmoothExpandable } from "../ui/text/SmoothExpandable.tsx";

import check1 from "../../assets/research/check 1.svg";
import reject1 from "../../assets/research/reject 1.svg";
import inProgress from "../../assets/research/in progress.svg";
import locked from "../../assets/research/locked.svg";
import unlocked from "../../assets/research/unlocked.svg";

const Research = () => {
  const dispatch = useDispatch();

  const [researchCategory, setResearchCategory] = useState("tools");
  const items = useSelector((state: RootState) => state.research.items);

  return (
    <div className="border-white border-2 p-2 bg-gray-500 border-solid w-250 h-140">
      <button className="text-white bg-gray-600 p-1 mr-1 mb-2 rounded-lg">
        Tools
      </button>
      {researchCategory === "tools" ? (
        <div className="grid grid-cols-4 gap-2">
          {items.map((item) => (
            <div className="border-solid border-white border-2">
              <div className="bg-gray-700 flex">
                <p className="text-lg text-center flex-1/2 text-white">
                  {item.title}
                </p>
                {item.isBeingResearched && (
                  <>
                    <img src={inProgress} className="w-6 h-6 bg-white" />
                    <p className="text-white">{item.researchProgress}%</p>
                  </>
                )}
                {item.isResearchable ? (
                  <img src={unlocked} className="w-6 h-6 bg-white" />
                ) : (
                  <img src={locked} className="w-6 h-6 bg-white" />
                )}
                {item.isResearched ? (
                  <img src={check1} className="w-6 h-6" />
                ) : (
                  <img src={reject1} className="w-6 h-6" />
                )}
              </div>
              <SmoothExpandable text={item.description} />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Research;
