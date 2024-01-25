import PusherServer from "pusher";
import PusherClient from "pusher-js";

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
