import furnace from "../../assets/base_main/furnace.png";
import furnace_background from "../../assets/base_main/furnace-background.jpg";

const Furnace = () => {
  return (
    <div className="border-solid border-white border-2 p-2 bg-gray-500 w-250 h-140">
      <p className="text-white text-center bg-gray-600 text-xl mb-2">Furnace</p>

      <div className="items-center justify-center flex">
        <div className="border-white border-2 border-solid p-4 h-120 w-140">
          <img src={furnace} className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
};

export default Furnace;
