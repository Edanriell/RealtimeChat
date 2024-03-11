"use client";

import { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import { messageModel } from "@/entities/message";

import { chatHrefConstructor, toPusherKey } from "@/shared/lib";
import { UnseenChatToast } from "@/shared/ui";
import { User } from "@/entities/session/model";
import { Message } from "@/entities/message/model";

import { SmallButtons, NormalButtons } from "./ui";

type ChatListProps = {
	friends: User[];
	sessionId: string;
	sidebarState: string;
};

interface ExtendedMessage extends Message {
	senderImg: string;
	senderName: string;
}

export const ChatList: FC<ChatListProps> = ({
	friends,
	sessionId,
	sidebarState,
}) => {
	const { pusherClient } = messageModel;

	const router = useRouter();
	const pathname = usePathname();

	const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
	const [activeChats, setActiveChats] = useState<User[]>(friends);

	useEffect(() => {
		pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
		pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

		const newFriendHandler = (newFriend: User) => {
			setActiveChats((prev) => [...prev, newFriend]);
		};

		const chatHandler = (message: ExtendedMessage) => {
			const shouldNotify =
				pathname !==
				`/dashboard/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

			if (!shouldNotify) return;

			toast.custom((customToast) => (
				<UnseenChatToast
					customToast={customToast}
					sessionId={sessionId}
					senderId={message.senderId}
					senderImg={message.senderImg}
					senderMessage={message.text}
					senderName={message.senderName}
				/>
			));

			setUnseenMessages((prev) => [...prev, message]);
		};

		pusherClient.bind("new_message", chatHandler);
		pusherClient.bind("new_friend", newFriendHandler);

		return () => {
			pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
			pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

			pusherClient.unbind("new_message", chatHandler);
			pusherClient.unbind("new_friend", newFriendHandler);
		};
	}, [pathname, sessionId, router, pusherClient]);

	useEffect(() => {
		if (pathname?.includes("chat")) {
			setUnseenMessages((prev) => {
				return prev.filter((msg) => !pathname.includes(msg.senderId));
			});
		}
	}, [pathname]);

	return (
		<>
			{friends.length > 0 ? (
				<div className={"flex flex-col items-center gap-y-[10px] "}>
					<p className={"text-md font-medium leading-6 text-black text-center"}>
						{sidebarState === "expanded" ? "Your chats" : "Chats"}
					</p>
					<nav>
						<ul
							role="list"
							className={
								"flex flex-col items-center justify-center max-h-[25rem] " +
								"overflow-y-auto -mx-2 space-y-1"
							}
						>
							<AnimatePresence initial={false} mode="wait">
								{sidebarState === "expanded" && (
									<motion.div key="small-buttons">
										<NormalButtons
											activeChats={activeChats}
											unseenMessages={unseenMessages}
											sessionId={sessionId}
										/>
									</motion.div>
								)}
								{sidebarState === "collapsed" && (
									<motion.div key="normal-buttons">
										<SmallButtons
											activeChats={activeChats}
											unseenMessages={unseenMessages}
											sessionId={sessionId}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</ul>
					</nav>
				</div>
			) : null}
		</>
	);
};
