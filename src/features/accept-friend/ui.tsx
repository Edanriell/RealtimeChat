import { FC } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { IncomingFriendRequest } from "@/entities/message/model";
import { Icon, Button } from "@/shared/ui";

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

	const AnimatedCircleButton = Button["AnimatedCircle"];
	const CheckIcon = Icon["Check"];

	return (
		<AnimatedCircleButton
			variant={"animatedCircle"}
			onClick={() => acceptFriend(friendRequest.senderId)}
			aria-label="accept friend"
			bgColor={"#5a14de"}
			size={"animatedCircle"}
		>
			<CheckIcon className={"font-semibold text-white w-[25px] h-[25px]"} />
		</AnimatedCircleButton>
	);
};
