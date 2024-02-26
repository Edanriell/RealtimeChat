import { FC } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Check, UserPlus, X } from "lucide-react";

import { IncomingFriendRequest } from "@/entities/message/model";

type DenyFriendProps = {
	friendRequest: IncomingFriendRequest;
};

export const DenyFriend: FC<DenyFriendProps> = ({ friendRequest }) => {
	const router = useRouter();

	const denyFriend = async (senderId: string) => {
		await axios.post("/api/friends/deny", { id: senderId });

		setFriendRequests((prev) =>
			prev.filter((request) => request.senderId !== senderId),
		);

		router.refresh();
	};

	return (
		<button
			onClick={() => denyFriend(friendRequest.senderId)}
			aria-label="deny friend"
			className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
		>
			<X className="font-semibold text-white w-3/4 h-3/4" />
		</button>
	);
};
