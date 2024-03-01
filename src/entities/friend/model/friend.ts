import { sessionModel } from "@/entities/session";
import { chatHrefConstructor } from "@/shared/lib";
import { fetchRedis } from "@/shared/api";

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

export const friendsWithLastMessage = async (
	friends: sessionModel.User[],
	userId: string,
) =>
	Promise.all(
		friends.map(async (friend) => {
			const [lastMessageRaw] = (await fetchRedis(
				"zrange",
				`chat:${chatHrefConstructor(userId, friend.id)}:messages`,
				-1,
				-1,
			)) as string[];

			const lastMessage = JSON.parse(lastMessageRaw) as Message;

			return {
				...friend,
				lastMessage,
			};
		}),
	);
