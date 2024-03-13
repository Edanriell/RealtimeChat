import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

type MobileSidebarNavigationItemProps = {
	index: number;
	children: any;
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

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MobileSidebarNavigationItem: FC<
	MobileSidebarNavigationItemProps
> = ({ index, children }) => {
	const style = { border: `2px solid ${colors[index]}` };
	return (
		<motion.li
			variants={MobileSidebarNavigationItemVariants}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			className={"mobile-sidebar__navigation-item"}
		>
			{/* <div className={"icon-placeholder"} style={style} />
			<div className={"text-placeholder"} style={style} /> */}
			{children}
		</motion.li>
	);
};
