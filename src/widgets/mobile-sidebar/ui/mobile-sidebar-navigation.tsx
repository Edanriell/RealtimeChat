import { FC, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { UserProfile } from "@/widgets/user-profile";
import { MobileSidebar } from "@/widgets/mobile-sidebar";
import { ChatList } from "@/features/chat-list";
import { Overview } from "@/features/overview";

import { MobileSidebarNavigationItem } from "./mobile-sidebar-navigation-item";

type MobileSidebarNavigationProps = {
	session: any;
	sessionId: any;
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
	sessionId,
	friends,
	initialUnseenRequestCount,
}) => {
	const components = [
		{
			Component: () => (
				<Link
					href="/dashboard"
					className={
						"flex shrink-0 items-center mb-[40px] rounded-[406px] " +
						"focus:outline-none focus:ring-2 focus:ring-[#761beb] focus:ring-offset-2"
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
				<UserProfile session={session} sidebarState={"expanded"} />
			),
		},
	];

	return (
		<motion.ul
			className={"mobile-sidebar__navigation"}
			variants={MobileSidebarNavigationVariants}
		>
			{components.map(({ Component }, index) => (
				<MobileSidebarNavigationItem index={index} key={index}>
					<Component />
				</MobileSidebarNavigationItem>
			))}
			{/* <li className={"mobile-sidebar__navigation-item"}>
				<Link
					href="/dashboard"
					className={
						"flex shrink-0 items-center mb-[40px] rounded-[406px] " +
						"focus:outline-none focus:ring-2 focus:ring-[#761beb] focus:ring-offset-2"
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
			</li>
			<li className={"mobile-sidebar__navigation-item"}>
				<ChatList
					sessionId={session.user.id}
					friends={friends}
					sidebarState={"expanded"}
				/>
			</li>
			<li className={"mobile-sidebar__navigation-item"}>
				<Overview
					sessionId={session.user.id}
					initialUnseenRequestCount={initialUnseenRequestCount}
					sidebarState={"expanded"}
				/>
			</li>
			<li className={"mobile-sidebar__navigation-item"}>
				<UserProfile session={session} sidebarState={"expanded"} />
			</li> */}
		</motion.ul>
	);
};

// GradientCircles fix
