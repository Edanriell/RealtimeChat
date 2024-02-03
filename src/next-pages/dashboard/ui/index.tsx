"use server";

import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChevronRight } from "lucide-react";

import { sessionModel } from "@/entities/session";
import { friendModel } from "@/entities/friend";
import { chatHrefConstructor } from "@/shared/lib";

export const DashboardPage = async () => {
	const { authOptions } = sessionModel;
	const { getFriendsByUserId, friendsWithLastMessage } = friendModel;

	const session = await getServerSession(authOptions);
	if (!session) notFound();

	const friends = await getFriendsByUserId(session.user.id);

	const recentMessages = await friendsWithLastMessage(friends, session.user.id);

	return (
		<div
			className={
				"w-full h-full p-[60px] shadow-soft glassmorphism rounded-[20px]"
			}
		>
			<h1 className="font-bold text-5xl mb-8">Recent messages</h1>
			{/* Feature Recent messages */}
			{recentMessages.length === 0 ? (
				<p className="text-sm text-zinc-500">Nothing to show here...</p>
			) : (
				recentMessages.map((friend: any) => (
					<div
						key={friend.id}
						className="relative bg-zinc-50 border border-zinc-200 p-3 rounded-[406px]"
					>
						<div className="absolute right-4 inset-y-0 flex items-center">
							<ChevronRight className="h-7 w-7 text-zinc-400" />
						</div>

						<Link
							href={`/dashboard/chat/${chatHrefConstructor(
								session.user.id,
								friend.id,
							)}`}
							className="relative sm:flex"
						>
							<div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
								<div className="relative h-6 w-6">
									<Image
										referrerPolicy="no-referrer"
										className="rounded-full"
										alt={`${friend.name} profile picture`}
										src={friend.image}
										fill
									/>
								</div>
							</div>

							<div>
								<h4 className="text-lg font-semibold">{friend.name}</h4>
								<p className="mt-1 max-w-md">
									<span className="text-zinc-400">
										{friend.lastMessage.senderId === session.user.id
											? "You: "
											: ""}
									</span>
									{friend.lastMessage.text}
								</p>
							</div>
						</Link>
					</div>
				))
			)}
		</div>
	);
};
