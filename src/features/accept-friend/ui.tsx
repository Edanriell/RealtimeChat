import { FC } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { IncomingFriendRequest } from "@/entities/message/model";
import { Icon } from "@/shared/ui";

type AcceptFriendProps = {
	friendRequest: IncomingFriendRequest;
	setFriendRequests: any;
};

export const AcceptFriend: FC<AcceptFriendProps> = ({
	friendRequest,
	setFriendRequests,
}) => {
	const router = useRouter();

	const acceptFriend = async (senderId: string) => {
		await axios.post("/api/friends/accept", { id: senderId });

		setFriendRequests((prev: any) =>
			prev.filter((request: any) => request.senderId !== senderId),
		);

		router.refresh();
	};

	const CheckIcon = Icon["Check"];

	return (
		<button
			onClick={() => acceptFriend(friendRequest.senderId)}
			aria-label="accept friend"
			className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
		>
			<CheckIcon className="font-semibold text-white w-3/4 h-3/4" />
		</button>
	);
};
