"use client";
import { Keyboard, Keycap } from "@/app/components";
import { useGSAP } from "@gsap/react";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { SpotLight } from "three";
import { Group } from "three";
import { useControls } from "leva";
gsap.registerPlugin(useGSAP);
function Setup() {
  const lightRef = useRef<SpotLight | null>(null!);
  const [scalefactor, setscalefactor] = useState(
    window.innerWidth > 800 ? 1.0 : 0.8,
  );
  const keyboardref = useRef<Group | null>(null!);
  const resize = () => {
    setscalefactor(window.innerWidth > 800 ? 1.0 : 0.8);
  };
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } =
    useControls({
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
    });

  useFrame((state) => {
    if (lightRef.current) {
      if (state.clock.elapsedTime > 1.6 && state.clock.elapsedTime < 3.6) {
        lightRef.current.position.z =
          Math.sin(state.clock.elapsedTime - 1.6) * 7.4;
      }
    }
  });
  useGSAP(() => {
    if (keyboardref.current) {
      gsap.from(keyboardref.current.position, {
        z: -4,
        duration: 1.4,
      });
      gsap.from(keyboardref.current.rotation, {
        x: Math.PI / 2,
        y: Math.PI / 3,
        duration: 1.4,
      });
    }
  }, [keyboardref]);
  return (
    <group scale={scalefactor} position={[0, 0, 0]}>
      <spotLight
        ref={lightRef}
        position={[0.0, 0, 0.0]}
        castShadow
        intensity={30}
        shadow-normalbias={10}
        shadow-bias={0.3}
        shadow-mapSize={0.4}
      />
      <Environment
        files={["/hdr/blue-studio.hdr"]}
        environmentIntensity={0.05}
      />
      <group ref={keyboardref}>
        <Keyboard
          castShadow
          scale={9}
          position={[-0.2, -0.4, 4]}
          rotation={[1.5, 0, 0.1]}
        />
      </group>
      <group>
        <Float
          floatIntensity={0.8}
          rotationIntensity={2.0}
          position={[-1.26, 0.18, 4.06]}
          rotation={[1.19, 0.43, 0.11]}
        >
          <Keycap texture={1} />
        </Float>
        <Float
          position={[-1.44, 0.86, 3.97]}
          floatIntensity={2.0}
          rotationIntensity={3.0}
          rotation={[1.25, 0.0, 0.0]}
        >
          <Keycap texture={3} />
        </Float>
        <Float
          position={[-1.44, -0.67, 3.97]}
          rotation={[1.25, 0.3, -0.72]}
          floatIntensity={2.0}
          rotationIntensity={3.0}
          
        >
          <Keycap
            position={[-1.44, -0.67, 3.97]}
            rotation={[1.25, 0.3, -0.72]}
            texture={2}
          />
        </Float>
        <Float
         position={[1.8, -0.43, 3.97]}
         rotation={[1.25, -0.05, 0.63]}
          floatIntensity={2.0}
          rotationIntensity={3.0}
          
        >
        <Keycap
          
          texture={4}
        />
        </Float>
        <Keycap
          position={[0.6, 0.08, 3.97]}
          rotation={[1.25, 0.3, -0.72]}
          texture={5}
        />
        <Keycap
          position={[0.6, -0.71, 3.97]}
          rotation={[1.25, 0.3, -0.72]}
          texture={7}
        />
        <Keycap
          position={[-0.6, -0.71, 3.97]}
          rotation={[1.25, 0.3, -0.72]}
          texture={8}
        />
      </group>
    </group>
  );
}
export function Scene() {
  return (
    <Canvas camera={{ fov: 90 }}>
      <Setup />
    </Canvas>
  );
}
