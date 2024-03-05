"use client";

import { FC, useState } from "react";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import { Button, Icon } from "@/shared/ui";

type SignOutProps = {
	sidebarState: string;
};

export const SignOut: FC<SignOutProps> = ({ sidebarState }) => {
	const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

	const handleSignOutClick = async () => {
		setIsSigningOut(true);
		try {
			await signOut();
		} catch (error) {
			toast.error("There was a problem signing out");
		} finally {
			setIsSigningOut(false);
		}
	};

	const AnimatedButton = Button["Animated"];

	const LogOutIcon = Icon["LogOut"];

	const animatedButtonVariants = {
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
		<motion.div
			variants={animatedButtonVariants}
			animate={sidebarState === "expanded" ? "expanded" : "collapsed"}
		>
			<AnimatedButton
				variant="animated"
				onClick={handleSignOutClick}
				type="button"
				className={"w-[100%] h-[40px]"}
			>
				{isSigningOut ? (
					<div className={"flex flex-row items-center justify-center"}>
						<Loader2 className={"animate-spin h-4 w-4 text-white"} />
					</div>
				) : (
					<div className={"flex flex-row items-center justify-center"}>
						<LogOutIcon className={"z-20 text-white w-[20px] h-[20px]"} />
						{sidebarState === "expanded" ? (
							<p className={"ml-[4px] truncate relative text-white z-20"}>
								Sign out
							</p>
						) : null}
					</div>
				)}
			</AnimatedButton>
		</motion.div>
	);
};
