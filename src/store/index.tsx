import { create } from "zustand";

export type userSetter = (user: {
  userName: string | null;
  image?: string;
  status: Array<string>;
  banned: boolean;
  email: string | null;
}) => void;

interface UsersState {
  userName: string | null;
  image?: string;
  status: Array<string>;
  banned: boolean;
  setUser: userSetter;
  fetched: boolean;
}

const useUserStore = create<UsersState>((set) => ({
  userName: null,
  status: [],
  banned: false,
  email: null,
  fetched: false,
  setUser: (newUser) => set(() => newUser),
}));

export const nullUser = {
  userName: null,
  status: [],
  banned: false,
  email: null,
  fetched: true,
};

export default useUserStore;
