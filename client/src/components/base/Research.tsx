import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { startResearch } from "../../features/base/research/researchSlice";
import { SmoothExpandable } from "../ui/text/SmoothExpandable.tsx";

import inProgress from "../../assets/research/in progress.svg";
import locked from "../../assets/research/locked.svg";
import unlocked from "../../assets/research/unlocked.svg";

const Research = () => {
  const dispatch = useDispatch();
  const [researchCategory, setResearchCategory] = useState("tools");
  const items = useSelector((state: RootState) => state.research.items);

  const handleStartResearch = (id: number) => {
    dispatch(startResearch(id));
  };

  return (
    <div className="relative border-t-4 border-l-4 border-slate-700 bg-slate-900 w-[1000px] h-[600px] overflow-hidden font-mono shadow-2xl">
      {/* Background Decorative Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#4ade80 0.5px, transparent 0.5px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Header Panel */}
      <div className="relative z-10 flex items-center justify-between bg-slate-800/80 p-4 border-b-2 border-slate-700">
        <div className="flex gap-2">
          <button
            onClick={() => setResearchCategory("tools")}
            className={`px-6 py-1 uppercase text-xs font-black transition-all ${
              researchCategory === "tools"
                ? "bg-amber-500 text-slate-900 skew-x-[-12deg]"
                : "bg-slate-700 text-slate-400 hover:bg-slate-600 skew-x-[-12deg]"
            }`}
          >
            <span className="inline-block skew-x-[12deg]">Tools</span>
          </button>
          <button className="px-6 py-1 uppercase text-xs font-black bg-slate-700 text-slate-500 cursor-not-allowed skew-x-[-12deg]">
            <span className="inline-block skew-x-[12deg]">Something</span>
          </button>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-amber-500/50 uppercase">
            Research Terminal v4.2
          </div>
          <div className="text-xs text-slate-400 font-bold">
            STATUS:{" "}
            <span className="text-green-500 animate-pulse">SYSTEMS_ONLINE</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-6 h-[calc(100%-70px)] overflow-y-auto custom-scrollbar">
        {researchCategory === "tools" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`group relative border-2 transition-all duration-300 ${
                  item.isResearched
                    ? "border-cyan-900/50 bg-slate-800/40"
                    : "border-slate-700 bg-slate-900/60"
                }`}
              >
                {/* Status Indicator Bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${
                    item.isResearched
                      ? "bg-cyan-500"
                      : item.isBeingResearched
                        ? "bg-amber-500 animate-pulse"
                        : "bg-slate-700"
                  }`}
                />

                <div className="p-4 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3
                        className={`text-lg font-black uppercase tracking-tighter ${
                          item.isResearched ? "text-cyan-400" : "text-slate-300"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span className="text-[9px] text-slate-500 font-bold uppercase">
                        Ref ID: {item.id.toString().padStart(4, "0")}
                      </span>
                    </div>

                    {/* Action Icon */}
                    <div className="flex items-center gap-3">
                      {item.isBeingResearched && (
                        <div className="text-right">
                          <span className="block text-[10px] text-amber-500 animate-pulse">
                            ANALYZING...
                          </span>
                          <span className="text-xs text-amber-400 font-mono">
                            {Math.floor(item.researchProgress)}%
                          </span>
                        </div>
                      )}
                      <img
                        src={
                          item.isResearched
                            ? unlocked
                            : item.isBeingResearched
                              ? inProgress
                              : locked
                        }
                        className={`w-6 h-6 ${item.isBeingResearched ? "animate-spin-slow" : ""}`}
                        alt="Status"
                      />
                    </div>
                  </div>

                  <div className="text-slate-400 text-sm mb-4 leading-tight italic opacity-80">
                    <SmoothExpandable text={item.description} />
                  </div>

                  {/* Progress Bar (Hazard Style) */}
                  {item.isBeingResearched && (
                    <div className="relative w-full h-4 bg-slate-950 border border-slate-700 p-[2px] mb-2">
                      <div
                        className="h-full transition-all duration-500 ease-out"
                        style={{
                          width: `${item.researchProgress}%`,
                          background: `repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #000 10px, #000 20px)`,
                        }}
                      />
                    </div>
                  )}

                  {/* Interaction Button */}
                  {!item.isResearched && !item.isBeingResearched && (
                    <button
                      onClick={() => handleStartResearch(item.id)}
                      className="w-full py-2 bg-slate-800 border border-slate-600 text-slate-300 text-xs font-bold uppercase hover:bg-amber-600 hover:text-white hover:border-amber-400 transition-all active:scale-95"
                    >
                      Initialize Research Protocol
                    </button>
                  )}

                  {item.isResearched && (
                    <div className="text-[10px] text-cyan-600 font-bold uppercase tracking-widest">
                      // Technology Integrated
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-50 bg-[length:100%_4px,3px_100%]" />
    </div>
  );
};

export default Research;
