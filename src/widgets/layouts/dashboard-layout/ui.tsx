"use server";

import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";

import { sessionModel } from "@/entities/session";
import { friendModel } from "@/entities/friend";

// Widget
// import MobileChatLayout from "@/components/MobileChatLayout";
import { Sidebar } from "@/widgets/sidebar";

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

	const unseenRequest = await (
		unseenFriendsRequests(session.user.id) as unknown as sessionModel.User[]
	).length;

	return (
		<div className={"w-full flex h-screen bg-slate-50"}>
			<div className={"md:hidden"}>
				{/* <MobileChatLayout
					friends={friends}
					session={session}
					sidebarOptions={sidebarOptions}
					unseenRequestCount={unseenRequest}
				/> */}
			</div>
			<Sidebar
				friends={friends}
				session={session}
				unseenRequest={unseenRequest}
			/>
			<aside className="max-h-screen container py-16 md:py-12 w-full">
				{children}
			</aside>
		</div>
	);
};
