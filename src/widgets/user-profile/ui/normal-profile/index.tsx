"use client";

import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type NormalProfileProps = {
	session: any;
};

const animatedNormalProfileVariants = {
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

export const NormalProfile: FC<NormalProfileProps> = ({ session }) => {
	return (
		<motion.div
			variants={animatedNormalProfileVariants}
			initial={"hidden"}
			animate={"displayed"}
			exit={"hidden"}
			className={
				"py-[10px] px-[10px] flex flex-row items-center " +
				"justify-center bg-[#5a14de] rounded-[406px] " +
				"gap-x-[10px] w-[180px]"
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
		</motion.div>
	);
};
