"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type SmallProfileProps = {
	session: any;
};

const animatedSmallProfileVariants = {
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

export const SmallProfile: FC<SmallProfileProps> = ({ session }) => {
	return (
		<motion.div
			variants={animatedSmallProfileVariants}
			initial={"hidden"}
			animate={"displayed"}
			exit={"hidden"}
			className={
				"py-[10px] px-[10px] flex flex-row items-center " +
				"justify-center bg-[#5a14de] rounded-[406px] " +
				"gap-x-[10px] w-[60px]"
			}
		>
			<span className={"sr-only"}>Your profile</span>
			<div className={"rounded-full relative w-[30px] h-[30px] bg-transparent"}>
				<Image
					fill
					style={{ objectFit: "contain" }}
					referrerPolicy="no-referrer"
					className={"rounded-full"}
					src={session.user.image || ""}
					alt="Your profile picture"
				/>
			</div>
		</motion.div>
	);
};
