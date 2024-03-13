import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

type MobileSidebarNavigationItemProps = {
	classes?: string;
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
> = ({ classes = "", children }) => {
	return (
		<motion.li
			variants={MobileSidebarNavigationItemVariants}
			className={classes + " " + "mobile-sidebar__navigation-item"}
		>
			{children}
		</motion.li>
	);
};
