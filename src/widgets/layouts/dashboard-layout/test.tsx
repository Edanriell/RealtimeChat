"use client";

import { useRef, FC, useState, useEffect } from "react";

export const Test: FC = () => {
	const interBubbleRef = useRef<HTMLDivElement>(null);
	const curX = useRef(0);
	const curY = useRef(0);
	const tgX = useRef(0);
	const tgY = useRef(0);

	useEffect(() => {
		const interBubble = interBubbleRef.current;

		const move = () => {
			curX.current += (tgX.current - curX.current) / 20;
			curY.current += (tgY.current - curY.current) / 20;
			if (interBubble) {
				interBubble.style.transform = `translate(${Math.round(
					curX.current,
				)}px, ${Math.round(curY.current)}px)`;
			}
			requestAnimationFrame(move);
		};

		const handleMouseMove = (event: MouseEvent) => {
			tgX.current = event.clientX;
			tgY.current = event.clientY;
		};

		window.addEventListener("mousemove", handleMouseMove);

		move(); // Initial call to start animation

		return () => {
			// Cleanup event listener on component unmount
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<>
			<svg xmlns="http://www.w3.org/2000/svg">
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
			<div className="gradients-container absolute z-0 pointer-events-none">
				<div className="g1 z-0"></div>
				<div className="g2 z-0"></div>
				<div className="g3 z-0"></div>
				<div className="g4 z-0"></div>
				<div className="g5 z-0"></div>
				
				<div className="interactive" ref={interBubbleRef}></div>
			</div>
		</>
	);
};
