"use client";

import { FC, useState } from "react";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/ui/button";
import { addFriendValidator } from "@/shared/lib/validators";

type FormData = z.infer<typeof addFriendValidator>;

export const AddFriend: FC = () => {
	const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(addFriendValidator),
	});

	const addFriend = async (email: string) => {
		try {
			const validatedEmail = addFriendValidator.parse({ email });

			await axios.post("/api/friends/add", {
				email: validatedEmail,
			});

			setShowSuccessState(true);
		} catch (error) {
			if (error instanceof z.ZodError) {
				setError("email", { message: error.message });
				return;
			}

			if (error instanceof AxiosError) {
				setError("email", { message: error.response?.data });
				return;
			}

			setError("email", { message: "Something went wrong." });
		}
	};

	const onFriendSubmit = (data: FormData) => {
		addFriend(data.email);
	};

	const AnimatedButton = Button["AnimatedColor"];

	return (
		<form
			onSubmit={handleSubmit(onFriendSubmit)}
			className={
				"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
			}
		>
			<div className={"flex flex-col gap-y-[20px] items-center justify-center"}>
				<div className={"flex flex-col items-center gap-y-[10px]"}>
					<label
						htmlFor="email"
						className={
							"block text-sm font-medium leading-6 text-gray-900 " +
							"text-center"
						}
					>
						Add friend by E-Mail
					</label>
					<input
						{...register("email")}
						type="text"
						className={
							"inline-block rounded-[406px] border-0 px-[25px] text-gray-900 " +
							"shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 " +
							"focus:ring-2 focus:ring-inset focus:ring-[#761beb] sm:text-sm sm:leading-6 " +
							"text-center w-[100%] min-w-[80px]"
						}
						placeholder="example@example.com"
					/>
					<p className={"mt-1 text-sm text-red-600"}>{errors.email?.message}</p>
					{showSuccessState ? (
						<p className={"mt-1 text-sm text-green-600"}>
							Friend request sent!
						</p>
					) : null}
				</div>
				<AnimatedButton
					className={"mr-auto ml-auto"}
					variant={"animatedColor"}
					size={"animatedColor"}
				>
					Send request
				</AnimatedButton>
			</div>
		</form>
	);
};
