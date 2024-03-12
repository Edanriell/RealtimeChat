import { FC } from "react";
import { motion } from "framer-motion";

type MobileSidebarToggleButton = {
	onToggle: () => void;
};

const MotionPath = (props: any) => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="hsl(0, 0%, 18%)"
		strokeLinecap="round"
		{...props}
	/>
);

export const MobileSidebarToggleButton: FC<MobileSidebarToggleButton> = ({
	onToggle,
}) => (
	<button
		className={"mobile-sidebar__toggle-button flex items-center justify-center"}
		onClick={onToggle}
	>
		<svg width="23" height="23" viewBox="0 0 23 23">
			<MotionPath
				variants={{
					closed: { d: "M 2 2.5 L 20 2.5" },
					open: { d: "M 3 16.5 L 17 2.5" },
				}}
			/>
			<MotionPath
				d="M 2 9.423 L 20 9.423"
				variants={{
					closed: { opacity: 1 },
					open: { opacity: 0 },
				}}
				transition={{ duration: 0.1 }}
			/>
			<MotionPath
				variants={{
					closed: { d: "M 2 16.346 L 20 16.346" },
					open: { d: "M 3 2.5 L 17 16.346" },
				}}
			/>
		</svg>
	</button>
);
