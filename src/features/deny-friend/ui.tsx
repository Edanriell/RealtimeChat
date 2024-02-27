import { FC } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { IncomingFriendRequest } from "@/entities/message/model";
import { Icon } from "@/shared/ui";

type DenyFriendProps = {
	friendRequest: IncomingFriendRequest;
	setFriendRequests: any;
};

export const DenyFriend: FC<DenyFriendProps> = ({
	friendRequest,
	setFriendRequests,
}) => {
	const router = useRouter();

	const denyFriend = async (senderId: string) => {
		await axios.post("/api/friends/deny", { id: senderId });

		setFriendRequests((prev: any) =>
			prev.filter((request: any) => request.senderId !== senderId),
		);

		router.refresh();
	};

	const CrossIcon = Icon["Cross"];

	return (
		<button
			onClick={() => denyFriend(friendRequest.senderId)}
			aria-label="deny friend"
			className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
		>
			<CrossIcon className="font-semibold text-white w-3/4 h-3/4" />
		</button>
	);
};
