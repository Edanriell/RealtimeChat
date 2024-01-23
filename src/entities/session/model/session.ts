import { create } from "zustand";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export enum AuthType {
	Google = "Google",
	X = "Twitter",
	GitHub = "GitHub",
}

export type User = {
	name: string;
	email: string;
	image: string;
	id: string;
}

export const getSession = async () => getServerSession(authOptions);

// type State = {
// 	firstName: string;
// 	lastName: string;
// };

// type Action = {
// 	updateFirstName: (firstName: State["firstName"]) => void;
// 	updateLastName: (lastName: State["lastName"]) => void;
// };

// // Create your store, which includes both state and (optionally) actions
// export const usePersonStore = create<State & Action>((set) => ({
// 	firstName: "Test",
// 	lastName: "",
// 	updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
// 	updateLastName: (lastName) => set(() => ({ lastName: lastName })),
// }));
