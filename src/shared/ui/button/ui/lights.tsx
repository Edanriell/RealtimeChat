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
