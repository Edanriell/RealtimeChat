import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function toPusherKey(key: string) {
	return key.replace(/:/g, "__");
}

export function chatHrefConstructor(id1: string, id2: string) {
	const sortedIds = [id1, id2].sort();
	return `${sortedIds[0]}--${sortedIds[1]}`;
}

export function formatTimestamp(timestamp: number) {
	return format(timestamp, "HH:mm");
}

export function mouseToLightRotation(v: number) {
	return (-1 * v) / 140;
}

export function getFriendInitialLetters(friendName: string) {
	let initialLetters = "";
	const userName = friendName.split(" ");
	if (userName.length === 2) {
		initialLetters += userName[0][0];
		initialLetters += userName[1][0];
	} else {
		initialLetters += userName[0][0];
	}

	return initialLetters;
}
