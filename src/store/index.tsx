import { create } from "zustand";

interface UsersState {
  user: string | null;
  status: string | null;
  setUser: (user: { user: string | null; status: string | null }) => void;
}

const useUserStore = create<UsersState>((set) => ({
  user: null,
  status: null,
  setUser: (newUser) => set(() => newUser),
}));

export default useUserStore;
