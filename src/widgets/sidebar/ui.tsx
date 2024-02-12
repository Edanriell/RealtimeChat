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
			initial={{ width: 100 }}
			whileHover={{ width: [null, 400, 320] }}
			transition={{ duration: 0.25 }}
			className={
				"hidden md:flex h-full py-[60px] z-10 " +
				"flex-col gap-y-5 overflow-y-auto px-6 items-center " +
				"rounded-tr-[20px] rounded-br-[20px] shadow-soft " +
				"glassmorphic-element glassmorphic-element__border_position_right"
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
