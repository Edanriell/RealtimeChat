"use server";

import { Icon, Icons } from "@/components/Icons";
import SignOutButton from "@/components/SignOutButton";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import FriendRequestSidebarOptions from "@/components/FriendRequestSidebarOptions";
import SidebarChatList from "@/components/SidebarChatList";
import MobileChatLayout from "@/components/MobileChatLayout";
import { SidebarOption } from "@/types/typings";
import { Logotype } from "./logotype";

import { sessionModel } from "@/entities/session";
import { friendModel } from "@/entities/friend";

import { Sidebar } from "./sidebar";

type DashboardLayoutProps = {
	children: ReactNode;
};

const sidebarOptions: SidebarOption[] = [
	{
		id: 1,
		name: "Add friend",
		href: "/dashboard/add",
		Icon: "UserPlus",
	},
];

export const DashboardLayout: FC<DashboardLayoutProps> = async ({
	children,
}) => {
	const session = await sessionModel.getSession();
	if (!session) notFound();

	const friends = await friendModel.getFriendsByUserId(session.user.id);

	const unseenRequest = await (
		friendModel.unseenFriendsRequests(
			session.user.id,
		) as unknown as sessionModel.User[]
	).length;

	return (
		<div className={"w-full flex h-screen bg-slate-50"}>
			<div className={"md:hidden"}>
				<MobileChatLayout
					friends={friends}
					session={session}
					sidebarOptions={sidebarOptions}
					unseenRequestCount={unseenRequest}
				/>
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
