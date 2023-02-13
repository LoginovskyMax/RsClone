import { create } from "zustand";

interface UsersState {
  userName: string | null;
  status: Array<string>;
  setUser: (user: { userName: string | null; status: Array<string> }) => void;
}

const useUserStore = create<UsersState>((set) => ({
  userName: null,
  status: [],
  setUser: (newUser) => set(() => newUser),
}));

export default useUserStore;
