"use client";

import { FC, useEffect } from "react";
import { MotionProps, useAnimate } from "framer-motion";
import Image from "next/image";

export const Logotype: FC<MotionProps> = () => {
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
					"absolute top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%]"
				}
				width={40}
				height={40}
			/>
			<Image
				ref={starScope1}
				alt="Star image"
				src="/images/chatx-star.png"
				className={
					"absolute top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%]"
				}
				width={15}
				height={15}
			/>
			<Image
				ref={starScope2}
				alt="Star image"
				src="/images/chatx-star.png"
				className={
					"absolute top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%]"
				}
				width={25}
				height={25}
			/>
			<Image
				ref={starScope3}
				alt="Star image"
				src="/images/chatx-star.png"
				className={
					"absolute top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%]"
				}
				width={30}
				height={30}
			/>
			<Image
				ref={starScope4}
				alt="Star image"
				src="/images/chatx-star.png"
				className={
					"absolute top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%]"
				}
				width={10}
				height={10}
			/>
		</div>
	);
};
