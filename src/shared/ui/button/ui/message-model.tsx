import { motion } from "framer-motion-3d";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";

import { PhongMaterial } from "./phong-material";

export function MessageModel() {
	const messageModel = useLoader(STLLoader, "/models/message.stl");

	return (
		<motion.mesh
			scale={0.0175}
			position={[0.1, 0.6, 0]}
			variants={{ hover: { z: 2 } }}
		>
			<primitive object={messageModel} />
			<PhongMaterial />
		</motion.mesh>
	);
}
