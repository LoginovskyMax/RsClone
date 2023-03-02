import { create } from "zustand";

export type StatusSetter = (user: {
  isLoading: boolean;
  message: string;
}) => void;

interface StatusState {
  isLoading: boolean;
  message: string;
  setStatus: StatusSetter;
}

const useStatusStore = create<StatusState>((set) => ({
  isLoading: false,
  message: "",
  setStatus: (newStatus) => set(() => newStatus),
}));

export default useStatusStore;
