"use client";

import { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import { messageModel } from "@/entities/message";

import { chatHrefConstructor, toPusherKey } from "@/shared/lib";
import { Button, UnseenChatToast } from "@/shared/ui";
import { getFriendInitialLetters } from "@/shared/lib/functions";
import { User } from "@/entities/session/model";
import { Message } from "@/entities/message/model";

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

	const AnimatedButton = Button["Animated"];

	const animatedSmallButtonVariants = {
		displayed: {
			opacity: 1,
			scale: 1,
			// transition: { type: "linear", duration: 0.2 },
		},
		hidden: {
			opacity: 0,
			scale: 0,
			// transition: { type: "linear", duration: 0.2 },
		},
	};

	const animatedNormalButtonVariants = {
		displayed: {
			opacity: 1,
			scale: 1,
			// transition: { type: "linear", duration: 0.2 },
		},
		hidden: {
			opacity: 0,
			scale: 0,
			// transition: { type: "linear", duration: 0.2 },
		},
	};

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
							{activeChats.sort().map((friend) => {
								const unseenMessagesCount = unseenMessages.filter(
									(unseenMsg) => {
										return unseenMsg.senderId === friend.id;
									},
								).length;

								if (sidebarState === "expanded") {
									return (
										<motion.li
											initial={"hidden"}
											variants={animatedNormalButtonVariants}
											animate={
												sidebarState === "expanded" ? "displayed" : "hidden"
											}
											key={friend.id}
										>
											<a
												href={`/dashboard/chat/${chatHrefConstructor(
													sessionId,
													friend.id,
												)}`}
												tabIndex={1}
												className={
													"flex items-center gap-x-3 p-2 " + "select-none "
												}
											>
												<div className={"w-[180px]"}>
													<AnimatedButton
														variant={"animated"}
														type="button"
														className={"w-[100%] h-[40px]"}
													>
														<div
															className={
																"flex flex-row items-center justify-center"
															}
														>
															<p
																className={"truncate relative text-white z-20"}
															>
																{friend.name}
															</p>
															{unseenMessagesCount > 0 ? (
																<div
																	className={
																		"bg-slate-50 font-medium text-xs text-black w-4 h-4 " +
																		"rounded-full flex justify-center items-center z-20 " +
																		"ml-[4px]"
																	}
																>
																	{unseenMessagesCount}
																</div>
															) : null}
														</div>
													</AnimatedButton>
												</div>
											</a>
										</motion.li>
									);
								} else {
									return (
										<li key={friend.id}>
											<motion.a
												// key={`${friend + friend.id + index + "small"}`}
												initial={"displayed"}
												variants={animatedSmallButtonVariants}
												animate={
													sidebarState === "expanded" ? "hidden" : "displayed"
												}
												href={`/dashboard/chat/${chatHrefConstructor(
													sessionId,
													friend.id,
												)}`}
												tabIndex={1}
												className={
													"flex items-center gap-x-3 p-2 " + "select-none "
												}
											>
												<div className={"w-[60px]"}>
													<AnimatedButton
														variant={"animated"}
														type="button"
														className={"w-[100%] h-[40px]"}
													>
														<div
															className={
																"flex flex-row items-center justify-center"
															}
														>
															<p
																className={"truncate relative text-white z-20"}
															>
																{getFriendInitialLetters(friend.name)}
															</p>
															{unseenMessagesCount > 0 ? (
																<div
																	className={
																		"bg-slate-50 font-medium text-xs text-black w-4 h-4 " +
																		"rounded-full flex justify-center items-center z-20 " +
																		"ml-[4px]"
																	}
																>
																	{unseenMessagesCount}
																</div>
															) : null}
														</div>
													</AnimatedButton>
												</div>
											</motion.a>
										</li>
									);
								}
							})}
						</ul>
					</nav>
				</div>
			) : null}
		</>
	);
};
