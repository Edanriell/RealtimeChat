"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { motion } from "framer-motion";

import { messageModel } from "@/entities/message";
import { chatHrefConstructor } from "@/shared/lib";
import { Icon } from "@/shared/ui";

type RecentMessagesProps = {
	recentMessages: Array<messageModel.RecentMessage>;
	session: Session;
};

export const RecentMessages: FC<RecentMessagesProps> = ({
	recentMessages,
	session,
}) => {
	const ChevronRightIcon = Icon["ChevronRight"];

	const [isHovered, setIsHovered] = useState<boolean>(false);

	// const variants = {
	// 	open: {
	// 		scaleX: 1,
	// 	},
	// 	closed: {
	// 		scaleX: 8.75,
	// 	},
	// };

	return (
		<>
			<h1 className={"font-bold text-5xl mb-10"}>Recent messages</h1>
			{recentMessages.length === 0 ? (
				<p className={"text-sm text-black"}>Nothing to show here...</p>
			) : (
				recentMessages.map((friend: any) => (
					<div
						key={friend.id}
						className={
							"relative bg-[white] border-light rounded-[406px] " +
							"flex flex-row-reverse items-center justify-start " +
							"p-[10px] h-[100px]"
						}
					>
						<motion.div
							className={
								"w-[80px] h-[80px] bg-[#5a14de] z-10 " +
								"flex items-center justify-center box-border " +
								"absolute"
							}
							initial={{ borderRadius: 406, overflow: "hidden" }}
							whileHover={{
								width: "100%",
								height: "100%",
								x: 10,
							}}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							<Link
								href={`/dashboard/chat/${chatHrefConstructor(
									session.user.id,
									friend.id,
								)}`}
								className={
									"flex items-center justify-center z-20 " +
									"h-full relative box-border bg-[transparent] w-full"
								}
							></Link>
						</motion.div>
						<ChevronRightIcon
							className={
								"h-7 w-7 text-[white] absolute pointer-events-none " +
								"z-30 right-[32px]"
							}
						/>
						<div
							className={
								"relative flex flex-row items-center justify-center " +
								"gap-x-[20px] pointer-events-none mr-[auto] z-30"
							}
						>
							<Image
								width={80}
								height={80}
								referrerPolicy="no-referrer"
								className={"relative rounded-full"}
								alt={`${friend.name} profile picture`}
								src={friend.image}
							/>
							<div>
								<h4 className={"text-lg font-semibold"}>{friend.name}</h4>
								<p className={"mt-1 max-w-md"}>
									<span className={"text-zinc-400"}>
										{friend.lastMessage.senderId === session.user.id
											? "You: "
											: ""}
									</span>
									{friend.lastMessage.text}
								</p>
							</div>
						</div>
					</div>
				))
			)}
		</>
	);
};
