"use client";

import { FC } from "react";

import { Login } from "@/features/login";

import { Logotype } from "./logotype";

export const LoginPage: FC = () => {
	return (
		<>
			<div
				className={
					"flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 " +
					"h-[100vh] bg-gradient-radial-purple-darker"
				}
			>
				<div
					className={
						"w-full flex flex-col items-center max-w-md " +
						"space-y-8 justify-center"
					}
				>
					<div className={"flex flex-col items-center gap-8 justify-center"}>
						<Logotype />
						<h2
							className={
								"mt-6 text-center text-3xl font-bold tracking-tight " +
								"text-white"
							}
						>
							Sign in to your account
						</h2>
					</div>
					<div className={"flex flex-col gap-3 items-center justify-center"}>
						<Login />
					</div>
				</div>
			</div>
		</>
	);
};
