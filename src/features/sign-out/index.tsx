"use client";

import { FC, useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import { SmallButtons, NormalButtons } from "./ui";

type SignOutProps = {
	sidebarState: string;
};

export const SignOut: FC<SignOutProps> = ({ sidebarState }) => {
	const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

	const handleSignOutClick = async () => {
		setIsSigningOut(true);
		try {
			await signOut();
		} catch (error) {
			toast.error("There was a problem signing out");
		} finally {
			setIsSigningOut(false);
		}
	};

	return (
		<>
			<AnimatePresence initial={false} mode="wait">
				{sidebarState === "expanded" && (
					<motion.div key="normal-buttons">
						<NormalButtons
							isSigningOut={isSigningOut}
							onSignOutClick={handleSignOutClick}
						/>
					</motion.div>
				)}
				{sidebarState === "collapsed" && (
					<motion.div key="small-buttons">
						<SmallButtons
							isSigningOut={isSigningOut}
							onSignOutClick={handleSignOutClick}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
