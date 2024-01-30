import { FC } from "react";
import Image from "next/image";

import { SignOut } from "@/features/sign-out";

type UserProfileProps = {
	session: any;
};

export const UserProfile: FC<UserProfileProps> = ({ session }) => {
	return (
		<div className={"flex flex-col items-center justify-center"}>
			<div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
				<div className="relative h-8 w-8 bg-gray-50">
					<Image
						fill
						referrerPolicy="no-referrer"
						className="rounded-full"
						src={session.user.image || ""}
						alt="Your profile picture"
					/>
				</div>
				<span className="sr-only">Your profile</span>
				<div className="flex flex-col">
					<span aria-hidden="true">{session.user.name}</span>
					<span className="text-xs text-zinc-400" aria-hidden="true">
						{session.user.email}
					</span>
				</div>
			</div>
			<SignOut />
		</div>
	);
};
