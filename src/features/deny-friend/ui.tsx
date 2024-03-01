import { FC } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { IncomingFriendRequest } from "@/entities/message/model";
import { Icon, Button } from "@/shared/ui";

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

	const AnimatedCircleButton = Button["AnimatedCircle"];
	const CrossIcon = Icon["Cross"];

	return (
		<AnimatedCircleButton
			variant={"animatedCircle"}
			onClick={() => denyFriend(friendRequest.senderId)}
			aria-label="deny friend"
			bgColor={"red"}
			size={"animatedCircle"}
		>
			<CrossIcon className="font-semibold text-white w-[25px] h-[25px]" />
		</AnimatedCircleButton>
	);
};
