import { ChatPage } from "@/next-pages/chat";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { sessionModel } from "@/entities/session";
import { fetchRedis } from "@/shared/api";

// Specific function for generating metadata, only in NEXT.JS
export async function generateMetadata({
	params,
}: {
	params: { chatId: string };
}) {
	const { authOptions } = sessionModel;

	const session = await getServerSession(authOptions);
	if (!session) notFound();

	const [userId1, userId2] = params.chatId.split("--");
	const { user } = session;

	const chatPartnerId = user.id === userId1 ? userId2 : userId1;
	const chatPartnerRaw = (await fetchRedis(
		"get",
		`user:${chatPartnerId}`,
	)) as string;
	const chatPartner = JSON.parse(chatPartnerRaw) as User;

	return { title: `ChatX | ${chatPartner.name} chat` };
}

export default ChatPage;
