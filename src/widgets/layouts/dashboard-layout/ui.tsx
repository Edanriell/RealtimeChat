"use server";

import { notFound } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

import { sessionModel } from "@/entities/session";
import { friendModel } from "@/entities/friend";

// Widget
// import MobileChatLayout from "@/components/MobileChatLayout";
import { Sidebar } from "@/widgets/sidebar";

type DashboardLayoutProps = {
	children: ReactNode;
};

export const DashboardLayout: FC<DashboardLayoutProps> = async ({
	children,
}) => {
	const { getSession } = sessionModel;
	const { getFriendsByUserId, unseenFriendsRequests } = friendModel;

	const session = await getSession();
	if (!session) notFound();

	const friends = await getFriendsByUserId(session.user.id);

	const unseenRequest = await unseenFriendsRequests(session.user.id);

	return (
		<div className={"w-full flex h-screen gradient-bg z-0"}>
			<svg xmlns="http://www.w3.org/2000/svg">
				<defs>
					<filter id="goo">
						<feGaussianBlur
							in="SourceGraphic"
							stdDeviation="10"
							result="blur"
						/>
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
							result="goo"
						/>
						<feBlend in="SourceGraphic" in2="goo" />
					</filter>
				</defs>
			</svg>
			<div className="gradients-container absolute z-0 pointer-events-none">
				<div className="g1 z-0"></div>
				<div className="g2 z-0"></div>
				<div className="g3 z-0"></div>
				<div className="g4 z-0"></div>
				<div className="g5 z-0"></div>
				<div className="g6 z-0"></div>
			</div>
			<div className={"md:hidden"}>
				{/* <MobileChatLayout
					friends={friends}
					session={session}
					sidebarOptions={sidebarOptions}
					unseenRequestCount={unseenRequest}
				/> */}
			</div>
			<Sidebar
				friends={friends}
				session={session}
				unseenRequest={unseenRequest}
			/>
			<aside className={"max-h-screen w-full mx-[20px] my-[30px]"}>
				{children}
			</aside>
		</div>
	);
};

// bg-slate-50
