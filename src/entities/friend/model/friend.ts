import { fetchRedis } from "@/helpers/redis";

import { sessionModel } from "@/entities/session";

export type FriendRequest = {
	id: string;
	senderId: string;
	receiverId: string;
};

export const getFriendsByUserId = async (userId: string) => {
	const friendIds = (await fetchRedis(
		"smembers",
		`user:${userId}:friends`,
	)) as string[];

	const friends = await Promise.all(
		friendIds.map(async (friendId) => {
			const friend = (await fetchRedis("get", `user:${friendId}`)) as string;
			const parsedFriend = JSON.parse(friend) as sessionModel.User;
			return parsedFriend;
		}),
	);

	return friends;
};

export const unseenFriendsRequests = async (
	userId: string,
): Promise<sessionModel.User[]> =>
	await fetchRedis("smembers", `user:${userId}:incoming_friend_requests`);
