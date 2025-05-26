import React, { useEffect, useRef } from "react";

const Dropdown = ({ token, onClose }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-1 w-48 bg-white border rounded shadow z-10"
    >
      <div className="p-2 text-sm text-gray-800">
        <p>Tag: {token.value}</p>
        <p className="text-gray-500 text-xs">(Example dropdown actions here)</p>
      </div>
    </div>
  );
}

export default Dropdown