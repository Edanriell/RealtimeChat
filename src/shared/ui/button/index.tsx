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

import { Models } from "./ui/models";

import { cn } from "@/shared/lib";
import { springTransition } from "@/shared/config";

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
				animatedColor:
					"relative overflow-hidden bg-[#5a14de] focus:outline-none focus:ring-2 focus:ring-[#761beb] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-[#FFF]",
				expandable:
					"bg-[#5a14de] z-10 flex items-center justify-center box-border absolute focus:outline-none focus:ring-2 focus:ring-[#761beb] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
				animated3d:
					"animated-3d-button appearance-none border-none cursor-pointer bg-[#5a14de] focus:outline-none focus:ring-2 focus:ring-[#761beb] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-[#FFF] outline-none m-0 text-[20px] font-semibold tracking-[-1px] relative text-center",
				animatedCircle:
					"relative focus:outline-none focus:ring-2 focus:ring-[#761beb] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full block",
			},
			size: {
				default: "h-10 py-2 px-4",
				sm: "h-9 px-2",
				lg: "h-11 px-8",
				animatedColor: "px-[20px] py-[10px]",
				expandable: "w-[80px] h-[80px]",
				animated3d: "h-[68px] w-[136px]",
				animatedCircle: "w-[40px] h-[40px]",
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

type CircleButton = {
	bgColor?: string;
};

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
			{isLoading ? (
				<Loader2 className={"h-[15px] w-[15px] text-[#000] animate-spin"} />
			) : null}
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
				transition={{ type: "spring", stiffness: 400, damping: 10 }}
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={isLoading}
				{...props}
			>
				{isLoading ? (
					<Loader2
						className={"h-[15px] w-[15px] text-[#FFF] z-20 animate-spin"}
					/>
				) : null}
				{children}
				<div
					ref={buttonScope}
					className={
						"pointer-events-none absolute left-[0] top-[100%] " +
						"w-[inherit] h-[160px] bg-[#761beb] rounded-[inherit] z-10 " +
						"select-none"
					}
				></div>
			</motion.button>
		);
	},
	AnimatedCircle: ({
		className,
		children,
		variant,
		isLoading,
		size,
		bgColor,
		...props
	}: MotionProps & ButtonProps & CircleButton) => {
		const [isHovered, setIsHovered] = useState<boolean | null>(null);

		const iconVariants = {
			rest: {
				scale: 1,
				transition: { type: "spring", stiffness: 400, damping: 10 },
			},
			hover: {
				scale: 0.8,
				transition: { type: "spring", stiffness: 400, damping: 10 },
			},
			press: {
				scale: 1.2,
				transition: { type: "spring", stiffness: 400, damping: 10 },
			},
		};

		return (
			<motion.button
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				initial={{ backgroundColor: bgColor }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={isLoading}
				{...props}
			>
				{isLoading ? (
					<Loader2
						className={"h-[15px] w-[15px] text-[#FFF] z-20 animate-spin"}
					/>
				) : null}
				<motion.div
					tabIndex={1}
					className={"flex items-center justify-center"}
					animate={isHovered ? "hover" : "rest"}
					whileTap="press"
					variants={iconVariants}
				>
					{children}
				</motion.div>
			</motion.button>
		);
	},
	AnimatedColor: ({
		className,
		children,
		variant,
		isLoading,
		size,
		...props
	}: MotionProps & ButtonProps) => {
		return (
			<motion.button
				whileHover={{ scale: 1.05, backgroundColor: "#761beb" }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: "spring", stiffness: 400, damping: 10 }}
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={isLoading}
				{...props}
			>
				{isLoading ? (
					<Loader2
						className={"h-[15px] w-[15px] text-[#FFF] z-20 animate-spin"}
					/>
				) : null}
				{children}
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
				whileTap={{
					width: "100%",
					height: "100%",
					x: 10,
				}}
				transition={{ type: "linear" }}
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={isLoading}
				{...props}
			>
				{isLoading ? (
					<Loader2
						className={"h-[15px] w-[15px] text-[#FFF] z-20 animate-spin"}
					/>
				) : null}
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
		const [buttonRef, bounds] = useMeasure({ scroll: false });
		const [isHovered, setIsHovered] = useState(false);
		const [isPressed, setIsPressed] = useState(false);
		const mouseX = useMotionValue(0);
		const mouseY = useMotionValue(0);

		const resetMousePosition = () => {
			mouseX.set(0);
			mouseY.set(0);
		};

		return (
			<MotionConfig transition={springTransition}>
				<motion.button
					ref={buttonRef}
					initial={false}
					animate={isHovered ? "hover" : "rest"}
					whileTap="press"
					variants={{
						rest: { scale: 1 },
						hover: { scale: 1.2 },
						press: { scale: 1.1 },
					}}
					onHoverStart={() => {
						resetMousePosition();
						setIsHovered(true);
					}}
					onHoverEnd={() => {
						resetMousePosition();
						setIsHovered(false);
					}}
					onTapStart={() => setIsPressed(true)}
					onTap={() => setIsPressed(false)}
					onTapCancel={() => setIsPressed(false)}
					onPointerMove={(pointerEvent) => {
						mouseX.set(pointerEvent.clientX - bounds.x - bounds.width / 2);
						mouseY.set(pointerEvent.clientY - bounds.y - bounds.height / 2);
					}}
					className={cn(buttonVariants({ variant, size, className }))}
					disabled={isLoading}
					{...props}
				>
					<motion.div
						className={"animated-3d-button__container"}
						variants={{
							rest: { opacity: 0 },
							hover: { opacity: 1 },
						}}
					>
						<div
							className={
								"animated-3d-button__blush animated-3d-button__blush_color_pink"
							}
						/>
						<div
							className={
								"animated-3d-button__blush animated-3d-button__blush_color_blue"
							}
						/>
						<div className={"animated-3d-button__shapes"}>
							<Suspense fallback={null}>
								<Models
									isHover={isHovered}
									isPress={isPressed}
									mouseX={mouseX}
									mouseY={mouseY}
								/>
							</Suspense>
						</div>
					</motion.div>
					<motion.div
						variants={{ hover: { scale: 0.8 }, press: { scale: 1.1 } }}
						className={
							"flex items-center justify-center flex-row-reverse gap-x-[6px] " +
							"animated-3d-button__label"
						}
					>
						{isLoading ? (
							<Loader2
								className={"h-[20px] w-[20px] text-[#FFF] z-20 animate-spin"}
							/>
						) : null}
						{children}
					</motion.div>
				</motion.button>
			</MotionConfig>
		);
	},
};
