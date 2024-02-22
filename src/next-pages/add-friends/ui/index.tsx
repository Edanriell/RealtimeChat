import { FC } from "react";

import AddFriendButton from "@/components/AddFriendButton";

export const AddFriendsPage: FC = () => {
	return (
		<div
			className={
				"w-full h-full p-[60px] rounded-[20px] shadow-soft " +
				"glassmorphic-element glassmorphic-element__border"
			}
		>
			<h1 className="font-bold text-5xl mb-8">Add a friend</h1>
			<AddFriendButton />
		</div>
	);
};

// TODO
// Refactor add friends page
