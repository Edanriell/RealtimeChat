"use client";

import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/Button";
import { SocialIcon, IconType } from "./social-icon";
import { Logotype } from "./logotype";

// Should be place in entities/session
enum AuthType {
	Google = "GOOGLE",
	X = "TWITTER",
	GitHub = "GITHUB",
}
// Should be place in entities/session

export const LoginPage: FC = () => {
	// We need any global state manager
	// Should be place in entities/session
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const loginWith = async (authType: AuthType) => {
		setIsLoading(true);
		try {
			await signIn(authType.toLowerCase());
		} catch (error) {
			toast.error("Something went wrong. Try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	// Should be place in entities/session

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
							isLoading={isLoading}
							type="button"
							className="w-[260px]"
							onClick={() => loginWith(AuthType.Google)}
						>
							{isLoading ? null : <SocialIcon iconType={IconType.Google} />}
							<p className="text-black">Google</p>
						</Button>
						<Button
							isLoading={isLoading}
							type="button"
							className="w-[260px]"
							onClick={() => loginWith(AuthType.X)}
						>
							{isLoading ? null : <SocialIcon iconType={IconType.X} />}
							<p className="text-black">X</p>
						</Button>
						<Button
							isLoading={isLoading}
							type="button"
							className="w-[260px]"
							onClick={() => loginWith(AuthType.GitHub)}
						>
							{isLoading ? null : <SocialIcon iconType={IconType.GitHub} />}
							<p className="text-black">GitHub</p>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
