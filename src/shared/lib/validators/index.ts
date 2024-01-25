import { z } from "zod";

export type Message = z.infer<typeof messageValidator>;

export const addFriendValidator = z.object({
	email: z.string().email(),
});

export const messageValidator = z.object({
	id: z.string(),
	senderId: z.string(),
	text: z.string(),
	timestamp: z.number(),
});

export const messageArrayValidator = z.array(messageValidator);
