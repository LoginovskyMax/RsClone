import { create } from "zustand";

export const LS_THEME = "rs-games-online__theme";

interface IThemeState {
  isDark: boolean;
  setTheme: (newTheme: boolean) => void;
}

const themeStore = create<IThemeState>((set) => ({
  isDark: localStorage.getItem(LS_THEME) === "true",
  setTheme: (newTheme) => set({ isDark: newTheme }),
}));

export default themeStore;
