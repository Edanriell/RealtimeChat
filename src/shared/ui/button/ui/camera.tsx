import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion-3d";
import { MotionValue } from "framer-motion";
import { PerspectiveCamera } from "three";
import { useThree } from "@react-three/fiber";

import { useSmoothTransform } from "@/shared/lib/hooks";
import { springTransitionHeavy } from "@/shared/config";

type CameraProps = {
	mouseX: MotionValue<number>;
	mouseY: MotionValue<number>;
};

export function Camera({ mouseX, mouseY, ...props }: CameraProps) {
	const cameraX = useSmoothTransform(
		mouseX,
		springTransitionHeavy,
		(x) => x / 350,
	);
	const cameraY = useSmoothTransform(
		mouseY,
		springTransitionHeavy,
		(y) => (-1 * y) / 350,
	);

	const set = useThree(({ set }) => set);
	const camera = useThree(({ camera }) => camera);
	const size = useThree(({ size }) => size);
	const scene = useThree(({ scene }) => scene);
	const cameraRef = useRef<any>();

	useLayoutEffect(() => {
		const { current: cam } = cameraRef;
		if (cam) {
			(cam as PerspectiveCamera).aspect = size.width / size.height;
			(cam as PerspectiveCamera).updateProjectionMatrix();
		}
	}, [size, props]);

	useLayoutEffect(() => {
		if (cameraRef.current) {
			const oldCam = camera;
			set(() => ({ camera: cameraRef.current }));
			return () => set(() => ({ camera: oldCam }));
		}
	}, [camera, cameraRef, set]);

	useLayoutEffect(() => {
		return cameraX.on("change", () => camera.lookAt(scene.position));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cameraX]);

	return (
		<motion.perspectiveCamera
			ref={cameraRef}
			fov={90}
			position={[cameraX as any, cameraY as any, 3.8]}
		/>
	);
}
