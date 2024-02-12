"use client";

import { ButtonHTMLAttributes, useState, useEffect, Suspense } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import {
	motion,
	MotionProps,
	useAnimate,
	MotionConfig,
	useMotionValue,
} from "framer-motion";
import useMeasure from "react-use-measure";

import { cn } from "@/shared/lib";

import { Shapes } from "./shapes";

const useButtonAnimation = (isHovered: boolean | null) => {
	const [buttonScope, animateButton] = useAnimate();

	useEffect(() => {
		if (isHovered === null) return;
		const menuAnimations: any = isHovered
			? [[buttonScope.current, { y: [0, -100] }, { duration: 0.5 }]]
			: [[buttonScope.current, { y: [-100, -200] }, { duration: 0.5 }]];

		animateButton([...menuAnimations]);
	}, [animateButton, isHovered, buttonScope]);

	return buttonScope;
};

export const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-[406px] text-sm font-medium",
	{
		variants: {
			variant: {
				default:
					"bg-slate-50 text-black focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
				ghost: "bg-transparent hover:text-slate-900 hover:bg-slate-200",
				animated:
					"relative overflow-hidden bg-[#5a14de] focus:outline-none focus:ring-2 focus:ring-[#761beb] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
				expandable:
					"bg-[#5a14de] z-10 flex items-center justify-center box-border absolute focus:outline-none focus:ring-2 focus:ring-[#761beb] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
				animated3d:
					"appearance-none border-none cursor-pointer bg-[#acc7ed] text-[#FFF] rounded-[60px] outline-none m-0 text-[48px] font-semibold leading-[48px] tracking-[-1px] relative text-center flex items-center justify-center",
			},
			size: {
				default: "h-10 py-2 px-4",
				sm: "h-9 px-2",
				lg: "h-11 px-8",
				expandable: "w-[80px] h-[80px]",
				animated3d: "py-[12px] px-[25px]",
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

export const Button = {
	Default: ({
		className,
		children,
		variant,
		isLoading,
		size,
		...props
	}: MotionProps & ButtonProps) => (
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
	),
	Animated: ({
		className,
		children,
		variant,
		isLoading,
		size,
		...props
	}: MotionProps & ButtonProps) => {
		const [isHovered, setIsHovered] = useState<boolean | null>(null);

		const buttonScope = useButtonAnimation(isHovered);
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
					ref={buttonScope}
					className={
						"pointer-events-none absolute left-[-10%] top-[100%] " +
						"w-[200px] h-[160px] bg-[#761beb] rounded-[100%] z-10 " +
						"select-none"
					}
				></div>
			</motion.button>
		);
	},
	Expandable: ({
		className,
		children,
		variant,
		isLoading,
		size,
		...props
	}: MotionProps & ButtonProps) => {
		return (
			<motion.button
				initial={{ borderRadius: 406, overflow: "hidden" }}
				whileHover={{
					width: "100%",
					height: "100%",
					x: 10,
				}}
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={isLoading}
				{...props}
			>
				{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
				{children}
			</motion.button>
		);
	},
	Animated3d: ({
		className,
		children,
		variant,
		isLoading,
		size,
		...props
	}: MotionProps & ButtonProps) => {
		const [ref, bounds] = useMeasure({ scroll: false });
		const [isHover, setIsHover] = useState(false);
		const [isPress, setIsPress] = useState(false);
		const mouseX = useMotionValue(0);
		const mouseY = useMotionValue(0);

		const resetMousePosition = () => {
			mouseX.set(0);
			mouseY.set(0);
		};

		const transition = {
			type: "spring",
			duration: 0.7,
			bounce: 0.2,
		};

		return (
			<MotionConfig transition={transition}>
				<motion.button
					ref={ref}
					initial={false}
					animate={isHover ? "hover" : "rest"}
					whileTap="press"
					variants={{
						rest: { scale: 1 },
						hover: { scale: 1.5 },
						press: { scale: 1.4 },
					}}
					onHoverStart={() => {
						resetMousePosition();
						setIsHover(true);
					}}
					onHoverEnd={() => {
						resetMousePosition();
						setIsHover(false);
					}}
					onTapStart={() => setIsPress(true)}
					onTap={() => setIsPress(false)}
					onTapCancel={() => setIsPress(false)}
					onPointerMove={(e) => {
						mouseX.set(e.clientX - bounds.x - bounds.width / 2);
						mouseY.set(e.clientY - bounds.y - bounds.height / 2);
					}}
					className={cn(buttonVariants({ variant, size, className }))}
					disabled={isLoading}
					{...props}
				>
					<motion.div
						className="shapes"
						variants={{
							rest: { opacity: 0 },
							hover: { opacity: 1 },
						}}
					>
						<div className="pink blush" />
						<div className="blue blush" />
						<div className="container">
							<Suspense fallback={null}>
								<Shapes
									isHover={isHover}
									isPress={isPress}
									mouseX={mouseX}
									mouseY={mouseY}
								/>
							</Suspense>
						</div>
					</motion.div>
					<motion.div
						variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
						className="label"
					>
						Send
					</motion.div>
				</motion.button>
			</MotionConfig>
		);
	},
};
