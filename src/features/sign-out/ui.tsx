"use client";

import { FC, useState } from "react";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

import { Button, Icon } from "@/shared/ui";

export const SignOut: FC = () => {
	const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

	const handleSignOutClick = async () => {
		setIsSigningOut(true);
		try {
			await signOut();
		} catch (error) {
			toast.error("There was a problem signing out");
		} finally {
			setIsSigningOut(false);
		}
	};

	const AnimatedButton = Button["Animated"];
	const LogOutIcon = Icon["LogOut"];

	return (
		<AnimatedButton
			variant="animated"
			onClick={handleSignOutClick}
			type="button"
			className={"w-[160px] h-[40px]"}
		>
			{isSigningOut ? (
				<div className={"flex flex-row items-center justify-center"}>
					<Loader2 className={"animate-spin h-4 w-4 text-white"} />
				</div>
			) : (
				<div className={"flex flex-row items-center justify-center"}>
					<LogOutIcon className={"z-20 text-white w-[20px] h-[20px]"} />
					<p className={"ml-[4px] truncate relative text-white z-20"}>
						Sign out
					</p>
				</div>
			)}
		</AnimatedButton>
	);
};
