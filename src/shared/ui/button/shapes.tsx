import { motion } from "framer-motion-3d";
import { MotionConfig, useSpring, useTransform } from "framer-motion";
import { useRef, useLayoutEffect, useEffect } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { CameraHelper, Light } from "three";

function useSmoothTransform(value, springOptions, transformer) {
	return useSpring(useTransform(value, transformer), springOptions);
}

function useShadowHelper(ref: React.MutableRefObject<Light | undefined>) {
	const helper = useRef<CameraHelper>();
	const scene = useThree((state) => state.scene);

	useEffect(() => {
		if (!ref.current) return;

		helper.current = new CameraHelper(ref.current?.shadow.camera);
		if (helper.current) {
			scene.add(helper.current);
		}

		return () => {
			if (helper.current) {
				scene.remove(helper.current);
			}
		};
	}, [helper.current?.uuid, ref.current]);

	useFrame(() => {
		if (helper.current?.update) {
			helper.current.update();
		}
	});
}

export function Shapes({ isHover, isPress, mouseX, mouseY }) {
	const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
	const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);

	// Config should be pulled out
	const transition = {
		type: "spring",
		duration: 0.7,
		bounce: 0.2,
	};

	return (
		<Canvas shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
			<Camera mouseX={mouseX} mouseY={mouseY} />
			<MotionConfig transition={transition}>
				<motion.group
					center={[0, 0, 0]}
					rotation={[lightRotateX, lightRotateY, 0]}
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
					<Sphere />
					<Cone />
					<Torus />
					<Icosahedron />
				</motion.group>
			</MotionConfig>
		</Canvas>
	);
}

export function Lights() {
	const refka = useRef<any>();
	useShadowHelper(refka);
	return (
		<>
			<spotLight
				ref={refka}
				color="#5a14de"
				position={[-10, -10, -10]}
				intensity={220}
			/>
			<spotLight color="#761beb" position={[-10, 0, 15]} intensity={880} />
			<spotLight color="#761beb" position={[-5, 20, 2]} intensity={550} />
			<spotLight color="#761beb" position={[15, 10, -2]} intensity={2200} />
			<spotLight color="#761beb" position={[15, 10, 5]} intensity={1100} />
			<spotLight color="##5a14de" position={[5, -10, 5]} intensity={880} />
		</>
	);
}

export function Sphere() {
	const message = useLoader(STLLoader, "/models/message.stl");

	return (
		<motion.mesh
			scale={0.01}
			position={[-0.5, -0.5, 0]}
			variants={{ hover: { z: 2 } }}
		>
			{/* <sphereGeometry args={[0.4]} /> */}
			<primitive object={message} />
			<Material />
		</motion.mesh>
	);
}

export function Cone() {
	const hand = useLoader(OBJLoader, "/models/hand.obj");

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
			{/* <coneGeometry args={[0.3, 0.6, 20]} /> */}
			<primitive object={hand} />
			<Material />
		</motion.mesh>
	);
}

export function Torus() {
	const face = useLoader(STLLoader, "/models/face.STL");

	return (
		<motion.mesh
			scale={0.35}
			position={[0.1, 0.4, 0]}
			rotation={[-0.5, 0.5, 0]}
			variants={{
				hover: {
					y: 0.5,
					z: 2,
					rotateY: -0.2,
				},
			}}
		>
			{/* <torusGeometry args={[0.2, 0.1, 10, 50]} /> */}
			<primitive object={face} />
			<Material />
		</motion.mesh>
	);
}

export function Icosahedron() {
	const paperPlanes = useLoader(STLLoader, "/models/paper-plane.stl");

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
			{/* <icosahedronGeometry args={[0.7, 0]} /> */}
			<primitive object={paperPlanes} />
			<Material />
		</motion.mesh>
	);
}

export function Material() {
	return <meshPhongMaterial color="#fff" specular="#5a14de" shininess={10} />;
}

function Camera({ mouseX, mouseY, ...props }) {
	const cameraX = useSmoothTransform(mouseX, spring, (x) => x / 350);
	const cameraY = useSmoothTransform(mouseY, spring, (y) => (-1 * y) / 350);

	const set = useThree(({ set }) => set);
	const camera = useThree(({ camera }) => camera);
	const size = useThree(({ size }) => size);
	const scene = useThree(({ scene }) => scene);
	const cameraRef = useRef();

	useLayoutEffect(() => {
		const { current: cam } = cameraRef;
		if (cam) {
			cam.aspect = size.width / size.height;
			cam.updateProjectionMatrix();
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
		return cameraX.onChange(() => camera.lookAt(scene.position));
	}, [cameraX]);

	return (
		<motion.perspectiveCamera
			ref={cameraRef}
			fov={90}
			position={[cameraX, cameraY, 3.8]}
		/>
	);
}

const spring = { stiffness: 600, damping: 30 };

const mouseToLightRotation = (v) => (-1 * v) / 140;
