import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

type MobileSidebarNavigationItemProps = {
	index: number;
	children: ReactNode;
};

const MobileSidebarNavigationItemVariants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

export const MobileSidebarNavigationItem: FC<
	MobileSidebarNavigationItemProps
> = ({ index, children }) => {
	return (
		<motion.li
			variants={MobileSidebarNavigationItemVariants}
			className={"mobile-sidebar__navigation-item"}
		>
			{children}
		</motion.li>
	);
};
