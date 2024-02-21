"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { CameraHelper, Light } from "three";
import {
	useSpring,
	useTransform,
	SpringOptions,
	MotionValue,
} from "framer-motion";

export function useShadowHelper(
	ref: React.MutableRefObject<Light | undefined>,
) {
	const helper = useRef<CameraHelper>();
	const scene = useThree((state) => state.scene);

	useEffect(() => {
		if (!ref.current) return;

		helper.current = new CameraHelper((ref as any).current?.shadow.camera);
		if (helper.current) {
			scene.add(helper.current);
		}

		return () => {
			if (helper.current) {
				scene.remove(helper.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [helper.current?.uuid, (ref as any).current]);

	useFrame(() => {
		if (helper.current?.update) {
			helper.current.update();
		}
	});
}

export function useSmoothTransform<T, U>(
	value: MotionValue<T>,
	springOptions: SpringOptions,
	transformer: (value: T) => U,
): MotionValue<any> {
	return useSpring(useTransform(value, transformer), springOptions);
}
