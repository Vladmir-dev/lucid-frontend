import React, { useState } from "react";
import { useFormulaStore } from "../state/formulaStore";
import  Dropdown  from "./Dropdown";


const Tag = ({ token, index }) => {
 const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative flex items-center bg-blue-100 px-2 py-1 rounded text-sm">
      <span>{token.value}</span>
      <button
        className="ml-1 text-gray-500 hover:text-gray-700"
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen((prev) => !prev);
        }}
      >
        ⋮
      </button>
      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-1 w-32 bg-white border rounded shadow z-20">
          <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Edit</div>
          <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Remove</div>
        </div>
      )}
    </div>
  );
}

export default Tag