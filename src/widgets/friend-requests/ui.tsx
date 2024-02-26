"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Check, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { messageModel } from "@/entities/message";
import { toPusherKey } from "@/shared/lib";

type FriendRequestsProps = {
	incomingFriendRequests: IncomingFriendRequest[];
	sessionId: string;
};

export const FriendRequests: FC<FriendRequestsProps> = ({
	incomingFriendRequests,
	sessionId,
}) => {
	const { pusherClient } = messageModel;

	const router = useRouter();

	const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
		incomingFriendRequests,
	);

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

	const acceptFriend = async (senderId: string) => {
		await axios.post("/api/friends/accept", { id: senderId });

		setFriendRequests((prev) =>
			prev.filter((request) => request.senderId !== senderId),
		);

		router.refresh();
	};

	const denyFriend = async (senderId: string) => {
		await axios.post("/api/friends/deny", { id: senderId });

		setFriendRequests((prev) =>
			prev.filter((request) => request.senderId !== senderId),
		);

		router.refresh();
	};

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
						<p className="font-medium text-lg">{request.senderEmail}</p>
						<button
							onClick={() => acceptFriend(request.senderId)}
							aria-label="accept friend"
							className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
						>
							<Check className="font-semibold text-white w-3/4 h-3/4" />
						</button>

						<button
							onClick={() => denyFriend(request.senderId)}
							aria-label="deny friend"
							className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
						>
							<X className="font-semibold text-white w-3/4 h-3/4" />
						</button>
					</div>
				))
			)}
		</div>
	);
};
