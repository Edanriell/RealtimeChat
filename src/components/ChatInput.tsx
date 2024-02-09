"use client";

import { FC, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

import Button from "./ui/Button";

type ChatInputProps = {
	chatPartner: User;
	chatId: string;
};

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
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

	return (
		<div className={"border-t border-light px-4 pt-4 mb-2 sm:mb-0"}>
			<div className={"flex flex-row items-center justify-center gap-x-[20px]"}>
				<TextareaAutosize
					ref={textareaRef}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							sendMessage();
						}
					}}
					minRows={4}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={`Message ${chatPartner.name}`}
					className={
						"block w-full resize-none border-0 bg-white text-black " +
						"placeholder:text-gray-400 focus:ring-0 p-[20px] sm:text-sm " +
						"sm:leading-6 rounded-[20px] shadow-soft box-border"
					}
				/>
				<Button isLoading={isLoading} onClick={sendMessage} type="submit">
					Send
				</Button>
			</div>
		</div>
	);
};

export default ChatInput;
