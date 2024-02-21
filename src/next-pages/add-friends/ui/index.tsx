import AddFriendButton from "@/components/AddFriendButton";
import { FC } from "react";

export const AddFriendsPage: FC = () => {
	return (
		<main className="pt-8">
			<h1 className="font-bold text-5xl mb-8">Add a friend</h1>
			<AddFriendButton />
		</main>
	);
};

// Fix all loadings, they all are broken because of default export and next.js limits
// Also fix button scale in dashboard