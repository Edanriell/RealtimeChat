"use client";

import { FC, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

import { Button } from "@/shared/ui";

type ChatInputProps = {
	chatPartner: User;
	chatId: string;
};

export const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [input, setInput] = useState<string>("");

	const sendMessage = async () => {
		if (!input) return;
		setIsLoading(true);

		try {
			await axios.post("/api/message/send", { text: input, chatId });
			setInput("");
			textareaRef.current?.focus();
		} catch {
			toast.error("Something went wrong. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	const Animated3dButton = Button["Animated3d"];

	return (
		<div
			className={
				"px-4 pt-4 mb-2 sm:mb-0 glassmorphic-element__border_position_top"
			}
		>
			<div className={"flex flex-row items-center justify-center gap-x-[20px]"}>
				<TextareaAutosize
					ref={textareaRef}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							sendMessage();
						}
					}}
					minRows={3}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={`Message to ${chatPartner.name}`}
					className={
						"block w-full resize-none border-0 bg-white text-black " +
						"placeholder:text-gray-400 focus:ring-0 p-[20px] sm:text-sm " +
						"sm:leading-6 rounded-[20px] shadow-soft box-border " +
						"focus:outline-none focus:ring-2 focus:ring-[#761beb] focus:ring-offset-2"
					}
				/>
				<Animated3dButton variant={"animated3d"} size={"animated3d"}>
					Send
				</Animated3dButton>
				{/* <Button isLoading={isLoading} onClick={sendMessage} type="submit">
					Send
				</Button> */}
			</div>
		</div>
	);
};
