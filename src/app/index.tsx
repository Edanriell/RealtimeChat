import type { AppProps } from "next/app";
import { BaseLayout } from "../widgets/layouts";
import { withProviders } from "./providers";

// NEED FIX PATH ../widgets instead widgets

const App = ({ Component, pageProps }: AppProps) => (
	<>
		<BaseLayout>
			<Component {...pageProps} />
		</BaseLayout>
	</>
);

export default withProviders(App);
