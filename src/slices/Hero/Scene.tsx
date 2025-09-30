"use client"
import { Keyboard } from "@/app/components"
import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { SpotLight } from "three"

function AnimatedLight() {
    const lightRef = useRef<SpotLight|null>(null!)
    
    useFrame((state) => {
        if (lightRef.current) {
            if (state.clock.elapsedTime < 1.0) {
                // Wait for 2 seconds before starting animation
                return;
            } else if (state.clock.elapsedTime > 3.0) {
                // Stop animation after 4 seconds
                return;
            } else {
                // Animate between 2-4 seconds
                lightRef.current.position.z = 4.3 + Math.sin((state.clock.elapsedTime - 1.0) ) * 0.7
            }
        }
    })
    
    return (
        <spotLight 
            ref={lightRef}
            position={[0.5, 0.4, 4.3]} 
            castShadow 
            intensity={2} 
            shadow-normalbias={10} 
            shadow-bias={0.3} 
            shadow-mapSize={0.4}
        />
    )
}
export function Scene(){
    return (
        <Canvas camera={{fov:90}}>
            <group >
              
        <Keyboard castShadow scale={9} position={[-0.2,-0.4,4]} rotation={[1.2,0,0.1]}  />
        <ambientLight intensity={1} />
        <AnimatedLight />
            </group>
        </Canvas>
    )
}