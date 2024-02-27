import { FC } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { sessionModel } from "@/entities/session";
import { FriendRequests } from "@/widgets/friend-requests";

export const FriendRequestsPage: FC = async () => {
	const { authOptions } = sessionModel;

	const session = await getServerSession(authOptions);
	if (!session) notFound();

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
