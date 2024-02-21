import { motion } from "framer-motion-3d";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";

import { PhongMaterial } from "./phong-material";

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
			<PhongMaterial />
		</motion.mesh>
	);
}
