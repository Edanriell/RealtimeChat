import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AddFriendsPageLoading: FC = () => {
	return (
		<div
			className={
				"w-full h-full p-[60px] rounded-[20px] shadow-soft " +
				"glassmorphic-element glassmorphic-element__border " +
				"relative"
			}
		>
			<h1 className={"font-bold text-5xl mb-8 text-center"}>
				<Skeleton className={"block text-center"} width={281.56} height={48} />
			</h1>
			<div
				className={
					"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
				}
			>
				<div
					className={"flex flex-col gap-y-[20px] items-center justify-center"}
				>
					<div className={"flex flex-col items-center gap-y-[10px]"}>
						<Skeleton width={131.45} height={24} />
						<Skeleton width={208.47} height={39.99} />
					</div>
					<Skeleton width={123.1} height={39.98} />
				</div>
			</div>
		</div>
	);
};

export default AddFriendsPageLoading;
