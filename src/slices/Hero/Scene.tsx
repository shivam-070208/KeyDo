"use client";
import * as THREE from 'three'
import { Keyboard, KeyboardRefs, Keycap } from "@/app/components";
import { useGSAP } from "@gsap/react";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { SpotLight } from "three";
import { Group } from "three";
// import { useControls } from "leva";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(useGSAP,ScrollTrigger);



function Setup() {
  const lightRef = useRef<SpotLight | null>(null!);
  const keyboardref = useRef<Group | null>(null!);
  const keyboardAnimationref = useRef<KeyboardRefs|null>(null!)
  const KeyCapref = useRef<Group | null>(null!);
  const [scalefactor, setscalefactor] = useState(
    window.innerWidth > 800 ? 1.0 : 0.8,
  );
  const resize = () => {
    setscalefactor(window.innerWidth > 800 ? 1.0 : 0.8);
  };
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
//   const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } =
//     useControls({
//       positionX: 0,
//       positionY: 0,
//       positionZ: 0,
//       rotationX: 0,
//       rotationY: 0,
//       rotationZ: 0,
//     });

 
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
    if (keyboardref.current && lightRef.current && KeyCapref.current) {
    
     const tl = gsap.timeline();
     if (typeof window !== "undefined") {
        window.scrollTo({top:0})
          document.body.style.overflow = "hidden";
      }
     tl.to(keyboardref.current.rotation, {
      x:1.46,
      y: -0.09,
      z:0.13,
      duration: 1.4,
     }).to(keyboardref.current.position,{
        x:-0.22,
        y:-0.46,
        z:3.8,
        duration:1.3

    }).to(KeyCapref.current.scale,{
      x: 1,
      y: 1,
      z: 1,
      duration: 1.4
    })
     .to(lightRef.current.position,{
        z:5.20,
        duration:1.4
     },"<").call(()=>{
        if (typeof window !== "undefined") {
            document.body.style.overflow = "";
          }
         if(!KeyCapref.current || !keyboardref.current) return;
        const scroll= gsap.timeline({
            scrollTrigger:{
                trigger:".hero",
                start:"top top",
                end:"bottom bottom",
                scrub:1
            }
        })
         scroll.to(KeyCapref.current.scale,{
            x: 2.0,
            y: 2.0,
            z: 2.0,
            duration: 1.4
        }).to(keyboardref.current.rotation,{
            x:2*Math.PI+0.8,
            y:0,
            z:0,
            duration: 0.2
        },0.0).to(keyboardref.current.position,{
            x:"+=0.4",
            z:"+=0.4"
        },"<")

        if (keyboardAnimationref.current) {
            const switchRefs = keyboardAnimationref.current.switches;
            const individualKeys = keyboardAnimationref.current.keys;
            const allSwitches: THREE.Object3D[] = [];
            
            [
                switchRefs.functionRow.current,
                switchRefs.numberRow.current,
                switchRefs.topRow.current,
                switchRefs.homeRow.current,
                switchRefs.bottomRow.current,
                switchRefs.modifiers.current,
                switchRefs.arrows.current,
              ].forEach((row) => {
                if (row) {
                  allSwitches.push(...Array.from(row.children));
                }
              });
           
              const keyboardColumns = [
                [ "lcontrol"],
                [ "lshift","lalt"],
                ["z","caps","lwin"],
                ["x", "a","tab"],
                ["c","s","q","grave"],
                ["v","d","w","one","esc"],
                ["f1", "b", "f", "e", "two"],
                ["f2", "n", "g", "r", "three","space"],
                ["f3", "m", "h", "t", "four"],
                ["f4", "five", "comma", "j","y", "ralt"],
                ["f5", "six", "u", "k", "period", "fn"],
                [
                  "f6",
                  "7",
                  "i",
                  "l",
                  "slash",
               "seven",
                  "arrowleft"
                ],
                ["f7","f8","f9","eight","nine","o","p","semicolon","coma","rshift"],
                [
                    "f10","f11","f12","zero","dash","equal","rsquarebracket","lsquarebracket","enter","arrowup","arrowdown"
                ],
                [
                  "del",
                  "backspace",
                  "backslash",
                  "pagedown",
                  "end",
                  "pageup",
                  "arrowright",
                ],
                [],
              ];
              const keyCapsByColumn: THREE.Mesh[][] = [];
              const switchesByColumn: THREE.Object3D[][] = [];
              const sortedSwitches = allSwitches.sort(
                (a, b) => a.position.x - b.position.x,
              );
              keyboardColumns.forEach((column,columnsindex)=>{
                const columnKeycaps: THREE.Mesh[] = [];
                const columnSwitches: THREE.Object3D[] = [];
                column.forEach((keyname)=>{
                    if(keyname &&individualKeys[keyname]?.current ){
                        columnKeycaps.push(individualKeys[keyname].current);                       
                    }
                })
                keyCapsByColumn.push(columnKeycaps);
                const switchesPerColumn = Math.ceil(
                    sortedSwitches.length / keyboardColumns.length,
                  );
                  const startIndex = columnsindex * switchesPerColumn;
                  const endIndex = Math.min(
                    startIndex + switchesPerColumn,
                    sortedSwitches.length,
                  );
    
                  for (let i = startIndex; i < endIndex; i++) {
                    if (sortedSwitches[i]) {
                      columnSwitches.push(sortedSwitches[i]);
                    }
                  }
                  switchesByColumn.push(columnSwitches);
                
              })
              keyCapsByColumn.forEach((key,index)=>{
               const  wavetime = index / keyCapsByColumn.length;
                key.forEach((ikey)=>{
                    scroll.to(ikey.position,{
                        y:"+=0.04",
                        duration:0.14
                    },wavetime +0.5)
                    scroll.to(ikey.position,{
                        y:"-=0.04",
                    },wavetime +0.64)
                })
              })
        }
     })
    }
    })
  }, [keyboardref,lightRef,KeyCapref]);
  return (
    <group scale={scalefactor} position={[0, 0, 0]}>
      <spotLight
        ref={lightRef}
        position={[-0.02,1.54,-4.0]}
        castShadow
        intensity={20}
        shadow-normalbias={10}
        shadow-bias={0.3}
        shadow-mapSize={0.4}
      />
      <Environment 
      
        files={["/hdr/studio-small.hdr"]}
        environmentIntensity={0.009}
      />
      <group ref={keyboardref}   position={[0,0,0]} >
        <Keyboard
          castShadow
          scale={9}
            ref={keyboardAnimationref}
        />
      </group>
      <group ref={KeyCapref} scale={2.0} castShadow>
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
        <Float
        position={[0.6, -0.71, 3.97]}
        rotation={[1.25, 0.3, -1.2]}
          floatIntensity={2.0}
          rotationIntensity={3.0}
          
        >
        <Keycap
        
          texture={5}
        />
        </Float>
        <Keycap
          position={[-0.6, -0.71, 3.97]}
          rotation={[1.25, 0.3, -0.72]}
          texture={8}
        />
       
        <Float
          position={[-0.9, 0.5, 4.15]}
          rotation={[1.18, 0.15, -0.2]}
          floatIntensity={1.0}
          rotationIntensity={2.0}
        >
          <Keycap texture={7} />
        </Float>
        <Float
          position={[0.0, 0.7, 4.05]}
          rotation={[1.2, 0.0, 0.0]}
          floatIntensity={0.9}
          rotationIntensity={1.8}
        >
          <Keycap texture={0} />
        </Float>
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
