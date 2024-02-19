import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import { AuthType } from "@/entities/session/model";
import { Button, Icon } from "@/shared/ui";

export const Login: FC = () => {
	const initialState = {
		GOOGLE: false,
		TWITTER: false,
		GITHUB: false,
	};

	const [isLoading, setIsLoading] =
		useState<{ [key in AuthType]: boolean }>(initialState);

	const handleLoginClick = async (authType: AuthType) => {
		setIsLoading((prevLoadingState) => ({
			...prevLoadingState,
			[authType]: true,
		}));
		try {
			await signIn(authType.toLowerCase());
		} catch (error) {
			toast.error("Something went wrong. Try again later.");
		} finally {
			setIsLoading((prevLoadingState) => ({
				...prevLoadingState,
				[authType]: false,
			}));
		}
	};

	const DefaultButton = Button["Default"];

	const GoogleIcon = Icon["Google"];
	const XIcon = Icon["X"];
	const GitHubIcon = Icon["GitHub"];

	return (
		<>
			<DefaultButton
				isLoading={isLoading[AuthType.Google]}
				type="button"
				className={"w-[180px] h-[40px]"}
				onClick={() => handleLoginClick(AuthType.Google)}
			>
				{isLoading[AuthType.Google] ? null : <GoogleIcon />}
				<p className={"text-black"}>Google</p>
			</DefaultButton>
			<DefaultButton
				isLoading={isLoading[AuthType.X]}
				type="button"
				className={"w-[180px] h-[40px]"}
				onClick={() => handleLoginClick(AuthType.X)}
			>
				{isLoading[AuthType.X] ? null : <XIcon />}
				<p className={"text-black"}>X</p>
			</DefaultButton>
			<DefaultButton
				isLoading={isLoading[AuthType.GitHub]}
				type="button"
				className={"w-[180px] h-[40px]"}
				onClick={() => handleLoginClick(AuthType.GitHub)}
			>
				{isLoading[AuthType.GitHub] ? null : <GitHubIcon />}
				<p className={"text-black"}>GitHub</p>
			</DefaultButton>
		</>
	);
};
