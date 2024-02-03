import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChevronRight } from "lucide-react";

import { sessionModel } from "@/entities/session";
import { friendModel } from "@/entities/friend";
import { fetchRedis } from "@/shared/api";
import { chatHrefConstructor } from "@/shared/lib";

export const DashboardPage = async () => {
	const { authOptions } = sessionModel;
	const { getFriendsByUserId } = friendModel;

	const session = await getServerSession(authOptions);
	if (!session) notFound();

	const friends = await getFriendsByUserId(session.user.id);

	// Should be in entities
	const friendsWithLastMessage = await Promise.all(
		friends.map(async (friend) => {
			const [lastMessageRaw] = (await fetchRedis(
				"zrange",
				`chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
				-1,
				-1,
			)) as string[];

			const lastMessage = JSON.parse(lastMessageRaw) as Message;

			return {
				...friend,
				lastMessage,
			};
		}),
	);

	return (
		<div
			className={"w-full h-full p-[60px] shadow-soft"}
			style={{
				background: "rgba(255, 255, 255, 0.2)",
				boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
				backdropFilter: "blur(5px)",
				WebkitBackdropFilter: "blur(5px)",
				borderRadius: "20px",
				border: "1px solid rgba(255, 255, 255, 0.3)",
			}}
		>
			<h1 className="font-bold text-5xl mb-8">Recent messages</h1>
			{/* Feature Recent messages */}
			{friendsWithLastMessage.length === 0 ? (
				<p className="text-sm text-zinc-500">Nothing to show here...</p>
			) : (
				friendsWithLastMessage.map((friend) => (
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
