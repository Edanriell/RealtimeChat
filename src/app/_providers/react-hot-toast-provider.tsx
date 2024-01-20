import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type ReactHotToastProviderProps = {
	children: ReactNode;
};

export const ReactHotToastProvider: FC<ReactHotToastProviderProps> = ({
	children,
}) => {
	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			{children}
		</>
	);
};
