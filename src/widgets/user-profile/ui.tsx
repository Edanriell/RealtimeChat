import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { SignOut } from "@/features/sign-out";

type UserProfileProps = {
	session: any;
	sidebarState: string;
};

export const UserProfile: FC<UserProfileProps> = ({
	session,
	sidebarState,
}) => {
	const animatedUserProfileVariants = {
		expanded: {
			width: "180px",
			transition: { type: "linear" },
		},
		collapsed: {
			width: "60px",
			transition: { type: "linear" },
		},
	};

	return (
		<div
			className={
				"mt-[auto] flex flex-col items-center justify-center gap-y-[5px]"
			}
		>
			<motion.div
				variants={animatedUserProfileVariants}
				animate={sidebarState === "expanded" ? "expanded" : "collapsed"}
				className={
					"py-[10px] px-[10px] flex flex-row items-center " +
					"justify-center bg-[#5a14de] rounded-[406px] " +
					"gap-x-[10px]"
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
				{sidebarState === "expanded" ? (
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
				) : null}
			</motion.div>
			<SignOut sidebarState={sidebarState} />
		</div>
	);
};
