import { motion } from "framer-motion-3d";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";

import { PhongMaterial } from "./phong-material";

export function PaperPlaneModel() {
	const paperPlaneModel = useLoader(STLLoader, "/models/paper-plane.stl");

	return (
		<motion.mesh
			scale={5}
			position={[1.1, 0, 0]}
			rotation={[1.6, 2.2, 0.5]}
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
			<PhongMaterial />
		</motion.mesh>
	);
}
