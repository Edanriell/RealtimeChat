"use client";

import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button, Icon } from "@/shared/ui";

type SmallButtonsProps = {
	unseenRequestCount: number;
};

const AnimatedButton = Button["Animated"];

const UserPlusIcon = Icon["UserPlus"];
const UserIcon = Icon["User"];

const animatedButtonVariants = {
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

export const SmallButtons: FC<SmallButtonsProps> = ({ unseenRequestCount }) => {
	return (
		<>
			<li className={"mb-[8px]"}>
				<Link href={"/dashboard/add"} className={"select-none"} tabIndex={1}>
					<motion.div
						variants={animatedButtonVariants}
						initial={"hidden"}
						animate={"displayed"}
						exit={"hidden"}
						className={"w-[60px]"}
					>
						<AnimatedButton
							variant={"animated"}
							type="button"
							className={"w-[100%] h-[40px]"}
						>
							<div
								className={
									"flex flex-row items-center justify-center gap-x-[4px]"
								}
							>
								<UserPlusIcon className={"text-white z-20 w-[20px] h-[20px]"} />
							</div>
						</AnimatedButton>
					</motion.div>
				</Link>
			</li>
			<li className={"mb-[8px]"}>
				<Link href="/dashboard/requests" className="select-none" tabIndex={1}>
					<motion.div
						variants={animatedButtonVariants}
						initial={"hidden"}
						animate={"displayed"}
						exit={"hidden"}
						className={"w-[60px]"}
					>
						<AnimatedButton
							variant={"animated"}
							type="button"
							className={"w-[100%] h-[40px]"}
						>
							<div
								className={
									"flex flex-row items-center justify-center gap-x-[4px]"
								}
							>
								<UserIcon className={"text-white z-20 w-[20px] h-[20px]"} />
								{unseenRequestCount > 0 ? (
									<div
										className={
											"bg-slate-50 font-medium text-xs text-black w-4 h-4 " +
											"rounded-full flex justify-center items-center z-20 " +
											"ml-[4px]"
										}
									>
										{unseenRequestCount}
									</div>
								) : null}
							</div>
						</AnimatedButton>
					</motion.div>
				</Link>
			</li>
		</>
	);
};
