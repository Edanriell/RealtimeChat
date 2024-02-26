import { FC } from "react";

export const AcceptFriend: FC = () => {
	return (
		<button
			onClick={() => acceptFriend(request.senderId)}
			aria-label="accept friend"
			className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
		>
			<Check className="font-semibold text-white w-3/4 h-3/4" />
		</button>
	);
};
