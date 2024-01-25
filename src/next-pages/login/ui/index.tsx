"use client";

import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import { AuthType } from "@/entities/session/model";
import { Button } from "@/shared/ui";

import { SocialIcon, IconType } from "./social-icon";
import { Logotype } from "./logotype";

export const LoginPage: FC = () => {
	const initialState = {
		Google: false,
		Twitter: false,
		GitHub: false,
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

	return (
		<>
			<div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-[100vh] bg-gradient-radial-purple-darker">
				<div className="w-full flex flex-col items-center max-w-md space-y-8 justify-center">
					<div className="flex flex-col items-center gap-8 justify-center">
						<Logotype />
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
							Sign in to your account
						</h2>
					</div>
					<div className="flex flex-col gap-3 items-center justify-center">
						<Button
							isLoading={isLoading[AuthType.Google]}
							type="button"
							className="w-[180px] h-[40px]"
							onClick={() => handleLoginClick(AuthType.Google)}
						>
							{isLoading[AuthType.Google] ? null : (
								<SocialIcon iconType={IconType.Google} />
							)}
							<p className="text-black">Google</p>
						</Button>
						<Button
							isLoading={isLoading[AuthType.X]}
							type="button"
							className="w-[180px] h-[40px]"
							onClick={() => handleLoginClick(AuthType.X)}
						>
							{isLoading[AuthType.X] ? null : (
								<SocialIcon iconType={IconType.X} />
							)}
							<p className="text-black">X</p>
						</Button>
						<Button
							isLoading={isLoading[AuthType.GitHub]}
							type="button"
							className="w-[180px] h-[40px]"
							onClick={() => handleLoginClick(AuthType.GitHub)}
						>
							{isLoading[AuthType.GitHub] ? null : (
								<SocialIcon iconType={IconType.GitHub} />
							)}
							<p className="text-black">GitHub</p>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
