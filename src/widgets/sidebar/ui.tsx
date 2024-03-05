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
		<div className={"flex flex-row items-center gap-x-[20px]"}>
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
					className={"flex shrink-0 items-center mb-[40px]"}
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
			<div>
				{sidebarState === "collapsed" ? (
					<PlusIcon
						onClick={() => setSidebarState("expanded")}
						className={"text-slate-400 w-[36px] h-[36px] mr-[30px]"}
					/>
				) : (
					<MinusIcon
						onClick={() => setSidebarState("collapsed")}
						className={"text-slate-400 w-[36px] h-[36px] mr-[25px]"}
					/>
				)}
			</div>
		</div>
	);
};
