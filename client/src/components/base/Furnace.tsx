import furnacePNG from "../../assets/base_main/furnace.png";
import furnace_background from "../../assets/base_main/furnace-background.jpg";
import { addFurnace } from "../../features/base/furnace/furnaceSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const Furnace = () => {
  const dispatch = useDispatch();

  const furnaces = useSelector((state: RootState) => state.furnace.items);

  return (
    <div className="border-solid border-white border-2 p-2 bg-gray-500 w-250 h-140">
      <p className="text-white text-center bg-gray-600 text-xl mb-2">Furnace</p>
      <div className="text-center mb-2 flex">
        <button
          onClick={() => dispatch(addFurnace(0))}
          className="text-white bg-gray-600 p-1 mr-1 rounded-lg"
        >
          Add furnace
        </button>
      </div>

      <div className="items-center justify-center flex">
        <div className="border-white border-2 border-solid p-4 h-120 w-140">
          {furnaces.map((furnace) => (
            <div key={furnace.id}>
              <img src={furnacePNG} className="w-12 h-12" />
              <p>Currently smelting: {furnace.currentlySmelting}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Furnace;
