import { FC } from "react";
import Link from "next/link";

import { Button, Icon } from "@/shared/ui";

export const Overview: FC = () => {
	const AnimatedButton = Button["Animated"];

	const UserPlusIcon = Icon["UserPlus"];

	return (
		<div className={"flex flex-col items-center gap-y-[10px]"}>
			<p className={"text-md font-medium leading-6 text-black"}>Overview</p>
			<ul>
				<li>
					<Link
						href={"/dashboard/add"}
						// className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
					>
						{/* <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
							<UserPlusIcon className="h-4 w-4" />
						</span>
						<span className="truncate">Add friend</span> */}
						<AnimatedButton
							variant={"animated"}
							type="button"
							className={"w-[160px] h-[40px]"}
						>
							<div
								className={
									"flex flex-row items-center justify-center gap-x-[6px]"
								}
							>
								<UserPlusIcon className={"text-white z-20"} />
								<p className={"relative text-white z-20 mr-[10px]"}>
									Add friend
								</p>
							</div>
						</AnimatedButton>
					</Link>
				</li>
				{/* <li>
					<FriendRequestSidebarOptions
						sessionId={session.user.id}
						initialUnseenRequestCount={unseenRequest}
					/>
				</li> */}
			</ul>
		</div>
	);
};
