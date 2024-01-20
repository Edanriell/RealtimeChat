import { ReactNode } from "react";

import { ReactHotToastProvider } from "./_providers";
import { BaseLayout } from "@/widgets/layouts";

import "./_styles/globals.css";

function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>
				<ReactHotToastProvider>
					<BaseLayout>{children}</BaseLayout>
				</ReactHotToastProvider>
			</body>
		</html>
	);
}

export default RootLayout;
