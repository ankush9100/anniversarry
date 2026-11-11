
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// -------------------------------------
// Create 3D Heart Shape
// -------------------------------------

const createHeartShape = () => {
  const shape = new THREE.Shape();

  shape.moveTo(0, 0.25);
  shape.bezierCurveTo(-0.1, 0.45, -0.5, 0.45, -0.5, 0.1);
  shape.bezierCurveTo(-0.5, -0.2, -0.15, -0.45, 0, -0.6);
  shape.bezierCurveTo(0.15, -0.45, 0.5, -0.2, 0.5, 0.1);
  shape.bezierCurveTo(0.5, 0.45, 0.1, 0.45, 0, 0.25);

  return shape;
};

const heartShape = createHeartShape();

const heartGeometryOptions = {
  depth: 0.16,
  bevelEnabled: true,
  bevelThickness: 0.035,
  bevelSize: 0.025,
  bevelSegments: 4,
  curveSegments: 24,
};

// -------------------------------------
// 3D Floating Heart
// -------------------------------------

function Heart({
  position,
  scale,
  color,
  progress,
  index,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  progress: React.RefObject<number>;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(
    () => new THREE.ExtrudeGeometry(heartShape, heartGeometryOptions),
    []
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const time = clock.elapsedTime;
    const scroll = progress.current;

    // Gentle 3D rotation
    ref.current.rotation.y =
      Math.sin(time * 0.5 + index) * 0.2 +
      scroll * Math.PI * 1.5;

    ref.current.rotation.x =
      Math.sin(time * 0.4 + index) * 0.15;

    // Smaller hearts orbit around their positions
    if (index > 0) {
      const orbitRadius = 0.12 + index * 0.015;
      const orbitAngle = time * 0.25 + index * 1.1 + scroll * 2;

      ref.current.position.x =
        position[0] + Math.cos(orbitAngle) * orbitRadius;

      ref.current.position.y =
        position[1] + Math.sin(orbitAngle) * orbitRadius;
    } else {
      ref.current.position.y =
        position[1] + Math.sin(time * 0.8) * 0.08;
    }

    // Soft breathing pulse
    const pulse = 1 + Math.sin(time * 1.5 + index) * 0.035;

    ref.current.scale.setScalar(scale * pulse);
  });

  return (
    <mesh
      ref={ref}
      position={position}
      scale={scale}
      geometry={geometry}
    >
      <meshPhysicalMaterial
        color={color}
        roughness={0.25}
        metalness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.15}
      />
    </mesh>
  );
}

// -------------------------------------
// Floating Sparkle Particles
// -------------------------------------

function Sparkles() {
  const ref = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const time = clock.elapsedTime;

    ref.current.rotation.y = Math.sin(time * 0.1) * 0.15;
    ref.current.rotation.z = Math.sin(time * 0.08) * 0.1;
    ref.current.position.y = Math.sin(time * 0.25) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffd6e2"
        size={0.035}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// -------------------------------------
// Glowing Heart Halo
// -------------------------------------

function HeartHalo() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const time = clock.elapsedTime;

    ref.current.rotation.z = time * 0.08;

    const pulse = 1 + Math.sin(time * 1.2) * 0.04;

    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={[0, 0, -1.2]}>
      <torusGeometry args={[1.25, 0.012, 12, 120]} />

      <meshBasicMaterial
        color="#ffc4d6"
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

// -------------------------------------
// Main 3D Scene
// -------------------------------------

function SceneContent({
  progress,
}: {
  progress: React.RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null!);

  const hearts = useMemo(
    () => [
      {
        position: [-2.1, 1.1, -1.5] as [number, number, number],
        scale: 0.48,
        color: "#e889a7",
      },
      {
        position: [2.1, 0.8, -1.8] as [number, number, number],
        scale: 0.38,
        color: "#f2a8bd",
      },
      {
        position: [-1.8, -1.2, -1] as [number, number, number],
        scale: 0.32,
        color: "#d97898",
      },
      {
        position: [1.8, -1.1, -1.5] as [number, number, number],
        scale: 0.42,
        color: "#f5b6c8",
      },
      {
        position: [0, 1.9, -2] as [number, number, number],
        scale: 0.25,
        color: "#e889a7",
      },
      {
        position: [0, -1.9, -1.5] as [number, number, number],
        scale: 0.28,
        color: "#d45b85",
      },
    ],
    []
  );

  // Scroll-based cinematic movement
  useFrame(({ clock }) => {
    if (!group.current) return;

    const scroll = progress.current;
    const time = clock.elapsedTime;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      scroll * Math.PI * 0.8,
      0.04
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.sin(scroll * Math.PI * 2) * 0.18,
      0.04
    );

    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      -scroll * 1.5 + Math.sin(time * 0.5) * 0.08,
      0.04
    );
  });

  return (
    <>
      {/* Romantic lighting */}
      <ambientLight intensity={0.8} />

      <directionalLight
        position={[3, 4, 5]}
        intensity={1.5}
      />

      <pointLight
        position={[-3, 2, 3]}
        intensity={1}
        color="#ffb6c1"
      />

      {/* Background effects */}
      <Sparkles />
      <HeartHalo />

      <group ref={group}>
        {/* Main 3D heart */}
        <Heart
          position={[0, 0, 0]}
          scale={1.15}
          color="#d95b82"
          progress={progress}
          index={0}
        />

        {/* Smaller orbiting hearts */}
        {hearts.map((heart, index) => (
          <Heart
            key={index}
            {...heart}
            progress={progress}
            index={index + 1}
          />
        ))}
      </group>
    </>
  );
}

// -------------------------------------
// Scene3D Component
// -------------------------------------

export default function Scene3D() {
  const progress = useRef(0);

  useEffect(() => {
    const updateScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      progress.current =
        maxScroll > 0
          ? THREE.MathUtils.clamp(
              window.scrollY / maxScroll,
              0,
              1
            )
          : 0;
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return (
    <div className="scene-3d">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
        }}
      >
        <SceneContent progress={progress} />
      </Canvas>
    </div>
  );
}
