import { motion } from "framer-motion-3d";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";

import { PhongMaterial } from "./phong-material";

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
			<PhongMaterial />
		</motion.mesh>
	);
}
