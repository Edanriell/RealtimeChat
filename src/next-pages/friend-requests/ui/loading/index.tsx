import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FriendRequestsPageLoading: FC = () => {
	return (
		<div
			className={
				"w-full h-full p-[60px] rounded-[20px] shadow-soft " +
				"glassmorphic-element glassmorphic-element__border " +
				"relative"
			}
		>
			<h1 className={"font-bold text-5xl mb-8 text-center"}>
				<Skeleton className={"block text-center"} width={346.39} height={48} />
			</h1>
			<div
				className={
					"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
				}
			>
				<p className="text-md text-[black]">
					<Skeleton width={164.6} height={24} />
				</p>
			</div>
		</div>
	);
};

export default FriendRequestsPageLoading;
