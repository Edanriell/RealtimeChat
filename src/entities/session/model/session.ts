import { create } from "zustand";

export enum AuthType {
	Google = "Google",
	X = "Twitter",
	GitHub = "GitHub",
}

const useStore = create((set) => ({
	sesion: null,
	getSession: () => set((state: any) => ({ session: state }))
}))