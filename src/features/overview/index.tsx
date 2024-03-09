import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { messageModel } from "@/entities/message";
import { toPusherKey } from "@/shared/lib";

import { SmallButtons, NormalButtons } from "./ui";

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

	return (
		<div className={"flex flex-col items-center justify-center gap-y-[10px]"}>
			<p className={"text-md font-medium leading-6 text-black"}>Overview</p>
			<nav>
				<ul className={"flex flex-col items-center justify-center"}>
					<AnimatePresence initial={false} mode="wait">
						{sidebarState === "expanded" && (
							<motion.div key="normal-buttons">
								<NormalButtons unseenRequestCount={unseenRequestCount} />
							</motion.div>
						)}
						{sidebarState === "collapsed" && (
							<motion.div key="small-buttons">
								<SmallButtons unseenRequestCount={unseenRequestCount} />
							</motion.div>
						)}
					</AnimatePresence>
				</ul>
			</nav>
		</div>
	);
};
