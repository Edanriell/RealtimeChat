import { FC } from "react";

import { messageModel, Messages } from "@/entities/message";
import { ChatInput } from "@/features/chat-input";

type ChatProps = {
	initialMessages: messageModel.ValidatedMessage[];
	sessionId: string;
	chatId: string;
	sessionImg: string | null | undefined;
	chatPartner: User;
};

export const Chat: FC<ChatProps> = ({
	initialMessages,
	sessionId,
	chatId,
	chatPartner,
	sessionImg,
}) => (
	<>
		<div
			id="messages"
			className={
				"flex h-full flex-1 flex-col-reverse overflow-y-auto " +
				"scrollbar-thumb-indigo scrollbar-thumb-rounded gap-4 p-3 " +
				"scrollbar scrollbar__track scrollbar__thumb"
			}
		>
			<Messages
				chatId={chatId}
				chatPartner={chatPartner}
				sessionImg={sessionImg}
				sessionId={sessionId}
				initialMessages={initialMessages}
			/>
		</div>
		<ChatInput chatId={chatId} chatPartner={chatPartner} />
	</>
);
