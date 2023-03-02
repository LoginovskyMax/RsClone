import { create } from "zustand";

// eslint-disable-next-line import/no-cycle
import { LS_LANG } from "../Components/Header/Lang/LangComp";

interface ILangState {
  isEn: boolean;
  setLang: (newTheme: boolean) => void;
}

const languageStore = create<ILangState>((set) => ({
  isEn: localStorage.getItem(LS_LANG) === "true",
  setLang: (newLang) => set({ isEn: newLang }),
}));

export default languageStore;
