import furnacePNG from "../../assets/base_main/furnace.png";
import furnace_background from "../../assets/base_main/furnace-background.jpg";
import { addFurnace } from "../../features/base/furnace/furnaceSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const Furnace = () => {
  const dispatch = useDispatch();
  const furnaces = useSelector((state: RootState) => state.furnace.items);

  return (
    <div
      className="relative border-4 border-zinc-800 shadow-2xl rounded-sm overflow-hidden w-[600px] h-[450px] font-mono"
      style={{
        backgroundImage: `linear-gradient(rgba(24, 24, 27, 0.8), rgba(24, 24, 27, 0.8)), url(${furnace_background})`,
        backgroundSize: "cover",
      }}
    >
      {/* Header Plaque */}
      <div className="bg-zinc-800 border-b-4 border-zinc-900 p-3 flex justify-between items-center">
        <h2 className="text-orange-500 font-bold tracking-widest uppercase text-xl italic">
          Smelting Facility v1.0
        </h2>
        <button
          onClick={() => dispatch(addFurnace(0))}
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1 rounded-sm border-b-4 border-orange-800 active:border-b-0 active:translate-y-1 transition-all text-sm font-bold uppercase"
        >
          + Deploy Unit
        </button>
      </div>

      {/* Main Grid Area */}
      <div className="p-6 h-[370px] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-3 gap-4">
          {furnaces.map((furnace) => (
            <div
              key={furnace.id}
              className={`relative p-4 border-2 flex flex-col items-center justify-center transition-all duration-500 ${
                furnace.isSmelting
                  ? "border-orange-500 bg-orange-900/20 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                  : "border-zinc-700 bg-zinc-900/60 shadow-inner"
              }`}
            >
              {/* Furnace Image with Heat Pulse */}
              <div className="relative">
                <img
                  src={furnacePNG}
                  className={`w-16 h-16 object-contain z-10 relative ${furnace.isSmelting ? "animate-pulse" : "grayscale-[0.5]"}`}
                  alt="furnace"
                />
                {furnace.isSmelting && (
                  <div className="absolute inset-0 bg-orange-500 blur-xl opacity-20 animate-pulse"></div>
                )}
              </div>

              {/* Status Readout */}
              <div className="mt-3 w-full">
                {furnace.isSmelting ? (
                  <div className="text-center">
                    <p className="text-[10px] text-orange-400 animate-pulse uppercase font-bold">
                      Processing
                    </p>
                    <p className="text-xs text-white truncate px-1 bg-zinc-950 rounded border border-zinc-700">
                      {furnace.currentlySmelting}
                    </p>
                  </div>
                ) : (
                  <p className="text-[10px] text-zinc-500 text-center uppercase">
                    Standby
                  </p>
                )}
              </div>

              {/* Decorative Rivets */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-zinc-600 rounded-full"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-zinc-600 rounded-full"></div>
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-zinc-600 rounded-full"></div>
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-zinc-600 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Trim */}
      <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-orange-600 via-zinc-800 to-orange-600 opacity-50"></div>
    </div>
  );
};

export default Furnace;
