import { create } from "zustand";

interface IThemeState {
  isDark: boolean;
  setTheme: (newTheme:boolean)=>void;
}

const themeStore = create<IThemeState>((set) => ({
  isDark: false,
  setTheme: (newTheme) => set({isDark:newTheme})
}));

export default themeStore;