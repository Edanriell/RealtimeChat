import { motion } from "framer-motion-3d";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";

import { PhongMaterial } from "./phong-material";

export function FaceModel() {
	const faceModel = useLoader(STLLoader, "/models/face.STL");

	return (
		<motion.mesh
			scale={0.28}
            position={[-0.4, -0.5, 0]}
			rotation={[4.4, -2.9, 0.5]}
			variants={{
				hover: {
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
