import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { startResearch } from "../../features/base/research/researchSlice";

import { SmoothExpandable } from "../ui/text/SmoothExpandable.tsx";

import check1 from "../../assets/research/check 1.svg";
import inProgress from "../../assets/research/in progress.svg";
import locked from "../../assets/research/locked.svg";
import unlocked from "../../assets/research/unlocked.svg";

const Research = () => {
  const dispatch = useDispatch();

  const [researchCategory, setResearchCategory] = useState("tools");
  const items = useSelector((state: RootState) => state.research.items);

  const [researchingItem, setResearchingItem] = useState({ id: 0, amount: 0 });

  const handleStartResearch = (id: number, amount: number) => {
    dispatch(startResearch(id));
    setResearchingItem({ ...researchingItem, id: id, amount: amount });
  };

  return (
    <div className="border-white border-2 p-2 bg-gray-500 border-solid w-250 h-140">
      <button className="text-white bg-gray-600 p-1 mr-1 mb-2 rounded-lg">
        Tools
      </button>
      <button
        onClick={() => handleStartResearch(1, 200)}
        className="text-white bg-gray-600 p-1 mr-1 mb-2 rounded-lg"
      >
        start research
      </button>
      {researchCategory === "tools" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 
        ${item.isResearched ? "border-blue-500/50 bg-slate-900" : "border-slate-700 bg-slate-900/80 hover:border-slate-500"}`}
            >
              {/* Header Section */}
              <div className="flex items-center justify-between bg-slate-800/50 px-3 py-2 border-b border-slate-700">
                <h3
                  className={`font-bold uppercase tracking-wider text-sm ${item.isResearched ? "text-blue-400" : "text-slate-300"}`}
                >
                  {item.title}
                </h3>

                <div className="flex items-center gap-2">
                  {item.isBeingResearched && (
                    <div className="flex items-center gap-1.5">
                      <img
                        src={inProgress}
                        className="w-4 h-4 animate-spin-slow invert opacity-80"
                        alt="In Progress"
                      />
                      <span className="text-[10px] font-mono text-blue-400">
                        {Math.trunc(item.researchProgress * 100) / 100}%
                      </span>
                    </div>
                  )}

                  <div className="flex gap-1">
                    {item.isResearched && !item.isResearchable ? (
                      <img
                        src={unlocked}
                        className="w-5 h-5 opacity-90"
                        alt="Unlocked"
                      />
                    ) : (
                      <>
                        <img
                          src={locked}
                          className={`w-5 h-5 ${item.isBeingResearched ? "opacity-40" : "opacity-100"}`}
                          alt="Locked"
                        />
                        <img
                          src={check1}
                          className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity"
                          alt="Check"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {item.isBeingResearched && (
                <div className="w-full h-1 bg-slate-800">
                  <div
                    className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-500"
                    style={{ width: `${item.researchProgress}%` }}
                  />
                </div>
              )}

              <div className="p-3">
                <div className="text-slate-400 text-sm leading-relaxed">
                  <SmoothExpandable text={item.description} />
                </div>
              </div>

              {!item.isResearched && !item.isBeingResearched && (
                <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-colors" />
              )}
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
