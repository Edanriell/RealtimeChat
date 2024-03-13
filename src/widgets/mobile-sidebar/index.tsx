import { useRef, FC } from "react";
import { motion, useCycle } from "framer-motion";

import { useDimensions } from "@/shared/lib";

import { MobileSidebarToggleButton } from "./ui/mobile-sidebar-toggle-button";
import { MobileSidebarNavigation } from "./ui/mobile-sidebar-navigation";

type MobileSidebarProps = {
	session: any;
	friends: any;
	initialUnseenRequestCount: any;
};

const mobileSidebarVariants = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: "circle(30px at 40px 60px)",
		transition: {
			delay: 0.5,
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};

export const MobileSidebar: FC<MobileSidebarProps> = ({
	session,
	friends,
	initialUnseenRequestCount,
}) => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);

	return (
		<motion.nav
			initial={false}
			animate={isOpen ? "open" : "closed"}
			custom={height}
			ref={containerRef}
			className={"mobile-sidebar"}
		>
			<motion.div
				className={"mobile-sidebar__background"}
				variants={mobileSidebarVariants}
			/>
			<MobileSidebarNavigation
				session={session}
				friends={friends}
				initialUnseenRequestCount={initialUnseenRequestCount}
			/>
			<MobileSidebarToggleButton onToggle={() => toggleOpen()} />
		</motion.nav>
	);
};
