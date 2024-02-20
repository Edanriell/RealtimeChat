import { motion } from "framer-motion-3d";
import {
	MotionConfig,
	useSpring,
	useTransform,
	SpringOptions,
	MotionValue,
} from "framer-motion";
import { useRef, useLayoutEffect } from "react";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { PerspectiveCamera } from "three";

import { springTransition } from "@/shared/config";

function useSmoothTransform<T, U>(
	value: MotionValue<T>,
	springOptions: SpringOptions,
	transformer: (value: T) => U,
): MotionValue<any> {
	return useSpring(useTransform(value, transformer), springOptions);
}

type ShapesProps = {
	isHover: boolean;
	isPress: boolean;
	mouseX: MotionValue<any>;
	mouseY: MotionValue<any>;
};

export function Shapes({ isHover, isPress, mouseX, mouseY }: ShapesProps) {
	const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
	const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);

	return (
		<Canvas shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
			<Camera mouseX={mouseX} mouseY={mouseY} />
			<MotionConfig transition={springTransition}>
				<motion.group
					position={[0, 0, 0]}
					rotation={[lightRotateX as any, lightRotateY as any, 0]}
				>
					<Lights />
				</motion.group>
				<motion.group
					initial={false}
					animate={isHover ? "hover" : "rest"}
					dispose={null}
					variants={{
						hover: { z: isPress ? -0.9 : 0 },
					}}
				>
					<MessageModel />
					<HandModel />
					<FaceModel />
					<PaperPlaneModel />
				</motion.group>
			</MotionConfig>
		</Canvas>
	);
}

export function Lights() {
	return (
		<>
			<spotLight color="#5a14de" position={[-10, -10, -10]} intensity={220} />
			<spotLight color="#a395ff" position={[-10, 0, 15]} intensity={880} />
			<spotLight color="#d1caff" position={[-5, 20, 2]} intensity={550} />
			<spotLight color="#a395ff" position={[15, 10, -2]} intensity={1200} />
			<spotLight color="#2b1b9b" position={[15, 10, 5]} intensity={1100} />
			<spotLight color="#2b1b9b" position={[5, -10, 5]} intensity={880} />
			<spotLight color="#2b1b9b" position={[-10, -20, 10]} intensity={4000} />
		</>
	);
}

export function MessageModel() {
	const messageModel = useLoader(STLLoader, "/models/message.stl");

	return (
		<motion.mesh
			scale={0.01}
			position={[-0.5, -0.5, 0]}
			variants={{ hover: { z: 2 } }}
		>
			<primitive object={messageModel} />
			<Material />
		</motion.mesh>
	);
}

export function HandModel() {
	const handModel = useLoader(OBJLoader, "/models/hand.obj");

	return (
		<motion.mesh
			scale={0.5}
			position={[-0.8, 0.4, 0]}
			rotation={[-0.5, 0, -0.3]}
			variants={{
				hover: {
					z: 1.1,
					x: -1.5,
					rotateX: -0.2,
					rotateZ: 0.4,
				},
			}}
		>
			<primitive object={handModel} />
			<Material />
		</motion.mesh>
	);
}

export function FaceModel() {
	const faceModel = useLoader(STLLoader, "/models/face.STL");

	return (
		<motion.mesh
			scale={0.35}
			position={[0.1, 0.4, 0]}
			rotation={[-20, 2, 0]}
			variants={{
				hover: {
					y: 0.5,
					z: 2,
					rotateY: -0.2,
				},
			}}
		>
			<primitive object={faceModel} />
			<Material />
		</motion.mesh>
	);
}

export function PaperPlaneModel() {
	const paperPlaneModel = useLoader(STLLoader, "/models/paper-plane.stl");

	return (
		<motion.mesh
			scale={4}
			position={[1.1, 0, 0]}
			rotation-z={0.5}
			variants={{
				hover: {
					x: 1.8,
					z: 0.6,
					y: 0.6,
					rotateZ: -0.5,
				},
			}}
		>
			<primitive object={paperPlaneModel} />
			<Material />
		</motion.mesh>
	);
}

export function Material() {
	return <meshPhongMaterial color="#FFF" specular="#5a14de" shininess={10} />;
}

type CameraProps = {
	mouseX: MotionValue<number>;
	mouseY: MotionValue<number>;
};

function Camera({ mouseX, mouseY, ...props }: CameraProps) {
	const cameraX = useSmoothTransform(mouseX, spring, (x) => x / 350);
	const cameraY = useSmoothTransform(mouseY, spring, (y) => (-1 * y) / 350);

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

const spring = { stiffness: 600, damping: 30 };

const mouseToLightRotation = (v: number) => (-1 * v) / 140;
