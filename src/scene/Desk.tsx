import { DESK_Y } from "./layout";

const W = 1.8;
const D = 0.8;
const T = 0.04;
const wood = "#6b4a33";
const woodDark = "#4f3524";

export function Desk() {
  const legH = DESK_Y - T;
  return (
    <group>
      <mesh position={[0, DESK_Y - T / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, T, D]} />
        <meshStandardMaterial color={wood} roughness={0.55} metalness={0.02} />
      </mesh>
      {/* Front edge trim */}
      <mesh position={[0, DESK_Y - T / 2, D / 2 + 0.004]}>
        <boxGeometry args={[W, T, 0.008]} />
        <meshStandardMaterial color={woodDark} roughness={0.6} />
      </mesh>
      {[
        [-W / 2 + 0.05, -D / 2 + 0.05],
        [W / 2 - 0.05, -D / 2 + 0.05],
        [-W / 2 + 0.05, D / 2 - 0.05],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, legH / 2, z]} castShadow receiveShadow>
          <boxGeometry args={[0.05, legH, 0.05]} />
          <meshStandardMaterial color={woodDark} roughness={0.6} />
        </mesh>
      ))}
      {/* Drawer unit on the right */}
      <group position={[W / 2 - 0.25, legH / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.46, legH, D - 0.04]} />
          <meshStandardMaterial color={wood} roughness={0.6} />
        </mesh>
        {[0.2, 0, -0.2].map((y) => (
          <group key={y} position={[0, y, (D - 0.04) / 2 + 0.002]}>
            <mesh>
              <boxGeometry args={[0.42, 0.18, 0.006]} />
              <meshStandardMaterial color={woodDark} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.03, 0.01]}>
              <boxGeometry args={[0.1, 0.014, 0.014]} />
              <meshStandardMaterial color="#c9b98f" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>
      {/* Chair hint */}
      <group position={[-0.05, 0, 0.85]}>
        <mesh position={[0, 0.46, 0]} castShadow>
          <boxGeometry args={[0.48, 0.06, 0.46]} />
          <meshStandardMaterial color="#3a2f4f" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.23, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.42, 12]} />
          <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.03, 5]} />
          <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
