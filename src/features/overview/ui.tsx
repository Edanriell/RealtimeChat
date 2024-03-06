import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { messageModel } from "@/entities/message";

import { toPusherKey } from "@/shared/lib";
import { Button, Icon } from "@/shared/ui";

type OverviewProps = {
	sessionId: string;
	initialUnseenRequestCount: number;
	sidebarState: string;
};

export const Overview: FC<OverviewProps> = ({
	sessionId,
	initialUnseenRequestCount,
	sidebarState,
}) => {
	const { pusherClient } = messageModel;

	const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
		(initialUnseenRequestCount as unknown as string[]).length,
	);

	useEffect(() => {
		pusherClient.subscribe(
			toPusherKey(`user:${sessionId}:incoming_friend_requests`),
		);
		pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

		const friendRequestHandler = () => {
			setUnseenRequestCount((prev) => prev + 1);
		};

		const addedFriendHandler = () => {
			setUnseenRequestCount((prev) => prev - 1);
		};

		pusherClient.bind("incoming_friend_requests", friendRequestHandler);
		pusherClient.bind("new_friend", addedFriendHandler);

		return () => {
			pusherClient.unsubscribe(
				toPusherKey(`user:${sessionId}:incoming_friend_requests`),
			);
			pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

			pusherClient.unbind("new_friend", addedFriendHandler);
			pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
		};
	}, [pusherClient, sessionId]);

	const AnimatedButton = Button["Animated"];

	const UserPlusIcon = Icon["UserPlus"];
	const UserIcon = Icon["User"];

	const animatedButtonVariants = {
		expanded: {
			width: "180px",
			transition: { type: "linear", duration: 0.2 },
		},
		collapsed: {
			width: "60px",
			transition: { type: "linear", duration: 0.2 },
		},
	};

	return (
		<div className={"flex flex-col items-center justify-center gap-y-[10px]"}>
			<p className={"text-md font-medium leading-6 text-black"}>Overview</p>
			<nav>
				<ul className={"flex flex-col items-center justify-center"}>
					<li className={"p-2"}>
						<Link
							href={"/dashboard/add"}
							className={"select-none"}
							tabIndex={1}
						>
							<motion.div
								initial={"collapsed"}
								variants={animatedButtonVariants}
								animate={sidebarState === "expanded" ? "expanded" : "collapsed"}
							>
								<AnimatedButton
									variant={"animated"}
									type="button"
									className={"w-[100%] h-[40px]"}
								>
									<div
										className={
											"flex flex-row items-center justify-center gap-x-[4px]"
										}
									>
										<UserPlusIcon
											className={"text-white z-20 w-[20px] h-[20px]"}
										/>
										{sidebarState === "expanded" ? (
											<p className={"truncate relative text-white z-20"}>
												Add friend
											</p>
										) : null}
									</div>
								</AnimatedButton>
							</motion.div>
						</Link>
					</li>
					<li>
						<Link
							href="/dashboard/requests"
							className="select-none"
							tabIndex={1}
						>
							<motion.div
								initial={"collapsed"}
								variants={animatedButtonVariants}
								animate={sidebarState === "expanded" ? "expanded" : "collapsed"}
							>
								<AnimatedButton
									variant={"animated"}
									type="button"
									className={"w-[100%] h-[40px]"}
								>
									<div
										className={
											"flex flex-row items-center justify-center gap-x-[4px]"
										}
									>
										<UserIcon className={"text-white z-20 w-[20px] h-[20px]"} />
										{sidebarState === "expanded" ? (
											<p className={"truncate text-white z-20"}>
												Friend requests
											</p>
										) : null}
										{unseenRequestCount > 0 ? (
											<div
												className={
													"bg-slate-50 font-medium text-xs text-black w-4 h-4 " +
													"rounded-full flex justify-center items-center z-20 " +
													"ml-[4px]"
												}
											>
												{unseenRequestCount}
											</div>
										) : null}
									</div>
								</AnimatedButton>
							</motion.div>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
