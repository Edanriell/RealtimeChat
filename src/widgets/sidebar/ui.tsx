"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { UserProfile } from "@/widgets/user-profile";
import { ChatList } from "@/features/chat-list";
import { Overview } from "@/features/overview";
import { Icon } from "@/shared/ui";

type SidebarProps = {
	friends: any;
	session: any;
	unseenRequest: any;
};

type SidebarState = "collapsed" | "expanded";

export const Sidebar: FC<SidebarProps> = ({
	friends,
	session,
	unseenRequest,
}) => {
	const [sidebarState, setSidebarState] = useState<SidebarState>("collapsed");

	const sidebarVariants = {
		collapsed: {
			width: 100,
			transition: { type: "linear" },
		},
		expanded: {
			width: 320,
			transition: { type: "linear" },
		},
	};

	const PlusIcon = Icon["Plus"];
	const MinusIcon = Icon["Minus"];

	return (
		<div className={"flex flex-row items-center gap-x-[10px]"}>
			<motion.div
				initial={"collapsed"}
				variants={sidebarVariants}
				animate={sidebarState === "collapsed" ? "collapsed" : "expanded"}
				className={
					"hidden md:flex h-full py-[60px] z-10 " +
					"flex-col gap-y-5 overflow-y-auto px-6 items-center " +
					"rounded-tr-[20px] rounded-br-[20px] shadow-soft " +
					"glassmorphic-element glassmorphic-element__border_position_right " +
					"overflow-x-hidden"
				}
			>
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
				<ChatList
					sessionId={session.user.id}
					friends={friends}
					sidebarState={sidebarState}
				/>
				<Overview
					sessionId={session.user.id}
					initialUnseenRequestCount={unseenRequest}
					sidebarState={sidebarState}
				/>
				<UserProfile session={session} sidebarState={sidebarState} />
			</motion.div>
			<motion.div
				className={"cursor-pointer mr-[10px] rounded-[406px]"}
				initial={{ color: "#5a14de" }}
				whileHover={{ scale: 1.05, color: "#761beb" }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: "spring", stiffness: 400, damping: 10 }}
			>
				{sidebarState === "collapsed" ? (
					<PlusIcon
						onClick={() => setSidebarState("expanded")}
						className={"w-[36px] h-[36px] focus:outline-none"}
					/>
				) : (
					<MinusIcon
						onClick={() => setSidebarState("collapsed")}
						className={"w-[36px] h-[36px]"}
					/>
				)}
			</motion.div>
		</div>
	);
};
