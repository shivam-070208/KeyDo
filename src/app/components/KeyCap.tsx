"use client";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useMemo } from "react";

type GLTFResult = GLTF & {
  nodes: {
    Keycap: THREE.Mesh;
  };
  materials: Record<string, unknown>;
};
type KeycapProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  texture?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};
export function Keycap(props: KeycapProps) {
  const { nodes } = useGLTF("/keycap.gltf") as unknown as GLTFResult;
  const texture = useMemo<string[]>(() => {
    return Array.from(
      { length: 9 },
      (_, index) => `/keycap_uv-${index + 1}.png`,
    );
  }, []);

  const uvTexture = useTexture(texture[props.texture ?? 0]);
  uvTexture.colorSpace = THREE.SRGBColorSpace;
  const placeholderMat = new THREE.MeshStandardMaterial({
    color: "#cccccc",
    roughness: 0.2,
    map: uvTexture,
  });

  return (
    <group dispose={null} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keycap.geometry}
        material={placeholderMat}
        rotation={[Math.PI / 2, 0, 0]}
        scale={10}
      />
    </group>
  );
}
