import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import { UserProfile } from "@/widgets/user-profile";
import { ChatList } from "@/features/chat-list";
import { Overview } from "@/features/overview";

import { MobileSidebarNavigationItem } from "./mobile-sidebar-navigation-item";

type MobileSidebarNavigationProps = {
	session: any;
	friends: any;
	initialUnseenRequestCount: any;
	isMobileSidebarOpen: boolean;
};

const MobileSidebarNavigationVariants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

export const MobileSidebarNavigation: FC<MobileSidebarNavigationProps> = ({session,friends,initialUnseenRequestCount,isMobileSidebarOpen}) => {
	const mobileSidebarComponents = [
		{
			Component: () => (
				<Link
					href="/dashboard"
					className={
						"flex shrink-0 items-center mb-[40px] rounded-[406px] " +
						"focus:outline-none focus:ring-2 focus:ring-[#761beb] " +
						"focus:ring-offset-2"
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
			classes: "mt-[auto]"
		},
	];

	const mobileSidebarNavigationClasses = classNames({
		"pointer-events-none": !isMobileSidebarOpen
	})

	return (
		<motion.ul
			className={
				mobileSidebarNavigationClasses + " " +
				"mobile-sidebar__navigation flex flex-col "
				+ "items-center relative h-full "
			}
			variants={MobileSidebarNavigationVariants}
		>
			{mobileSidebarComponents.map(({ Component, classes }, index) => (
				<MobileSidebarNavigationItem classes={classes} key={index}>
					<Component />
				</MobileSidebarNavigationItem>
			))}
		</motion.ul>
	);
};
