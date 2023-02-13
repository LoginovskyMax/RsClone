import { create } from "zustand";

export type userSetter = (user: {
  userName: string | null;
  status: Array<string>;
  banned: boolean;
  email: string | null;
}) => void;

interface UsersState {
  userName: string | null;
  status: Array<string>;
  banned: boolean;
  setUser: userSetter;
}

const useUserStore = create<UsersState>((set) => ({
  userName: null,
  status: [],
  banned: false,
  email: null,
  setUser: (newUser) => set(() => newUser),
}));

export const nullUser = {
  userName: null,
  status: [],
  banned: false,
  email: null,
};

export default useUserStore;
