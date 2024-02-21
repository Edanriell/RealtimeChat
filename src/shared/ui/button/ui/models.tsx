import { motion } from "framer-motion-3d";
import { MotionConfig, MotionValue } from "framer-motion";
import { Canvas } from "@react-three/fiber";

import { Camera } from "./camera";
import { Lights } from "./lights";
import { MessageModel } from "./message-model";
import { HandModel } from "./hand-model";
import { FaceModel } from "./face-model";
import { PaperPlaneModel } from "./paper-plane-model";

import { mouseToLightRotation } from "@/shared/lib/functions";
import { useSmoothTransform } from "@/shared/lib/hooks";
import { springTransition, springTransitionHeavy } from "@/shared/config";

type ModelsProps = {
	isHover: boolean;
	isPress: boolean;
	mouseX: MotionValue<any>;
	mouseY: MotionValue<any>;
};

export function Models({ isHover, isPress, mouseX, mouseY }: ModelsProps) {
	const lightRotateX = useSmoothTransform(
		mouseY,
		springTransitionHeavy,
		mouseToLightRotation,
	);
	const lightRotateY = useSmoothTransform(
		mouseX,
		springTransitionHeavy,
		mouseToLightRotation,
	);

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
					<FaceModel />
					<HandModel />
					<MessageModel />
					<PaperPlaneModel />
				</motion.group>
			</MotionConfig>
		</Canvas>
	);
}
