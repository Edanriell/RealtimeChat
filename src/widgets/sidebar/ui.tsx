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

export const Sidebar: FC<SidebarProps> = ({
	friends,
	session,
	unseenRequest,
}) => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState("notExpanded");

	const sidebarVariants = {
		notExpanded: {
			width: 100,
			transition: { type: "linear" },
		},
		preExpanded: {
			width: 120,
			transition: { type: "linear" },
		},
		expanded: {
			width: 320,
			transition: { type: "spring" },
		},
	};

	const PlusIcon = Icon["Plus"];
	const MinusIcon = Icon["Minus"];

	return (
		<div className={"flex flex-row items-center gap-x-[20px]"}>
			<motion.div
				variants={sidebarVariants}
				initial={{ width: 120 }}
				animate={
					isSidebarExpanded === "preExpanded"
						? "preExpanded"
						: isSidebarExpanded === "expanded"
							? "expanded"
							: "notExpanded"
				}
				// whileHover={{ width: 360 }}
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
					sidebarStatus={isSidebarExpanded}
				/>
				<Overview
					sessionId={session.user.id}
					initialUnseenRequestCount={unseenRequest}
				/>
				<UserProfile session={session} />
			</motion.div>
			<motion.div
				onHoverStart={() => {
					if (isSidebarExpanded !== "expanded")
						setIsSidebarExpanded("preExpanded");
				}}
				onHoverEnd={() => {
					if (isSidebarExpanded !== "expanded")
						setIsSidebarExpanded("notExpanded");
				}}
			>
				{isSidebarExpanded !== "expanded" ? (
					<PlusIcon
						onClick={() => setIsSidebarExpanded("expanded")}
						className={"text-slate-400 w-[36px] h-[36px] mr-[30px]"}
					/>
				) : (
					<MinusIcon
						onClick={() => setIsSidebarExpanded("notExpanded")}
						className={"text-slate-400 w-[36px] h-[36px] mr-[25px]"}
					/>
				)}
			</motion.div>
		</div>
	);
};
