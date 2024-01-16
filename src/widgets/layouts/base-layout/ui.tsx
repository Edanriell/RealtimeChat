"use client";

import type { PropsWithChildren } from "react";

export const BaseLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<main className="main">{children}</main>
		</>
	);
};
