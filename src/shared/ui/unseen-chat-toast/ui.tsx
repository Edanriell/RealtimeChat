import { FC, useEffect, useRef } from "react";
import Image from "next/image";
import { toast, type Toast } from "react-hot-toast";
import {
	motion,
	AnimatePresence,
	usePresence,
	useAnimate,
} from "framer-motion";

import { chatHrefConstructor, cn } from "@/shared/lib";

type UnseenChatToastProps = {
	customToast: Toast;
	sessionId: string;
	senderId: string;
	senderImg: string;
	senderName: string;
	senderMessage: string;
};

export const UnseenChatToast: FC<UnseenChatToastProps> = ({
	customToast,
	senderId,
	sessionId,
	senderImg,
	senderName,
	senderMessage,
}) => {

	return (
		<AnimatePresence>
			{customToast.visible && (
				<motion.div
					key={customToast.id}
					initial={{ opacity: 0, scale: 0.9, y: 0 }}
					animate={{ opacity: 1, scale: 1, y: 5 }}
					exit={{ opacity: 0, scale: 0.9 }}
					className={cn(
						"max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5",
					)}
				>
					<a
						onClick={() => toast.dismiss(customToast.id)}
						href={`/dashboard/chat/${chatHrefConstructor(sessionId, senderId)}`}
						className="flex-1 w-0 p-4"
					>
						<div className="flex items-start">
							<div className="flex-shrink-0 pt-0.5">
								<div className="relative h-10 w-10">
									<Image
										fill
										referrerPolicy="no-referrer"
										className="rounded-full"
										src={senderImg}
										alt={`${senderName} profile picture`}
									/>
								</div>
							</div>
							<div className="ml-3 flex-1">
								<p className="text-sm font-medium text-gray-900">
									{senderName}
								</p>
								<p className="mt-1 text-sm text-gray-500">{senderMessage}</p>
							</div>
						</div>
					</a>
					<div className="flex border-l border-gray-200">
						<button
							onClick={() => toast.dismiss(customToast.id)}
							className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							Close
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
