"use server";

import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";

import { sessionModel } from "@/entities/session";
import { friendModel } from "@/entities/friend";

// Widget
// import MobileChatLayout from "@/components/MobileChatLayout";
import { Sidebar } from "@/widgets/sidebar";

import { Test } from "./test";

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
		<div className={"w-full flex h-screen gradient-bg z-0"}>
			<Test />
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
			<aside className={"max-h-screen w-full mx-[20px] my-[30px]"}>
				{children}
			</aside>
		</div>
	);
};

// bg-slate-50
