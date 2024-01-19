"use client";

import { FC, useEffect, useRef } from "react";
import { MotionProps, useAnimate, useAnimationFrame } from "framer-motion";
import Image from "next/image";

export const Logotype: FC<MotionProps> = () => {
	const creamLightRef0 = useRef<any>();
	const creamLightRef1 = useRef<any>();
	const purpleLightRef0 = useRef<any>();
	const purpleLightRef1 = useRef<any>();
	const purpleLightRef2 = useRef<any>();

	useAnimationFrame((t) => {
		const x = (1 + Math.sin(t / 1000)) * 10;
		const y = (1 + Math.sin(t / 1000)) * -10;
		creamLightRef0.current.style.transform = `translateY(${y}px) translateX(${x}px)`;
	});

	useAnimationFrame((t) => {
		const x = (1 + Math.cos(t / 1000)) * -10;
		const y = (1 + Math.sin(t / 1000)) * -15;
		creamLightRef1.current.style.transform = `translateY(${y}px) translateX(${x}px)`;
	});

	useAnimationFrame((t) => {
		const x = (1 + Math.sin(t / 1000)) * -14;
		const y = (1 + Math.cos(t / 1000)) * 10;
		purpleLightRef0.current.style.transform = `translateY(${y}px) translateX(${x}px)`;
	});

	useAnimationFrame((t) => {
		const x = (1 + Math.cos(t / 1000)) * 15;
		const y = (1 + Math.sin(t / 1000)) * 15;
		purpleLightRef1.current.style.transform = `translateY(${y}px) translateX(${x}px)`;
	});

	useAnimationFrame((t) => {
		const x = (1 + Math.sin(t / 1000)) * -5;
		const y = (1 + Math.sin(t / 1000)) * 5;
		purpleLightRef2.current.style.transform = `translateY(${y}px) translateX(${x}px)`;
	});

	const [starScope0, starAnimate0] = useAnimate();
	const [starScope1, starAnimate1] = useAnimate();
	const [starScope2, starAnimate2] = useAnimate();
	const [starScope3, starAnimate3] = useAnimate();
	const [starScope4, starAnimate4] = useAnimate();

	useEffect(() => {
		starAnimate0(
			[
				[
					starScope0.current,
					{ x: -140, y: -140 },
					{ duration: 1.85, type: "spring" },
				],
				[starScope0.current, { rotate: 360 }, { duration: 10 }],
				[starScope0.current, { rotate: -360 }, { duration: 10 }],
			],
			{ repeat: Infinity, repeatType: "reverse" },
		);
		starAnimate1(
			[
				[
					starScope1.current,
					{ x: 100, y: 20 },
					{ duration: 2, type: "spring" },
				],
				[starScope1.current, { rotate: 360 }, { duration: 10 }],
				[starScope1.current, { rotate: -360 }, { duration: 10 }],
			],
			{ repeat: Infinity, repeatType: "reverse" },
		);
		starAnimate2(
			[
				[
					starScope2.current,
					{ x: -140, y: -20 },
					{ duration: 1.95, type: "spring" },
				],
				[starScope2.current, { rotate: -360 }, { duration: 10 }],
				[starScope2.current, { rotate: 360 }, { duration: 10 }],
			],
			{ repeat: Infinity, repeatType: "reverse" },
		);
		starAnimate3(
			[
				[
					starScope3.current,
					{ x: 120, y: -100 },
					{ duration: 2, type: "spring" },
				],
				[starScope3.current, { rotate: -360 }, { duration: 10 }],
				[starScope3.current, { rotate: 360 }, { duration: 10 }],
			],
			{ repeat: Infinity, repeatType: "reverse" },
		);
		starAnimate4(
			[
				[
					starScope4.current,
					{ x: 80, y: -160 },
					{ duration: 1.85, type: "spring" },
				],
				[starScope4.current, { rotate: 360 }, { duration: 10 }],
				[starScope4.current, { rotate: -360 }, { duration: 10 }],
			],
			{ repeat: Infinity, repeatType: "reverse" },
		);
	});

	return (
		<div className={"relative"}>
			<Image
				src="/images/chatx-logo-full-cropped-cleared.png"
				alt="ChatX company logotype"
				className={"z-10 relative"}
				width={240}
				height={240}
			/>
			<Image
				ref={starScope0}
				alt="Star image"
				src="/images/chatx-star.png"
				className={
					"absolute top-[50%] left-[50%] z-0 translate-x-[-50%] translate-y-[-50%]"
				}
				width={40}
				height={40}
			/>
			<Image
				ref={starScope1}
				alt="Star image"
				src="/images/chatx-star.png"
				className={
					"absolute top-[50%] left-[50%] z-0 translate-x-[-50%] translate-y-[-50%]"
				}
				width={15}
				height={15}
			/>
			<Image
				ref={starScope2}
				alt="Star image"
				src="/images/chatx-star.png"
				className={
					"absolute top-[50%] left-[50%] z-0 translate-x-[-50%] translate-y-[-50%]"
				}
				width={25}
				height={25}
			/>
			<Image
				ref={starScope3}
				alt="Star image"
				src="/images/chatx-star.png"
				className={
					"absolute top-[50%] left-[50%] z-0 translate-x-[-50%] translate-y-[-50%]"
				}
				width={30}
				height={30}
			/>
			<Image
				ref={starScope4}
				alt="Star image"
				src="/images/chatx-star.png"
				className={
					"absolute top-[50%] left-[50%] z-0 translate-x-[-50%] translate-y-[-50%]"
				}
				width={10}
				height={10}
			/>
			<Image
				ref={creamLightRef0}
				alt="Star image"
				src="/images/chatx-cream-light.png"
				className={"absolute top-[26%] left-[-6%] z-20"}
				width={6}
				height={6}
			/>
			<Image
				ref={creamLightRef1}
				alt="Star image"
				src="/images/chatx-cream-light.png"
				className={"absolute top-[40%] left-[100%] z-20"}
				width={8}
				height={8}
			/>
			<Image
				ref={purpleLightRef0}
				alt="Star image"
				src="/images/chatx-purple-light.png"
				className={"absolute top-[60%] left-[4%] z-20"}
				width={8}
				height={8}
			/>
			<Image
				ref={purpleLightRef1}
				alt="Star image"
				src="/images/chatx-purple-light.png"
				className={"absolute top-[-20%] left-[60%] z-20"}
				width={12}
				height={12}
			/>
			<Image
				ref={purpleLightRef2}
				alt="Star image"
				src="/images/chatx-purple-light.png"
				className={"absolute top-[0%] left-[95%] z-20"}
				width={10}
				height={10}
			/>
		</div>
	);
};
