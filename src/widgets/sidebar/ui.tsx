"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { UserProfile } from "@/widgets/user-profile";
import { ChatList } from "@/features/chat-list";
import { Overview } from "@/features/overview";

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
	return (
		<motion.div
			style={{
				background: "rgba(255, 255, 255, 0.2)",
				boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
				backdropFilter: "blur(5px)",
				WebkitBackdropFilter: "blur(5px)",
				borderTopRightRadius: "20px",
				borderBottomRightRadius: "20px",
				border: "1px solid rgba(255, 255, 255, 0.3)",
			}}
			initial={{ width: 100 }}
			whileHover={{ width: [null, 400, 320] }}
			transition={{ duration: 0.25 }}
			className={
				"hidden md:flex h-full " +
				"flex-col gap-y-5 overflow-y-auto border-r border-gray-200 " +
				"bg-white px-6 items-center py-[60px] z-10 shadow-soft"
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
					width={60}
					height={60}
				/>
			</Link>
			<ChatList sessionId={session.user.id} friends={friends} />
			<Overview
				sessionId={session.user.id}
				initialUnseenRequestCount={unseenRequest}
			/>
			<UserProfile session={session} />
		</motion.div>
	);
};
