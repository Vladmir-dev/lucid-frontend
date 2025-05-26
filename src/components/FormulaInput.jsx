import React, { useState, useRef } from "react";
import { useFormulaStore } from "../state/formulaStore";
import  Tag  from "./Tag";
import { useSuggestions } from "../api/useSuggestions";
import { data } from "autoprefixer";


const FormulaInput = () => {
  const {
    formulaTokens,
    selectedIndex,
    setSelectedIndex,
    insertToken,
    deleteToken,
  } = useFormulaStore();

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dummyValues = {
    revenue: 1000,
    cost: 400,
    tax: 0.2,
  };

  const getLastTokenForSuggestion = (val) => {
    const match = val.match(/(?:[+\-*/^()\s]*)([\w]*)$/);
    return match ? match[1] : val;
  };

  const keyword = getLastTokenForSuggestion(inputValue);
  const { data: suggestions = [], loading, error } = useSuggestions(keyword);

  console.log("Suggestions", suggestions)

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        insertToken({ type: "text", value: inputValue.trim() }, selectedIndex ?? formulaTokens.length);
        setInputValue("");
        setShowSuggestions(false);
      }
    } else if (e.key === "Backspace" && inputValue === "") {
      if (selectedIndex != null && selectedIndex > 0) {
        deleteToken(selectedIndex - 1);
        setSelectedIndex((prev) => (prev != null ? prev - 1 : null));
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // suggestion is string like "name (category)"
    // We want to insert only the name part before space and '('
    const name = suggestion.split(" (")[0];
    const prefix = inputValue.replace(/([\w]*)$/, "");
    insertToken({ type: "text", value: prefix + name }, selectedIndex ?? formulaTokens.length);
    setInputValue("");
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  const renderInput = (index) => (
    <input
      key={`input-${index}`}
      ref={selectedIndex === index ? inputRef : null}
      className="outline-none min-w-[100px]"
      placeholder="Type..."
      value={selectedIndex === index ? inputValue : ""}
      onChange={(e) => {
        const val = e.target.value;
        setInputValue(val);
        setShowSuggestions(true);
        setSelectedIndex(index);
      }}
      onKeyDown={handleKeyDown}
      onClick={() => setSelectedIndex(index)}
    />
  );

  const evaluateFormula = () => {
    const expr = formulaTokens
      .map((t) => {
        if (t.type === "text") {
          if (!isNaN(Number(t.value))) return t.value;
          return dummyValues[t.value] ?? 0;
        }
        return "";
      })
      .join(" ");
    try {
      const result = Function(`"use strict"; return (${expr})`)();
      return result;
    } catch {
      return "Invalid Expression";
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2 border rounded bg-white" onClick={() => setSelectedIndex(formulaTokens.length)}>
        {formulaTokens.map((token, idx) => (
          <React.Fragment key={idx}>
            {renderInput(idx)}
            <Tag index={idx} token={token} />
          </React.Fragment>
        ))}
        {renderInput(formulaTokens.length)}
      </div>

      {showSuggestions && (
        <div className="absolute left-0 mt-1 w-60 bg-white border rounded shadow z-10 max-h-60 overflow-auto">
          {loading && <div className="px-3 py-2 text-gray-500">Loading...</div>}
          {error && <div className="px-3 py-2 text-red-500">Error loading suggestions</div>}
          {!loading && !error && suggestions.length === 0 && (
            <div className="px-3 py-2 text-gray-500">No suggestions</div>
          )}
          {!loading && !error && suggestions.map((s, i) => (
            <div
              key={i}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(s)}
            >
              {s}
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 text-sm text-gray-700">
        Result: <strong>{evaluateFormula()}</strong>
      </div>
    </div>
  );
}

export default FormulaInput