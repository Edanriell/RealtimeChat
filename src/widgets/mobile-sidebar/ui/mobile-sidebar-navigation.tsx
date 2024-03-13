import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { UserProfile } from "@/widgets/user-profile";
import { ChatList } from "@/features/chat-list";
import { Overview } from "@/features/overview";

import { MobileSidebarNavigationItem } from "./mobile-sidebar-navigation-item";

type MobileSidebarNavigationProps = {
	session: any;
	friends: any;
	initialUnseenRequestCount: any;
};

const MobileSidebarNavigationVariants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

export const MobileSidebarNavigation: FC<MobileSidebarNavigationProps> = ({
	session,
	friends,
	initialUnseenRequestCount,
}) => {
	const mobileSidebarComponents = [
		{
			Component: () => (
				<Link
					href="/dashboard"
					className={
						"flex shrink-0 items-center mb-[40px] rounded-[406px] " +
						"focus:outline-none focus:ring-2 focus:ring-[#761beb] " +
						"focus:ring-offset-2 mt-[100px]"
					}
				>
					<Image
						style={{ objectFit: "contain" }}
						src="/images/chatx-logo-bubble.png"
						alt="ChatX company logotype"
						width={70}
						height={70}
					/>
				</Link>
			),
		},
		{
			Component: () => (
				<ChatList
					sessionId={session.user.id}
					friends={friends}
					sidebarState={"expanded"}
				/>
			),
		},
		{
			Component: () => (
				<Overview
					sessionId={session.user.id}
					initialUnseenRequestCount={initialUnseenRequestCount}
					sidebarState={"expanded"}
				/>
			),
		},
		{
			Component: () => (
				<div className={"mt-auto"}>
					<UserProfile session={session} sidebarState={"expanded"} />
				</div>
			),
		},
	];

	return (
		<motion.ul
			className={
				"mobile-sidebar__navigation flex flex-col "
				+ "items-center relative"
			}
			variants={MobileSidebarNavigationVariants}
		>
			{mobileSidebarComponents.map(({ Component }, index) => (
				<MobileSidebarNavigationItem index={index} key={index}>
					<Component />
				</MobileSidebarNavigationItem>
			))}
		</motion.ul>
	);
};

// GradientCircles fix
