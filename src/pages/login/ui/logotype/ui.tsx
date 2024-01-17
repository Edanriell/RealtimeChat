"use client";

import { FC } from "react";
import Image from "next/image";

export const Logotype: FC = () => {
	return (
		<Image
			src="/images/chatx-logo-full-cropped.png"
			alt="ChatX company logotype"
			width={240}
			height={240}
		/>
	);
};
