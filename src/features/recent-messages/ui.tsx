"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";

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
							"relative bg-[white] border-light p-3 rounded-[406px] " +
							"flex flex-row-reverse items-center justify-between"
						}
					>
						<div
							className={
								"flex items-center justify-center " +
								"w-[80px] h-[80px] bg-[#5a14de] rounded-full"
							}
						>
							<ChevronRightIcon className={"h-7 w-7 text-[white]"} />
						</div>
						<Link
							href={`/dashboard/chat/${chatHrefConstructor(
								session.user.id,
								friend.id,
							)}`}
							className={
								"relative flex flex-row items-center justify-start " +
								"gap-x-[20px]"
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
						</Link>
					</div>
				))
			)}
		</>
	);
};
