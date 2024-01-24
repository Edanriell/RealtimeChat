"use client";

import { FC, useState, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import SidebarChatList from "@/components/SidebarChatList";
import { Icon, Icons } from "@/components/Icons";
import FriendRequestSidebarOptions from "@/components/FriendRequestSidebarOptions";
import SignOutButton from "@/components/SignOutButton";

import { SidebarOption } from "@/types/typings";

import { Logotype } from "../logotype";

function useMenuAnimation(isHovered: boolean | null) {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (isHovered === null) return;
		const menuAnimations: any = isHovered
			? [
					// [scope.current, { y: "0px", opacity: 1 }, { duration: 0.25 }],
					[
						scope.current,
						{ y: [0, -100] },
						{ type: "inertia", velocity: 180 },
						{ duration: 0.25 },
					],
					// [scope.current, { y: "-40px", opacity: 1 }, { duration: 0.25 }],
				]
			: [
					[
						scope.current,
						{ y: [-80, -200] },
						{ type: "inertia", velocity: 180 },
						{ duration: 0.25 },
					],
					// [scope.current, { y: "-40px", opacity: 1 }, { duration: 0.25 }],
					// [scope.current, { y: "-80px", opacity: 1 }, { duration: 0.25 }],
				];

		animate([...menuAnimations]);
	}, [animate, isHovered, scope]);

	return scope;
}

type SidebarProps = {
	friends: any;
	session: any;
	unseenRequest: any;
};

const sidebarOptions: SidebarOption[] = [
	{
		id: 1,
		name: "Add friend",
		href: "/dashboard/add",
		Icon: "UserPlus",
	},
];

export const Sidebar: FC<SidebarProps> = ({
	friends,
	session,
	unseenRequest,
}) => {
	const [isHovered, setIsHovered] = useState<boolean | null>(null);

	const scope = useMenuAnimation(isHovered);

	return (
		<motion.div
			initial={{ width: 100 }}
			whileHover={{ width: [null, 400, 320] }}
			transition={{ duration: 0.25 }}
			className={
				"hidden md:flex h-full " +
				"flex-col gap-y-5 overflow-y-auto border-r border-gray-200 " +
				"bg-white px-6 items-center"
			}
		>
			<Link href="/dashboard" className="flex h-16 shrink-0 items-center">
				<Logotype />
			</Link>
			{friends.length > 0 ? (
				<div className="text-xs font-semibold leading-6 text-gray-400">
					Your chats
				</div>
			) : null}
			<nav className="flex flex-1 flex-col">
				<ul role="list" className="flex flex-1 flex-col gap-y-7">
					<li>
						<SidebarChatList sessionId={session.user.id} friends={friends} />
					</li>
					<li>
						<div className="text-xs font-semibold leading-6 text-gray-400">
							Overview
						</div>
						<ul role="list" className="-mx-2 mt-2 space-y-1">
							{sidebarOptions.map((option) => {
								const Icon = Icons[option.Icon];
								return (
									<li key={option.id}>
										<Link
											href={option.href}
											className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
										>
											<span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
												<Icon className="h-4 w-4" />
											</span>

											<span className="truncate">{option.name}</span>
										</Link>
									</li>
								);
							})}
							<li>
								<FriendRequestSidebarOptions
									sessionId={session.user.id}
									initialUnseenRequestCount={unseenRequest}
								/>
							</li>
						</ul>
					</li>
					<li className="-mx-6 mt-auto flex items-center">
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
						<SignOutButton className="h-full aspect-square" />
					</li>
				</ul>
				<motion.div
					className={
						"relative w-[160px] h-[40px] bg-black rounded-[20px] text-white"
					}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<motion.button
						className={"w-[160px] h-[40px] bg-black rounded-[20px]"}
					>
						<motion.p className={"relative text-white z-20"}>Test</motion.p>
					</motion.button>
					<motion.div
						ref={scope}
						className={
							"absolute left-[-5%] w-[180px] h-[160px] bg-slate-500 rounded-[100%] z-10"
						}
					></motion.div>
				</motion.div>
			</nav>
		</motion.div>
	);
};
