import { FC } from "react";

export const DenyFriend: FC = () => {
	return (
		<button
			onClick={() => denyFriend(request.senderId)}
			aria-label="deny friend"
			className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
		>
			<X className="font-semibold text-white w-3/4 h-3/4" />
		</button>
	);
};
