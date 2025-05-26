import { create } from "zustand";

export const useFormulaStore = create((set) => ({
  formulaTokens: [],
  selectedIndex: null,
  setSelectedIndex: (index) => set({ selectedIndex: index }),
  insertToken: (token, index) =>
    set((state) => {
      const updated = [...state.formulaTokens];
      updated.splice(index, 0, token);
      return { formulaTokens: updated };
    }),
  deleteToken: (index) =>
    set((state) => {
      const updated = [...state.formulaTokens];
      if (index >= 0 && index < updated.length) {
        updated.splice(index, 1);
      }
      return { formulaTokens: updated };
    }),
}));
