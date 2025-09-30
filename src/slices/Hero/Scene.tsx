"use client"
import { Keyboard } from "@/app/components"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

export function Scene(){
    return (
        <Canvas>
            <group >
              
        <Keyboard scale={9} position={[0,-0.3,4]} rotation={[Math.PI/4,0,0]}  />
        <ambientLight intensity={2} />
        <pointLight position={[0,0,5]} />
            </group>
        </Canvas>
    )
}