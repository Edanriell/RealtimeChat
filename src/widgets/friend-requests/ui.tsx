"use client";

import { FC, useEffect, useState } from "react";
import { Check, UserPlus, X } from "lucide-react";

import { messageModel } from "@/entities/message";
import { IncomingFriendRequest } from "@/entities/message/model";
import { User } from "@/entities/session/model";
import { AcceptFriend } from "@/features/accept-friend";
import { DenyFriend } from "@/features/deny-friend";
import { toPusherKey } from "@/shared/lib";
import { fetchRedis } from "@/shared/api";

type FriendRequestsProps = {
	sessionId: string;
};

export const FriendRequests: FC<FriendRequestsProps> = ({ sessionId }) => {
	const { pusherClient } = messageModel;

	const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
		[],
	);

	useEffect(() => {
		const fetchFriendRequests = async () => {
			const incomingSenderIds = await fetchRedis(
				"smembers",
				`user:${sessionId}:incoming_friend_requests`,
			);
			const requests = await Promise.all(
				incomingSenderIds.map(async (senderId: string) => {
					const sender = await fetchRedis("get", `user:${senderId}`);
					const senderParsed = JSON.parse(sender) as User;

					return {
						senderId,
						senderEmail: senderParsed.email,
					};
				}),
			);
			setFriendRequests(requests);
		};

		fetchFriendRequests();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		pusherClient.subscribe(
			toPusherKey(`user:${sessionId}:incoming_friend_requests`),
		);

		const friendRequestHandler = ({
			senderId,
			senderEmail,
		}: IncomingFriendRequest) => {
			setFriendRequests((prev) => [...prev, { senderId, senderEmail }]);
		};

		pusherClient.bind("incoming_friend_requests", friendRequestHandler);

		return () => {
			pusherClient.unsubscribe(
				toPusherKey(`user:${sessionId}:incoming_friend_requests`),
			);
			pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sessionId]);

	return (
		<div
			className={
				"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
			}
		>
			{friendRequests.length === 0 ? (
				<p className="text-sm text-zinc-500">Nothing to show here...</p>
			) : (
				friendRequests.map((request) => (
					<div key={request.senderId} className="flex gap-4 items-center">
						<UserPlus className="text-black" />
						<AcceptFriend friendRequest={request} />
						<DenyFriend friendRequest={request} />
						<p className="font-medium text-lg">{request.senderEmail}</p>
					</div>
				))
			)}
		</div>
	);
};
