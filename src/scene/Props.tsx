import { RoundedBox } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import { InstancedMesh, Object3D, type SpotLight } from "three";
import { s } from "@/i18n/strings";
import { useScene } from "@/state/scene";
import { Clickable } from "./Clickable";
import { DESK_Y } from "./layout";

const plastic = "#d8cfb8";

function Keyboard() {
  const keys = useRef<InstancedMesh>(null);
  const layout = useMemo(() => {
    const out: { x: number; z: number; w: number }[] = [];
    const k = 0.0235;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 15; c++) out.push({ x: -0.175 + c * k + (r % 2) * 0.006, z: -0.05 + r * k, w: 0.02 });
    out.push({ x: 0, z: -0.05 + 4 * k, w: 0.15 });
    return out;
  }, []);

  useLayoutEffect(() => {
    const m = keys.current;
    if (!m) return;
    const o = new Object3D();
    layout.forEach((key, i) => {
      o.position.set(key.x, 0.018, key.z);
      o.scale.set(key.w / 0.02, 1, 1);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  }, [layout]);

  return (
    <group position={[0, DESK_Y + 0.006, 0.24]} rotation={[0.05, 0, 0]}>
      <RoundedBox args={[0.43, 0.025, 0.155]} radius={0.008} smoothness={3} position={[0, 0.006, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={plastic} roughness={0.6} />
      </RoundedBox>
      <instancedMesh ref={keys} args={[undefined, undefined, layout.length]} castShadow>
        <boxGeometry args={[0.02, 0.012, 0.02]} />
        <meshStandardMaterial color="#ece6d6" roughness={0.5} />
      </instancedMesh>
    </group>
  );
}

function Mouse() {
  return (
    <group position={[0.37, DESK_Y, 0.25]}>
      <mesh position={[0, 0.002, 0]} receiveShadow>
        <boxGeometry args={[0.21, 0.004, 0.18]} />
        <meshStandardMaterial color="#2b2d42" roughness={0.95} />
      </mesh>
      <mesh position={[0.01, 0.016, 0.01]} scale={[0.028, 0.016, 0.045]} rotation={[0, -0.15, 0]} castShadow>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color={plastic} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Mug() {
  return (
    <Clickable label={s.room.mug} onActivate={() => useScene.getState().openFromRoom("solitaire")} position={[-0.42, DESK_Y, 0.16]}>
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.038, 0.034, 0.1, 28, 1, true]} />
        <meshStandardMaterial color="#e0783f" roughness={0.4} side={2} />
      </mesh>
      <mesh position={[0, 0.002, 0]}>
        <cylinderGeometry args={[0.034, 0.034, 0.004, 28]} />
        <meshStandardMaterial color="#e0783f" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.035, 28]} />
        <meshStandardMaterial color="#3b2416" roughness={0.2} />
      </mesh>
      <mesh position={[0.045, 0.05, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.022, 0.006, 10, 20, Math.PI]} />
        <meshStandardMaterial color="#e0783f" roughness={0.4} />
      </mesh>
    </Clickable>
  );
}

function Plant() {
  const leaves = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return { a, tilt: 0.5 + (i % 3) * 0.18, len: 0.12 + (i % 4) * 0.025 };
      }),
    [],
  );
  return (
    <group position={[-0.72, DESK_Y, -0.2]}>
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.065, 0.05, 0.12, 24]} />
        <meshStandardMaterial color="#b4567a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.118, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.06, 24]} />
        <meshStandardMaterial color="#3b2a1e" roughness={1} />
      </mesh>
      {leaves.map((l, i) => (
        <group key={i} position={[0, 0.12, 0]} rotation={[0, l.a, l.tilt]}>
          <mesh position={[0, l.len / 2, 0]} scale={[0.022, l.len / 2, 0.006]} castShadow>
            <sphereGeometry args={[1, 12, 8]} />
            <meshStandardMaterial color={i % 2 ? "#3e8e6a" : "#2f7356"} roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Lamp() {
  const light = useRef<SpotLight>(null);
  const target = useRef<Object3D>(null);
  useLayoutEffect(() => {
    if (light.current && target.current) light.current.target = target.current;
  }, []);
  const metal = { color: "#2b2d42", metalness: 0.6, roughness: 0.35 };
  const lampOn = useScene((st) => st.lampOn);
  const toggle = () => {
    useScene.getState().toggleLamp();
    // Read the state again: the snapshot taken before toggling still holds the old value.
    const on = useScene.getState().lampOn;
    useScene.getState().setHovered(on ? s.room.lampOn : s.room.lampOff);
  };
  return (
    <Clickable label={lampOn ? s.room.lampOn : s.room.lampOff} onActivate={toggle} position={[0.68, DESK_Y, -0.22]}>
      <mesh position={[0, 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.085, 0.02, 32]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      {/* Lower arm */}
      <mesh position={[-0.03, 0.17, 0.02]} rotation={[0.12, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.32, 10]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      {/* Upper arm */}
      <mesh position={[-0.13, 0.36, 0.06]} rotation={[0.25, 0, 1.15]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.24, 10]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      {/* Head */}
      <group position={[-0.23, 0.33, 0.1]} rotation={[0.35, 0, 0.75]}>
        <mesh castShadow>
          <coneGeometry args={[0.06, 0.09, 28, 1, true]} />
          <meshStandardMaterial color="#e0783f" roughness={0.45} side={2} />
        </mesh>
        <mesh position={[0, -0.03, 0]}>
          <sphereGeometry args={[0.022, 16, 12]} />
          <meshStandardMaterial
            color={lampOn ? "#fff3d6" : "#8f8a7c"}
            emissive="#ffd59a"
            emissiveIntensity={lampOn ? 4 : 0}
            toneMapped={false}
          />
        </mesh>
      </group>
      <spotLight
        ref={light}
        position={[-0.25, 0.31, 0.11]}
        color="#ffcf8a"
        intensity={lampOn ? 3.2 : 0}
        distance={3}
        angle={0.75}
        penumbra={0.65}
        decay={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <object3D ref={target} position={[-0.55, -0.1, 0.35]} />
    </Clickable>
  );
}

function Floppies() {
  const colors = ["#2b2d42", "#4a2f78", "#3e8e6a", "#e0783f"];
  return (
    <Clickable
      label={s.room.floppies}
      onActivate={() => useScene.getState().openFromRoom("projects")}
      position={[0.4, DESK_Y, -0.06]}
      rotation={[0, 0.35, 0]}
    >
      {colors.map((c, i) => (
        <group key={c} position={[(i % 2) * 0.004, 0.0025 + i * 0.0045, 0]} rotation={[0, i * 0.08, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.09, 0.0035, 0.094]} />
            <meshStandardMaterial color={c} roughness={0.5} />
          </mesh>
          {i === colors.length - 1 && (
            <>
              <mesh position={[0, 0.0019, 0.018]}>
                <boxGeometry args={[0.065, 0.0005, 0.045]} />
                <meshStandardMaterial color="#f4efe1" />
              </mesh>
              <mesh position={[0, 0.0019, -0.033]}>
                <boxGeometry args={[0.05, 0.0005, 0.026]} />
                <meshStandardMaterial color="#b8bcc4" metalness={0.8} roughness={0.3} />
              </mesh>
            </>
          )}
        </group>
      ))}
    </Clickable>
  );
}

function Notebook() {
  return (
    <Clickable
      label={s.room.notebook}
      onActivate={() => useScene.getState().openFromRoom("experience")}
      position={[-0.48, DESK_Y, -0.12]}
      rotation={[0, -0.25, 0]}
    >
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.02, 0.27]} />
        <meshStandardMaterial color="#4a2f78" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.17, 0.018, 0.23]} />
        <meshStandardMaterial color="#3e8e6a" roughness={0.8} />
      </mesh>
      <mesh position={[0.02, 0.041, 0.02]} rotation={[0, 0.6, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.004, 0.004, 0.15, 8]} />
        <meshStandardMaterial color="#f2c14e" roughness={0.5} />
      </mesh>
    </Clickable>
  );
}

/** A sealed letter on the desk → Mail. */
function Envelope() {
  const paper = "#f4efe1";
  const line = "#9a9381";
  return (
    <Clickable
      label={s.room.envelope}
      onActivate={() => useScene.getState().openFromRoom("mail")}
      position={[-0.3, DESK_Y, 0.38]}
      rotation={[0, 0.35, 0]}
    >
      <mesh position={[0, 0.003, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.006, 0.095]} />
        <meshStandardMaterial color={paper} roughness={0.85} />
      </mesh>
      {/* Flap edges */}
      {[1, -1].map((side) => (
        <mesh key={side} position={[side * 0.037, 0.0062, -0.0215]} rotation={[0, side * -0.55, 0]}>
          <boxGeometry args={[0.088, 0.0005, 0.0025]} />
          <meshStandardMaterial color={line} />
        </mesh>
      ))}
      {/* Wax seal */}
      <mesh position={[0, 0.0068, 0.002]}>
        <cylinderGeometry args={[0.011, 0.011, 0.002, 20]} />
        <meshStandardMaterial color="#b4567a" roughness={0.4} />
      </mesh>
      {/* Stamp */}
      <mesh position={[0.056, 0.0063, 0.032]}>
        <boxGeometry args={[0.022, 0.0006, 0.018]} />
        <meshStandardMaterial color="#e0783f" />
      </mesh>
    </Clickable>
  );
}

export function Props() {
  return (
    <group>
      <Keyboard />
      <Mouse />
      <Mug />
      <Plant />
      <Lamp />
      <Floppies />
      <Notebook />
      <Envelope />
    </group>
  );
}
