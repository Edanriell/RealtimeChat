import { FC } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Image from "next/image";

import { sessionModel } from "@/entities/session";
import { messageModel } from "@/entities/message";
import { Chat } from "@/widgets/chat";

type ChatPageProps = {
	params: {
		chatId: string;
	};
};

export const ChatPage: FC<ChatPageProps> = async ({ params }) => {
	const { chatId } = params;

	const { authOptions } = sessionModel;
	const { getChatMessages, getChatPartner } = messageModel;

	const session = await getServerSession(authOptions);
	if (!session) notFound();

	const { user } = session;

	const [userId1, userId2] = chatId.split("--");

	if (user.id !== userId1 && user.id !== userId2) {
		notFound();
	}

	const chatPartnerId = user.id === userId1 ? userId2 : userId1;
	const chatPartner = await getChatPartner(chatPartnerId);

	const initialMessages = await getChatMessages(chatId);

	return (
		<div
			className={
				"w-full h-full p-[60px] rounded-[20px] shadow-soft " +
				"glassmorphic-element glassmorphic-element__border"
			}
		>
			<div
				className={
					"flex-1 justify-between flex flex-col h-full " +
					"max-h-[calc(100vh-6rem)]"
				}
			>
				<div
					className={
						"flex sm:items-center justify-between py-3 " +
						"glassmorphic-element__border_position_bottom"
					}
				>
					<div className={"relative flex items-center space-x-4"}>
						<div className={"relative"}>
							<div className={"relative w-8 sm:w-12 h-8 sm:h-12"}>
								<Image
									fill
									referrerPolicy="no-referrer"
									src={chatPartner.image}
									alt={`${chatPartner.name} profile picture`}
									className={"rounded-full"}
								/>
							</div>
						</div>
						<div className={"flex flex-col leading-tight"}>
							<div className={"text-xl flex items-center"}>
								<span className={"text-black mr-3 font-semibold"}>
									{chatPartner.name}
								</span>
							</div>
							<span className={"text-sm text-black font-normal"}>
								{chatPartner.email}
							</span>
						</div>
					</div>
				</div>
				<Chat
					chatId={chatId}
					chatPartner={chatPartner}
					sessionImg={session.user.image}
					sessionId={session.user.id}
					initialMessages={initialMessages}
				/>
			</div>
		</div>
	);
};
