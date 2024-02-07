"use client";

import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { messageModel } from "@/entities/message";
import { formatTimestamp, cn, toPusherKey } from "@/shared/lib";

import { pusherClient } from "@/lib/pusher";

type MessagesProps = {
	initialMessages: messageModel.ValidatedMessage[];
	sessionId: string;
	chatId: string;
	sessionImg: string | null | undefined;
	chatPartner: User;
};

const Messages: FC<MessagesProps> = ({
	initialMessages,
	sessionId,
	chatId,
	chatPartner,
	sessionImg,
}) => {
	const [messages, setMessages] =
		useState<messageModel.ValidatedMessage[]>(initialMessages);

	useEffect(() => {
		pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

		const messageHandler = (message: messageModel.ValidatedMessage) => {
			setMessages((prev) => [message, ...prev]);
		};

		pusherClient.bind("incoming-message", messageHandler);

		return () => {
			pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
			pusherClient.unbind("incoming-message", messageHandler);
		};
	}, [chatId]);

	const scrollDownRef = useRef<HTMLDivElement | null>(null);

	return (
		<div
			id="messages"
			className={
				"flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto " +
				"scrollbar-thumb-indigo scrollbar-thumb-rounded scrollbar-track-glass " +
				"scrollbar-w-2 scrolling-touch"
			}
		>
			<div ref={scrollDownRef} />
			{messages.map((message, index) => {
				const isCurrentUser = message.senderId === sessionId;

				const hasNextMessageFromSameUser =
					messages[index - 1]?.senderId === messages[index].senderId;

				return (
					<div
						className={"chat-message"}
						key={`${message.id}-${message.timestamp}`}
					>
						<div
							className={cn("flex items-end", {
								"justify-end": isCurrentUser,
							})}
						>
							<div
								className={cn(
									"flex flex-col space-y-2 text-base max-w-xs mx-2",
									{
										"order-1 items-end": isCurrentUser,
										"order-2 items-start": !isCurrentUser,
									},
								)}
							>
								<span
									className={cn("px-4 py-2 rounded-lg inline-block", {
										"bg-[#5a14de] text-white": isCurrentUser,
										"bg-white text-black": !isCurrentUser,
										"rounded-br-none":
											!hasNextMessageFromSameUser && isCurrentUser,
										"rounded-bl-none":
											!hasNextMessageFromSameUser && !isCurrentUser,
									})}
								>
									{message.text}{" "}
									<span className={"ml-2 text-xs text-gray-400"}>
										{formatTimestamp(message.timestamp)}
									</span>
								</span>
							</div>
							<div
								className={cn("relative w-6 h-6", {
									"order-2": isCurrentUser,
									"order-1": !isCurrentUser,
									invisible: hasNextMessageFromSameUser,
								})}
							>
								<Image
									fill
									src={
										isCurrentUser ? (sessionImg as string) : chatPartner.image
									}
									alt="Profile picture"
									referrerPolicy="no-referrer"
									className={"rounded-full"}
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Messages;
