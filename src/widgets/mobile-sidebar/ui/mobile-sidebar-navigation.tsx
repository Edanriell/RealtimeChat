import { motion } from "framer-motion";

import { MobileSidebarNavigationItem } from "./mobile-sidebar-navigation-item";

const MobileSidebarNavigationVariants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

export const MobileSidebarNavigation = () => (
	<motion.ul
		className={"mobile-sidebar__navigation"}
		variants={MobileSidebarNavigationVariants}
	>
		{itemIds.map((i) => (
			<MobileSidebarNavigationItem i={i} key={i} />
		))}
	</motion.ul>
);

const itemIds = [0, 1, 2, 3, 4];

// GradientCircles fix