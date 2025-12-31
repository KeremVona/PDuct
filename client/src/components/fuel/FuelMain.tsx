import React, { useState, useEffect, useMemo } from "react";
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

const FuelMain: React.FC<FuelMainProps> = ({ heatLevel, setHeatLevel }) => {
  const { addToast } = useToast();
  const dispatch = useDispatch();

  const [isBeingChopped, setIsBeingChopped] = useState(false);
  const [usingToolId, setUsingToolId] = useState(0);

  let chopTrees: number[] = [];

  const trees = useSelector((state: RootState) => state.tree.trees);
  const woodCount = useSelector((state: RootState) => state.wood.value);
  const items = useSelector((state: RootState) => state.research.items);
  const workforceCount = useSelector(
    (state: RootState) => state.workforce.value,
  );

  const researchedTools = useMemo(() => {
    return items.filter((item) => item.isResearched);
  }, [items]);

  const usingTool = researchedTools.find((tool) => tool.id === usingToolId);
  const chopSpeed = usingTool ? usingTool.chopSpeed : 1;

  const handleChop = (treeId: number, tree: string) => {
    if (trees[treeId].isChopped) {
      addToast("Tree already chopped", "error");
    } else if (workforceCount === 0) {
      addToast("No workforce available", "error");
    } else if (isBeingChopped && chopTrees.includes(treeId)) {
      addToast("The tree is already being chopped", "error");
    } else if (workforceCount > 0 && !chopTrees.includes(treeId)) {
      chopTrees.push(treeId);
      dispatch(decrementWFCount());
      setIsBeingChopped(true);

      setTimeout(() => {
        dispatch(chopTree(treeId));

        setHeatLevel((prev) => prev + 5);
        switch (tree) {
          case "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20version='1.1'%20width='256'%20height='256'%20viewBox='0%200%20256%20256'%20xml:space='preserve'%3e%3cg%20style='stroke:%20none;%20stroke-width:%200;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20none;%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='translate(1.4065934065934016%201.4065934065934016)%20scale(2.81%202.81)'%3e%3cpath%20d='M%2051.865%201.523%20c%202.639%200.961%204.659%202.757%206.26%205.115%20c%205.117%20-0.776%2010.301%200.912%2013.976%204.587%20c%203.675%203.675%205.364%208.857%204.588%2013.975%20c%204.168%203.07%206.638%207.929%206.638%2013.126%20c%200%205.393%20-2.644%2010.387%20-7.091%2013.437%20c%20-0.76%202.672%20-2.184%205.104%20-4.135%207.055%20c%20-3.134%203.134%20-7.323%204.754%20-11.539%204.754%20c%20-3.088%200%20-6.19%20-0.869%20-8.902%20-2.649%20l%200.549%20-0.836%20l%20-10.447%20-1.312%20c%200%200%200%200%200%200%20l%20-0.216%200.977%20c%20-0.422%20-0.094%20-0.843%20-0.204%20-1.256%20-0.329%20c%20-3.807%203.412%20-8.875%204.69%20-13.641%203.882%20c%200.009%20-0.082%200.048%20-0.316%200.054%20-0.379%20C%2021.64%2059.31%2016.967%2051.451%2016.924%2045%20c%20-0.041%20-6.216%202.696%20-12.469%207.394%20-16.172%20c%20-0.92%20-6.117%201.123%20-11.997%204.951%20-16.687%20c%203.961%20-4.852%2010.438%20-6.889%2016.416%20-5.562%20C%2045.933%203.689%2048.897%202.544%2051.865%201.523'%20style='stroke:%20none;%20stroke-width:%201;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20rgb(127,178,65);%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='%20matrix(1%200%200%201%200%200)%20'%20stroke-linecap='round'/%3e%3cpath%20d='M%2026.702%2062.925%20C%2021.64%2059.31%2017.809%2051.551%2017.767%2045.1%20c%20-0.041%20-6.216%202.718%20-12.047%207.415%20-15.75%20c%20-0.92%20-6.117%200.952%20-12.328%205.086%20-16.751%20c%204.133%20-4.423%209.991%20-6.482%2015.793%20-5.591%20c%201.564%20-2.275%203.552%20-4.128%205.804%20-5.483%20C%2049.745%200.537%2047.41%200%2044.999%200%20c%20-5.197%200%20-10.056%202.47%20-13.126%206.639%20c%20-5.117%20-0.777%20-10.3%200.912%20-13.975%204.587%20s%20-5.364%208.857%20-4.587%2013.975%20c%20-4.169%203.07%20-6.638%207.929%20-6.638%2013.126%20c%200%205.393%202.644%2010.387%207.091%2013.437%20c%200.759%202.67%202.183%205.103%204.135%207.055%20c%202.456%202.456%205.534%203.942%208.749%204.487%20C%2026.656%2063.223%2026.696%2062.987%2026.702%2062.925%20z'%20style='stroke:%20none;%20stroke-width:%201;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20rgb(113,156,64);%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='%20matrix(1%200%200%201%200%200)%20'%20stroke-linecap='round'/%3e%3cpath%20d='M%2057.523%2054.976%20l%20-3.031%20-2.947%20c%20-0.387%20-0.375%20-0.999%20-0.378%20-1.388%20-0.007%20l%20-3.865%203.69%20V%2040.889%20c%200%20-0.552%20-0.447%20-1%20-1%20-1%20h%20-4.275%20c%20-0.552%200%20-1%200.448%20-1%201%20v%207.186%20l%20-4.745%20-4.919%20c%20-0.377%20-0.391%20-1.063%20-0.391%20-1.439%200%20l%20-2.52%202.614%20c%20-0.369%200.382%20-0.374%200.986%20-0.013%201.375%20l%206.515%207.007%20V%2089%20c%200%200.553%200.448%201%201%201%20h%206.477%20c%200.553%200%201%20-0.447%201%20-1%20V%2064.29%20l%208.276%20-7.872%20c%200.197%20-0.188%200.309%20-0.447%200.311%20-0.719%20C%2057.828%2055.426%2057.718%2055.166%2057.523%2054.976%20z'%20style='stroke:%20none;%20stroke-width:%201;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20rgb(160,126,99);%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='%20matrix(1%200%200%201%200%200)%20'%20stroke-linecap='round'/%3e%3c/g%3e%3c/svg%3e":
            dispatch(incrementWCByAmount(3));
            addToast(
              `Heat Level +5, Wood Count + 3/${woodCount + 3}`,
              "success",
            );
            break;
          case "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20version='1.1'%20width='256'%20height='256'%20viewBox='0%200%20256%20256'%20xml:space='preserve'%3e%3cg%20style='stroke:%20none;%20stroke-width:%200;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20none;%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='translate(1.4065934065934016%201.4065934065934016)%20scale(2.81%202.81)'%3e%3cpath%20d='M%2036.717%2090%20h%2017.786%20c%20-3.688%20-3.683%20-3.603%20-9.403%20-3.627%20-15.108%20l%200%200%20c%200.223%20-6.449%202.375%20-13.838%203.337%20-21.428%20l%20-2.278%20-0.206%20c%20-0.421%203.709%20-1.478%207.201%20-2.758%2010.155%20c%20-1.933%20-4.69%20-3.368%20-7.247%20-3.516%20-12.666%20h%20-1.608%20c%20-0.749%204.365%20-0.278%208.941%201.608%2013.76%20c%20-2.931%20-4.097%20-6.019%20-7.1%20-9.292%20-8.813%20l%20-1.659%201.674%20c%204.013%202.908%207.848%208.641%207.499%2015.218%20C%2042.208%2080.466%2041.172%2085.438%2036.717%2090%20z'%20style='stroke:%20none;%20stroke-width:%201;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20rgb(180,103,51);%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='%20matrix(1%200%200%201%200%200)%20'%20stroke-linecap='round'/%3e%3cpath%20d='M%2083.376%2027.144%20c%200%20-3.078%20-2.095%20-5.66%20-4.936%20-6.415%20c%200.003%20-0.077%200.012%20-0.153%200.012%20-0.23%20c%200%20-3.67%20-2.975%20-6.646%20-6.646%20-6.646%20c%20-0.605%200%20-1.189%200.088%20-1.746%200.24%20c%20-0.25%20-3.442%20-3.115%20-6.16%20-6.621%20-6.16%20c%20-0.939%200%20-1.831%200.197%20-2.641%200.548%20c%20-0.419%20-3.267%20-3.204%20-5.795%20-6.585%20-5.795%20c%20-1.575%200%20-3.02%200.551%20-4.159%201.466%20C%2048.972%201.712%2046.546%200%2043.704%200%20c%20-2.863%200%20-5.322%201.729%20-6.392%204.199%20c%20-0.189%20-0.015%20-0.379%20-0.025%20-0.571%20-0.025%20c%20-2.287%200%20-4.316%201.102%20-5.585%202.804%20c%20-1.173%20-0.9%20-2.64%20-1.436%20-4.233%20-1.436%20c%20-3.846%200%20-6.963%203.118%20-6.963%206.963%20c%20-3.846%200%20-6.963%203.118%20-6.963%206.963%20c%200%200.849%200.152%201.662%200.431%202.414%20c%20-3.718%200.476%20-6.592%203.65%20-6.592%207.497%20c%200%202.284%201.014%204.33%202.615%205.716%20c%20-0.843%201.219%20-1.337%202.698%20-1.337%204.292%20c%200%200.86%200.146%201.686%200.411%202.457%20c%20-1.18%201.334%20-1.898%203.086%20-1.898%205.007%20c%200%204.176%203.385%207.561%207.561%207.561%20c%201.692%200%203.254%20-0.556%204.514%20-1.495%20c%200.826%203.28%203.795%205.708%207.331%205.708%20c%201.967%200%203.758%20-0.752%205.103%20-1.983%20c%201.231%201.966%203.415%203.274%205.905%203.274%20c%203.846%200%206.963%20-3.118%206.963%20-6.963%20c%200%20-0.061%20-0.003%20-0.121%20-0.005%20-0.182%20c%200.978%200.506%202.087%200.793%203.264%200.793%20c%201.579%200%203.038%20-0.515%204.219%20-1.385%20c%200.995%203.382%204.121%205.851%207.825%205.851%20c%202.239%200%204.266%20-0.902%205.741%20-2.363%20c%201.015%200.453%202.138%200.707%203.321%200.707%20c%204.506%200%208.158%20-3.652%208.158%20-8.158%20c%200%20-1.258%20-0.285%20-2.449%20-0.793%20-3.512%20c%203.278%20-1.058%205.649%20-4.133%205.649%20-7.763%20c%200%20-1.52%20-0.423%20-2.938%20-1.148%20-4.157%20C%2082.117%2031.611%2083.376%2029.527%2083.376%2027.144%20z'%20style='stroke:%20none;%20stroke-width:%201;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20rgb(86,148,65);%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='%20matrix(1%200%200%201%200%200)%20'%20stroke-linecap='round'/%3e%3c/g%3e%3c/svg%3e":
            dispatch(incrementWCByAmount(1));
            addToast(
              `Heat Level +5, Wood Count + 1/${woodCount + 1}`,
              "success",
            );
            break;
          case "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20version='1.1'%20width='256'%20height='256'%20viewBox='0%200%20256%20256'%20xml:space='preserve'%3e%3cg%20style='stroke:%20none;%20stroke-width:%200;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20none;%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='translate(1.4065934065934016%201.4065934065934016)%20scale(2.81%202.81)'%3e%3crect%20x='41.04'%20y='63.09'%20rx='0'%20ry='0'%20width='7.91'%20height='26.91'%20style='stroke:%20none;%20stroke-width:%201;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20rgb(122,8,8);%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='%20matrix(1%200%200%201%200%200)%20'/%3e%3cpolygon%20points='44.04,69.09%2048.96,69.09%2048.96,63.09%2041.04,63.09%2041.04,90%2044.04,90%20'%20style='stroke:%20none;%20stroke-width:%201;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20rgb(96,7,7);%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='%20matrix(1%200%200%201%200%200)%20'/%3e%3cpath%20d='M%2061.355%2067.042%20H%2028.646%20c%20-9.191%200%20-16.668%20-7.477%20-16.668%20-16.667%20c%200%20-4.903%202.124%20-9.446%205.723%20-12.567%20c%20-0.749%20-1.913%20-1.135%20-3.955%20-1.135%20-6.045%20c%200%20-7.046%204.33%20-13.133%2010.68%20-15.55%20C%2028.064%207.137%2035.714%200%2045%200%20c%209.285%200%2016.936%207.137%2017.755%2016.213%20c%206.349%202.417%2010.679%208.505%2010.679%2015.55%20c%200%202.09%20-0.386%204.131%20-1.135%206.045%20c%203.599%203.121%205.723%207.664%205.723%2012.567%20C%2078.022%2059.566%2070.546%2067.042%2061.355%2067.042%20z'%20style='stroke:%20none;%20stroke-width:%201;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20rgb(53,144,36);%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='%20matrix(1%200%200%201%200%200)%20'%20stroke-linecap='round'/%3e%3cpath%20d='M%2041.086%2065.042%20c%20-9.985%200%20-18.108%20-7.253%20-18.108%20-16.17%20c%200%20-4.757%202.307%20-9.164%206.218%20-12.192%20c%20-0.813%20-1.856%20-1.233%20-3.837%20-1.233%20-5.864%20c%200%20-6.836%204.704%20-12.741%2011.602%20-15.086%20C%2040.228%209.164%2045.02%203.648%2051.595%201.265%20C%2049.554%200.45%2047.329%200%2045%200%20c%20-9.286%200%20-16.936%207.137%20-17.755%2016.213%20c%20-6.35%202.417%20-10.68%208.505%20-10.68%2015.55%20c%200%202.09%200.387%204.131%201.135%206.045%20c%20-3.599%203.121%20-5.723%207.664%20-5.723%2012.567%20c%200%209.191%207.477%2016.667%2016.668%2016.667%20h%2032.709%20c%202.86%200%205.554%20-0.725%207.908%20-2%20H%2041.086%20z'%20style='stroke:%20none;%20stroke-width:%201;%20stroke-dasharray:%20none;%20stroke-linecap:%20butt;%20stroke-linejoin:%20miter;%20stroke-miterlimit:%2010;%20fill:%20rgb(46,124,33);%20fill-rule:%20nonzero;%20opacity:%201;'%20transform='%20matrix(1%200%200%201%200%200)%20'%20stroke-linecap='round'/%3e%3c/g%3e%3c/svg%3e":
            dispatch(incrementWCByAmount(2));
            addToast(
              `Heat Level +5, Wood Count + 2/${woodCount + 2}`,
              "success",
            );
            break;
          default:
            break;
        }
        dispatch(incrementWFCount());
        setIsBeingChopped(false);
      }, 5000 / chopSpeed);
    }
  };
  return (
    <div className="border-white border-2 p-2 bg-gray-500 border-solid w-250 h-140">
      <p className="text-white text-center bg-gray-600 text-xl">Woody Forest</p>
      <div className="text-center mb-2 flex">
        <p className="flex-1/3">Workforce count: {workforceCount}</p>
        <p className="flex-1/3">Using: Axe</p>
        <div className="flex-1/3">
          <label>Using:</label>
          <select
            value={usingToolId}
            onChange={(e) => setUsingToolId(Number(e.target.value))}
          >
            {researchedTools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="items-center justify-center flex">
        <div className="border-white border-2 border-solid p-4 h-120 w-140">
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
