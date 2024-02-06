"use server";

import { FC } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { sessionModel } from "@/entities/session";
import { friendModel } from "@/entities/friend";
import { RecentMessages } from "@/features/recent-messages";

export const DashboardPage: FC = async () => {
	const { authOptions } = sessionModel;
	const { getFriendsByUserId, friendsWithLastMessage } = friendModel;

	const session = await getServerSession(authOptions);
	if (!session) notFound();

	const friends = await getFriendsByUserId(session.user.id);

	const recentMessages = await friendsWithLastMessage(friends, session.user.id);

	return (
		<div
			className={
				"w-full h-full p-[60px] shadow-soft glassmorphism rounded-[20px]"
			}
		>
			<RecentMessages session={session} recentMessages={recentMessages} />
		</div>
	);
};
