import { FC } from "react";

import { AddFriend } from "@/features/add-friend";

export const AddFriendsPage: FC = () => {
	return (
		<div
			className={
				"w-full h-full p-[60px] rounded-[20px] shadow-soft " +
				"glassmorphic-element glassmorphic-element__border"
			}
		>
			<h1 className="font-bold text-5xl mb-8">Add a friend</h1>
			<AddFriend />
		</div>
	);
};
