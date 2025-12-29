import { useState } from "react";

interface ExpandableProps {
  text: string;
}

export const SmoothExpandable: React.FC<ExpandableProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative max-w-md border border-gray-200 dark:border-gray-700 p-4 rounded-xl bg-white dark:bg-gray-900">
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[1000px]" : "max-h-[4.5rem]"
        }`}
        style={{ maxHeight: isExpanded ? "1000px" : "4.5rem" }}
      >
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {text}
        </p>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative z-10 mt-3 flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
      >
        {isExpanded ? "Collapse ↑" : "Expand ↓"}
      </button>

      {!isExpanded && (
        <div className="absolute bottom-12 left-0 w-full h-12 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
