"use client";

import { FC } from "react";

type FriendRequestsProps = {
	incomingFriendRequests: IncomingFriendRequest[];
	sessionId: string;
};

export const FriendRequests: FC<FriendRequestsProps> = () => {
	return (
		<div
			className={
				"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
			}
		></div>
	);
};
