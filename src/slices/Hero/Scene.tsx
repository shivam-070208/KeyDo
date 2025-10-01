"use client";
import * as THREE from 'three'
import { Keyboard, KeyboardRefs, Keycap } from "@/app/components";
import { useGSAP } from "@gsap/react";
import { Environment, Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { SpotLight } from "three";
import { Group } from "three";
// import { useControls } from "leva";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(useGSAP,ScrollTrigger);



function Setup() {
   const [envintensity,setenvintensity] = useState<number>(0)
    const audio1 = new Audio('/sounds/blue-1.mp3');
    const audio2 = new Audio('/sounds//red-1.mp3')
  const lightRef = useRef<SpotLight | null>(null!);
  const keyboardref = useRef<Group | null>(null!);
  const keyboardAnimationref = useRef<KeyboardRefs|null>(null!)
  const KeyCapref = useRef<Group | null>(null!);
  const playKeySound = () => {
    try {
     if(audio1.paused){
        audio1.play()
     }else if(audio2.paused){
        audio2.play()
     }
    } catch {}
  };
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
      duration: 1.4,
      
    }).set(lightRef.current.position,{
        x:0,y:0,z:0
    })
     .fromTo(lightRef.current.position,{
        x:0.0,
        y:-1.0,
        z:4.0
     },{
        x:0.0,
        y:2.0,
        z:7.0,
        duration:1.5,
        onStart:()=>{
            if (lightRef.current) {
                setenvintensity(0.2)
              lightRef.current.intensity = 30;
            }
        }
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
        // Play a sound once when the scroll-based animation begins
       
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
                ["esc", "grave", "tab", "caps", "lshift", "lcontrol"],
                ["f1", "one", "q", "a", "z", "lalt"],
                ["f2", "two", "w", "s", "x", "lwin"],
                ["f3", "three", "e", "d", "c"],
                ["f4", "four", "r", "f", "v"],
                ["f5", "five", "t", "g", "b", "space"],
                ["f6", "six", "y", "h", "n"],
                ["f7", "seven", "u", "j", "m"],
                ["f8", "eight", "i", "k", "comma"],
                ["f9", "nine", "o", "l", "period"],
                ["f10", "zero", "dash", "p", "semicolon", "slash", "ralt"],
                [
                  "f11",
                  "lsquarebracket",
                  "quote",
                  "rshift",
                  "fn",
                  "arrowleft",
                  "rsquarebracket",
                  "enter",
                  "f12",
                  "equal",
                  "arrowup",
                ],
                [],
                [
                  "del",
                  "backspace",
                  "backslash",
                  "pagedown",
                  "end",
                  "arrowdown",
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
              // Match each keycap to a switch by x/z position (within epsilon)
              const EPS = 1e-1;
              keyboardColumns.forEach((column,columnsindex)=>{
                const columnKeycaps: THREE.Mesh[] = [];
                const columnSwitches: THREE.Object3D[] = [];
                column.forEach((keyname)=>{
                    if(keyname &&individualKeys[keyname]?.current ){
                        const keyMesh = individualKeys[keyname].current;
                        columnKeycaps.push(keyMesh);
                    }
                })
                keyCapsByColumn.push(columnKeycaps);
                   // Assign switches to columns based on their count
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
                        y:"+=0.05",
                        duration:0.20,
                        onStart:()=>{
                            playKeySound()
                        }
                    },wavetime)
                    scroll.to(ikey.position,{
                        y:"-=0.05",
                    },wavetime +0.20)
                })
                switchesByColumn[index].forEach((ikey)=>{
                    scroll.to(ikey.position,{
                        y:"+=0.03",
                        duration:0.12,
                      
                    },wavetime+0.08)
                    scroll.to(ikey.position,{
                        y:"-=0.03"
                    },wavetime +0.20)
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
        position={[0.0,0.0,0.0]}
        castShadow
        intensity={0.0}
        shadow-bias={-0.0008}
        shadow-normalBias={0.0009}
        shadow-mapSize={1024}
      />
      <Environment 
      
        files={["/hdr/studio-small.hdr"]}
        environmentIntensity={envintensity}
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
          floatIntensity={0.8}
          rotationIntensity={2.0}
          position={[-0.22, -0.20, 4.0]}
          rotation={[1.19, 0.43, 0.11]}
          castShadow
        >
          <Keycap texture={1}  />
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
    <Canvas camera={{ fov: 90 }} shadows>
      <Setup />
    </Canvas>
  );
}
