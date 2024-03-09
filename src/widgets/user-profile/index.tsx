import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SignOut } from "@/features/sign-out";

import { SmallProfile, NormalProfile } from "./ui";

type UserProfileProps = {
	session: any;
	sidebarState: string;
};

export const UserProfile: FC<UserProfileProps> = ({
	session,
	sidebarState,
}) => {
	return (
		<div
			className={
				"mt-[auto] flex flex-col items-center justify-center gap-y-[5px]"
			}
		>
			<AnimatePresence initial={false} mode="wait">
				{sidebarState === "expanded" && (
					<motion.div key="normal-profile">
						<NormalProfile session={session} />
					</motion.div>
				)}
				{sidebarState === "collapsed" && (
					<motion.div key="small-profile">
						<SmallProfile session={session} />
					</motion.div>
				)}
			</AnimatePresence>
			<SignOut sidebarState={sidebarState} />
		</div>
	);
};
