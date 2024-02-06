"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { motion } from "framer-motion";

import { messageModel } from "@/entities/message";
import { chatHrefConstructor } from "@/shared/lib";
import { Icon, Button } from "@/shared/ui";

type RecentMessagesProps = {
	recentMessages: Array<messageModel.RecentMessage>;
	session: Session;
};

export const RecentMessages: FC<RecentMessagesProps> = ({
	recentMessages,
	session,
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const textVariants = {
		hovered: {
			color: "#FFF",
		},
		notHovered: {
			color: "#000",
		},
	};

	const ChevronRightIcon = Icon["ChevronRight"];
	const ExpandableButton = Button["Expandable"];

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
							"p-[10px] h-[100px] focus:outline-none focus:ring-2 " +
							"focus:ring-[#761beb] focus:ring-offset-2 " +
							"disabled:opacity-50 disabled:pointer-events-none"
						}
						tabIndex={0}
					>
						<ExpandableButton
							variant={"expandable"}
							size={"expandable"}
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
						</ExpandableButton>
						<ChevronRightIcon
							className={
								"h-[30px] w-[30px] text-[white] absolute pointer-events-none " +
								"z-30 right-[35px]"
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
								<motion.h4
									variants={textVariants}
									animate={isHovered ? "hovered" : "notHovered"}
									className={"text-lg font-semibold"}
								>
									{friend.name}
								</motion.h4>
								<motion.p
									variants={textVariants}
									animate={isHovered ? "hovered" : "notHovered"}
									className={"mt-1 max-w-md font-normal"}
								>
									<motion.span
										variants={textVariants}
										animate={isHovered ? "hovered" : "notHovered"}
										className={"text-[#000] font-light"}
									>
										{friend.lastMessage.senderId === session.user.id
											? "You: "
											: ""}
									</motion.span>
									{friend.lastMessage.text}
								</motion.p>
							</div>
						</div>
					</div>
				))
			)}
		</>
	);
};
