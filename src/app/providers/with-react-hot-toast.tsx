/* eslint-disable react/display-name */
"use client";

import { Toaster } from "react-hot-toast";
import type { AppProps, AppType } from "next/app";

export const withReactHotToast = (Component: AppType) => (props: AppProps) => {
	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			<Component {...props} />
		</>
	);
};
