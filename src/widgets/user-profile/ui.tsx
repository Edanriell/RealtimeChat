import { FC } from "react";
import Image from "next/image";

import { SignOut } from "@/features/sign-out";

type UserProfileProps = {
	session: any;
};

export const UserProfile: FC<UserProfileProps> = ({ session }) => {
	return (
		<div className={"mt-[auto] flex flex-col items-center justify-center gap-y-[5px]"}>
			<div
				className={
					"py-[10px] px-[10px] flex flex-row items-center justify-start bg-[#5a14de] rounded-[406px] w-[160px] gap-x-[4px]"
				}
			>
				<span className={"sr-only"}>Your profile</span>
				<div
					className={"rounded-full relative w-[30px] h-[30px] bg-transparent"}
				>
					<Image
						fill
						style={{ objectFit: "contain" }}
						referrerPolicy="no-referrer"
						className={"rounded-full"}
						src={session.user.image || ""}
						alt="Your profile picture"
					/>
				</div>
				<div className="flex flex-col">
					<p className={"text-white font-medium truncate"} aria-hidden="true">
						{session.user.name}
					</p>
					<p
						className={"text-white truncate font-thin text-[10px]"}
						aria-hidden="true"
					>
						{session.user.email}
					</p>
				</div>
			</div>
			<SignOut />
		</div>
	);
};
