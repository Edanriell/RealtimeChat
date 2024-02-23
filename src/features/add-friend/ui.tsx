"use client";

import { FC, useState } from "react";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

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
			toast.success("Friend request sent!");
		} catch (error) {
			if (error instanceof z.ZodError) {
				setError("email", { message: error.message });
				toast.error(`${error.message}`);
				return;
			}

			if (error instanceof AxiosError) {
				setError("email", { message: error.response?.data });
				toast.error(`${error.response?.data}`);
				return;
			}

			toast.error("Something went wrong.");
			setError("email", { message: "Something went wrong." });
		}
	};

	const onFriendSubmit = (data: FormData) => {
		addFriend(data.email);
	};

	return (
		<form onSubmit={handleSubmit(onFriendSubmit)} className={"max-w-sm"}>
			<label
				htmlFor="email"
				className={"block text-sm font-medium leading-6 text-gray-900"}
			>
				Add friend by E-Mail
			</label>

			<div className={"mt-2 flex gap-4"}>
				<input
					{...register("email")}
					type="text"
					className={
						"block w-full rounded-md border-0 py-1.5 text-gray-900 " +
						"shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 " +
						"focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					}
					placeholder="you@example.com"
				/>
				<button>Add</button>
			</div>
			<p className={"mt-1 text-sm text-red-600"}>{errors.email?.message}</p>
			{showSuccessState ? (
				<p className={"mt-1 text-sm text-green-600"}>Friend request sent!</p>
			) : null}
		</form>
	);
};
