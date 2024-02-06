import PusherServer from "pusher";
import PusherClient from "pusher-js";
import { notFound } from "next/navigation";

import { fetchRedis } from "@/shared/api";
import { messageArrayValidator } from "@/shared/lib";

export type IncomingFriendRequest = {
	senderId: string;
	senderEmail: string | null | undefined;
};

export type Chat = {
	id: string;
	messages: Message[];
};

export type Message = {
	id: string;
	senderId: string;
	receiverId: string;
	text: string;
	timestamp: number;
};

export type RecentMessage = {
	lastMessage: Message;
	name: string;
	email: string;
	image: string;
	id: string;
};

export const pusherServer = new PusherServer({
	appId: process.env.PUSHER_APP_ID!,
	key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
	secret: process.env.PUSHER_APP_SECRET!,
	cluster: "eu",
	useTLS: true,
});

export const pusherClient = new PusherClient(
	process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
	{
		cluster: "eu",
	},
);

export async function getChatMessages(chatId: string) {
	try {
		const results: string[] = await fetchRedis(
			"zrange",
			`chat:${chatId}:messages`,
			0,
			-1,
		);

		const dbMessages = results.map((message) => JSON.parse(message) as Message);

		const reversedDbMessages = dbMessages.reverse();

		const messages = messageArrayValidator.parse(reversedDbMessages);

		return messages;
	} catch (error) {
		notFound();
	}
}

export async function getChatPartner(chatPartnerId: string) {
	return JSON.parse(await fetchRedis("get", `user:${chatPartnerId}`));
}
