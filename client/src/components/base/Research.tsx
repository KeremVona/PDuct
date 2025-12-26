import { useState } from "react";

const Research = () => {
  const [researchCategory, setResearchCategory] = useState("tools");
  return (
    <div className="border-white border-2 p-2 bg-gray-500 border-solid w-250 h-140">
      <button className="text-white bg-gray-600 p-1 mr-1 mb-2 rounded-lg">
        Tools
      </button>
      {researchCategory === "tools" ? (
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center border-solid border-white border-2">
            Research 1
          </div>
          <div className="text-center border-solid border-white border-2">
            Research 2
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Research;
