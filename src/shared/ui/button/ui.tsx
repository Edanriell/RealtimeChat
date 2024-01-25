"use client";

import { ButtonHTMLAttributes, FC, useState, useEffect } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { motion, MotionProps, useAnimate } from "framer-motion";

import { cn } from "@/lib/utils";

const useMenuAnimation = (isHovered: boolean | null) => {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (isHovered === null) return;
		const menuAnimations: any = isHovered
			? [[scope.current, { y: [0, -100] }, { duration: 0.5 }]]
			: [[scope.current, { y: [-100, -200] }, { duration: 0.5 }]];

		animate([...menuAnimations]);
	}, [animate, isHovered, scope]);

	return scope;
};

export const buttonVariants = cva(
	"active:scale-95 inline-flex items-center justify-center rounded-[406px] text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
	{
		variants: {
			variant: {
				default: "bg-slate-50 text-black",
				ghost: "bg-transparent hover:text-slate-900 hover:bg-slate-200",
				animated: "relative overflow-hidden bg-black",
			},
			size: {
				default: "h-10 py-2 px-4",
				sm: "h-9 px-2",
				lg: "h-11 px-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
}

export const Button: FC<MotionProps & ButtonProps> = ({
	className,
	children,
	variant,
	isLoading,
	size,
	...props
}) => {
	const [isHovered, setIsHovered] = useState<boolean | null>(null);

	const scope = useMenuAnimation(isHovered);

	if (variant === "animated") {
		return (
			<motion.button
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={isLoading}
				{...props}
			>
				{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
				{children}
				<div
					ref={scope}
					className={
						"pointer-events-none absolute left-[-10%] top-[100%] " +
						"w-[200px] h-[160px] bg-slate-500 rounded-[100%] z-10"
					}
				></div>
			</motion.button>
		);
	} else {
		return (
			<motion.button
				whileHover={{ scale: 1.05, backgroundColor: "#E2E8f0" }}
				whileTap={{ scale: 0.95, backgroundColor: "#E2E8f0" }}
				transition={{ type: "spring", stiffness: 400, damping: 10 }}
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={isLoading}
				{...props}
			>
				{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
				{children}
			</motion.button>
		);
	}
};
