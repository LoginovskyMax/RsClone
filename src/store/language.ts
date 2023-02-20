import { create } from "zustand";

interface ILangState {
  isEn: boolean;
  setLang: (newTheme: boolean) => void;
}

const languageStore = create<ILangState>((set) => ({
  isEn: false,
  setLang: (newLang) => set({ isEn: newLang }),
}));

export default languageStore;
