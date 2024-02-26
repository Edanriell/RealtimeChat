import { FC } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { sessionModel } from "@/entities/session";
import { FriendRequests } from "@/widgets/friend-requests";
import { fetchRedis } from "@/shared/api";
import { User } from "@/entities/session/model";

export const FriendRequestsPage: FC = async () => {
	const { authOptions } = sessionModel;

	const session = await getServerSession(authOptions);
	if (!session) notFound();

	// const incomingSenderIds = (await fetchRedis(
	// 	"smembers",
	// 	`user:${session.user.id}:incoming_friend_requests`,
	// )) as string[];

	// const incomingFriendRequests = await Promise.all(
	// 	incomingSenderIds.map(async (senderId) => {
	// 		const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
	// 		const senderParsed = JSON.parse(sender) as User;

	// 		return {
	// 			senderId,
	// 			senderEmail: senderParsed.email,
	// 		};
	// 	}),
	// );

	return (
		<div
			className={
				"w-full h-full p-[60px] rounded-[20px] shadow-soft " +
				"glassmorphic-element glassmorphic-element__border " +
				"relative"
			}
		>
			<h1 className={"font-bold text-5xl mb-8 text-center"}>Friend requests</h1>
			<FriendRequests sessionId={session.user.id} />
		</div>
	);
};
