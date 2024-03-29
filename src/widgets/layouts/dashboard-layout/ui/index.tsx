"use server";

import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";

import { sessionModel } from "@/entities/session";
import { friendModel } from "@/entities/friend";

import { Sidebar } from "@/widgets/sidebar";

import { GradientCircles } from "./gradient-circles";

type DashboardLayoutProps = {
	children: ReactNode;
};

export const DashboardLayout: FC<DashboardLayoutProps> = async ({
	children,
}) => {
	const { getSession } = sessionModel;
	const { getFriendsByUserId, unseenFriendsRequests } = friendModel;

	const session = await getSession();
	if (!session) notFound();

	const friends = await getFriendsByUserId(session.user.id);

	const unseenRequest = await unseenFriendsRequests(session.user.id);

	return (
		<div
			className={
				"w-full flex h-screen z-0 gradient-background bg-gradient-purple"
			}
		>
			<GradientCircles interactiveCircle={true} animatedCircles={false} />
			<Sidebar
				friends={friends}
				session={session}
				unseenRequest={unseenRequest}
			/>
			<aside
				className={
					"max-h-screen w-full mx-[20px] my-[30px] ml-[100px] md:ml-[20px]"
				}
			>
				{children}
			</aside>
		</div>
	);
};
