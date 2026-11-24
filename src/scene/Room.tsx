import { useMemo } from "react";
import { DoubleSide } from "three";
import { posterTexture, skyTexture } from "./textures";

const WALL_Z = -0.62;

function Shelf() {
  const books = useMemo(
    () =>
      ["#b4567a", "#3e8e6a", "#e0783f", "#4a2f78", "#d9d3c3", "#2f6fa8", "#f2c14e", "#7d4a25"].map((color, i) => ({
        color,
        h: 0.17 + ((i * 37) % 7) * 0.012,
        w: 0.03 + ((i * 13) % 3) * 0.008,
      })),
    [],
  );
  let x = -0.26;
  return (
    <group position={[0.72, 1.5, WALL_Z + 0.11]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.025, 0.2]} />
        <meshStandardMaterial color="#5a3d2b" roughness={0.8} />
      </mesh>
      {books.map((b, i) => {
        const bx = x + b.w / 2;
        x += b.w + 0.006;
        return (
          <mesh key={i} position={[bx, 0.0125 + b.h / 2, 0]} rotation={[0, 0, i === 5 ? -0.25 : 0]} castShadow>
            <boxGeometry args={[b.w, b.h, 0.15]} />
            <meshStandardMaterial color={b.color} roughness={0.7} />
          </mesh>
        );
      })}
      <mesh position={[0.24, 0.07, 0]} castShadow>
        <sphereGeometry args={[0.055, 24, 16]} />
        <meshStandardMaterial color="#5aa9d6" roughness={0.4} />
      </mesh>
    </group>
  );
}

export function Room() {
  const poster = useMemo(() => posterTexture(), []);
  const sky = useMemo(() => skyTexture(), []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#2a211d" roughness={0.9} />
      </mesh>
      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0.4]} receiveShadow>
        <circleGeometry args={[1.1, 48]} />
        <meshStandardMaterial color="#4a2f40" roughness={1} />
      </mesh>
      {/* Back wall + side wall */}
      <mesh position={[0, 2, WALL_Z]} receiveShadow>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#2e2c3d" roughness={0.95} />
      </mesh>
      <mesh position={[-1.6, 2, 2]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#29273a" roughness={0.95} side={DoubleSide} />
      </mesh>
      {/* Baseboard */}
      <mesh position={[0, 0.05, WALL_Z + 0.01]}>
        <boxGeometry args={[10, 0.1, 0.02]} />
        <meshStandardMaterial color="#1e1c28" />
      </mesh>

      {/* Window with night skyline */}
      <group position={[-0.95, 1.55, WALL_Z + 0.01]}>
        <mesh>
          <planeGeometry args={[0.8, 0.9]} />
          <meshBasicMaterial map={sky} toneMapped={false} />
        </mesh>
        {[
          [0, 0.46, 0.86, 0.04],
          [0, -0.46, 0.86, 0.04],
          [-0.42, 0, 0.04, 0.96],
          [0.42, 0, 0.04, 0.96],
          [0, 0, 0.025, 0.9],
          [0, 0.05, 0.8, 0.025],
        ].map(([x, y, w, h], i) => (
          <mesh key={i} position={[x, y, 0.015]}>
            <boxGeometry args={[w, h, 0.03]} />
            <meshStandardMaterial color="#d9d3c3" roughness={0.6} />
          </mesh>
        ))}
        <mesh position={[0, -0.5, 0.05]}>
          <boxGeometry args={[0.94, 0.03, 0.1]} />
          <meshStandardMaterial color="#d9d3c3" roughness={0.6} />
        </mesh>
      </group>

      {/* Poster */}
      <group position={[-0.2, 1.68, WALL_Z + 0.008]} rotation={[0, 0, 0.015]}>
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[0.42, 0.57]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh>
          <planeGeometry args={[0.4, 0.55]} />
          <meshStandardMaterial map={poster} roughness={0.6} />
        </mesh>
      </group>

      <Shelf />
    </group>
  );
}
