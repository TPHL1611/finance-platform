import { create } from "zustand";
type NewAccountState = {
    id?: string;
    isOpen?: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
};
const useOpenAccount = create<NewAccountState>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));
export default useOpenAccount;
