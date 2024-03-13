"use client";

import { useRef, FC, useEffect } from "react";

type GradientCirclesProps = {
	interactiveCircle: boolean;
	animatedCircles?: boolean;
	animatedCirclesCount?: number;
};

export const GradientCircles: FC<GradientCirclesProps> = ({
	interactiveCircle,
	animatedCircles = false,
	animatedCirclesCount = 5,
}) => {
	const interactiveCircleRef = useRef<HTMLDivElement>(null);
	const curX = useRef(0);
	const curY = useRef(0);
	const tgX = useRef(0);
	const tgY = useRef(0);

	useEffect(() => {
		const interactiveCircle = interactiveCircleRef.current;

		const moveInteractiveCircle = () => {
			curX.current += (tgX.current - curX.current) / 20;
			curY.current += (tgY.current - curY.current) / 20;
			if (interactiveCircle) {
				interactiveCircle.style.transform = `translate(${Math.round(
					curX.current,
				)}px, ${Math.round(curY.current)}px)`;
			}
			requestAnimationFrame(moveInteractiveCircle);
		};

		const handleMouseMove = (event: MouseEvent) => {
			tgX.current = event.clientX;
			tgY.current = event.clientY;
		};

		window.addEventListener("mousemove", handleMouseMove);

		// Initial function call to start animation
		moveInteractiveCircle();

		return () => {
			// Cleanup event listener on component unmount
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<>
			<div
				className={
					"absolute z-0 pointer-events-none " +
					"w-full h-full gradient-background__container"
				}
			>
				<svg xmlns="http://www.w3.org/2000/svg" className={"hidden"}>
					<defs>
						<filter id="goo">
							<feGaussianBlur
								in="SourceGraphic"
								stdDeviation="10"
								result="blur"
							/>
							<feColorMatrix
								in="blur"
								mode="matrix"
								values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
								result="goo"
							/>
							<feBlend in="SourceGraphic" in2="goo" />
						</filter>
					</defs>
				</svg>
				{animatedCircles &&
					Array.from({ length: animatedCirclesCount }).map((_, index) => (
						<div
							key={index}
							className={`gradient-background__circle-${index} z-0`}
						></div>
					))}
				{interactiveCircle && (
					<div
						className={"gradient-background__interactive-circle"}
						ref={interactiveCircleRef}
					></div>
				)}
			</div>
		</>
	);
};
