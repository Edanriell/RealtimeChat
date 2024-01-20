import AddFriendButton from "@/components/AddFriendButton";
import { FC } from "react";

// MAIN TAG IS NOT NECESSARY HERE
// ADDFRIEND IS FEATURE
export const AddFriendsPage: FC = () => {
	return (
		<main className="pt-8">
			<h1 className="font-bold text-5xl mb-8">Add a friend</h1>
			<AddFriendButton />
		</main>
	);
};
