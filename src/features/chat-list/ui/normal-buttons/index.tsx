"use client";

import { FC } from "react";
import { motion } from "framer-motion";

import { Message } from "@/entities/message/model";
import { User } from "@/entities/session/model";
import { chatHrefConstructor } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { getFriendInitialLetters } from "@/shared/lib/functions";

type NormalButtonProps = {
	activeChats: User[];
	unseenMessages: Message[];
	sessionId: string;
};

const AnimatedButton = Button["Animated"];

const animatedNormalButtonVariants = {
	displayed: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.25 },
	},
	hidden: {
		opacity: 0,
		scale: 0.4,
		transition: { duration: 0.25 },
	},
};

export const NormalButtons: FC<NormalButtonProps> = ({
	activeChats,
	unseenMessages,
	sessionId,
}) => {
	return (
		<>
			{activeChats.sort().map((friend) => {
				const unseenMessagesCount = unseenMessages.filter(
					(unseenMsg) => unseenMsg.senderId === friend.id,
				).length;

				return (
					<li key={friend.id + "normal"}>
						<a
							href={`/dashboard/chat/${chatHrefConstructor(
								sessionId,
								friend.id,
							)}`}
							tabIndex={1}
							className={"flex items-center gap-x-3 p-2 select-none "}
						>
							<motion.div
								key={`${friend + "-" + friend.id + "-" + "normal"}`}
								variants={animatedNormalButtonVariants}
								initial={"hidden"}
								animate={"displayed"}
								exit={"hidden"}
								className={"w-[60px]"}
							>
								<AnimatedButton
									variant={"animated"}
									type="button"
									className={"w-[100%] h-[40px]"}
								>
									<div className={"flex flex-row items-center justify-center"}>
										<p className={"truncate relative text-white z-20"}>
											{getFriendInitialLetters(friend.name)}
										</p>
										{unseenMessagesCount > 0 && (
											<div
												className={
													"bg-slate-50 font-medium text-xs text-black w-4 h-4 " +
													"rounded-full flex justify-center items-center z-20 " +
													"ml-[4px]"
												}
											>
												{unseenMessagesCount}
											</div>
										)}
									</div>
								</AnimatedButton>
							</motion.div>
						</a>
					</li>
				);
			})}
		</>
	);
};
