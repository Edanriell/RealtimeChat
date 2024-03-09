"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { Button, Icon } from "@/shared/ui";

type SmallButtonProps = {
	isSigningOut: boolean;
	onSignOutClick: () => void;
};

const animatedNormalButtonVariants = {
	displayed: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.25 },
	},
	hidden: {
		opacity: 0,
		scale: 0.4,
		transition: { duration: 0.25 },
	},
};

const AnimatedButton = Button["Animated"];

const LogOutIcon = Icon["LogOut"];

export const SmallButtons: FC<SmallButtonProps> = ({
	isSigningOut,
	onSignOutClick,
}) => {
	return (
		<motion.div
			variants={animatedNormalButtonVariants}
			initial={"hidden"}
			animate={"displayed"}
			exit={"hidden"}
			className={"w-[60px]"}
		>
			<AnimatedButton
				variant="animated"
				onClick={onSignOutClick}
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
					</div>
				)}
			</AnimatedButton>
		</motion.div>
	);
};
