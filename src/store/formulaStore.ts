
import { create } from "zustand";

interface FormulaState {
  formula: string;
  setFormula: (newFormula: string) => void;
}

const useFormulaStore = create<FormulaState>((set) => ({
  formula: "",
  setFormula: (newFormula) => set({ formula: newFormula }),
}));

export default useFormulaStore;
