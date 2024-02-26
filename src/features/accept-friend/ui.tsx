import { FC } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Check, UserPlus, X } from "lucide-react";

import { IncomingFriendRequest } from "@/entities/message/model";

type AcceptFriendProps = {
	friendRequest: IncomingFriendRequest;
};

export const AcceptFriend: FC<AcceptFriendProps> = ({ friendRequest }) => {
	const router = useRouter();

	const acceptFriend = async (senderId: string) => {
		await axios.post("/api/friends/accept", { id: senderId });

		setFriendRequests((prev) =>
			prev.filter((request) => request.senderId !== senderId),
		);

		router.refresh();
	};

	return (
		<button
			onClick={() => acceptFriend(friendRequest.senderId)}
			aria-label="accept friend"
			className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
		>
			<Check className="font-semibold text-white w-3/4 h-3/4" />
		</button>
	);
};
