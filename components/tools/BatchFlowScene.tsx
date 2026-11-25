'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, OrthographicCamera, RoundedBox } from '@react-three/drei';
import { useRef, useState } from 'react';
import { PCFShadowMap, type Group } from 'three';
import type { FlowSchedule } from './batch-flow-model';
import { palletState } from './batch-flow-pallet';

const centers = [-7.2,-4.8,0,4.8,7.2];
function FitCamera() {
  const size = useThree(state=>state.size);
  return <OrthographicCamera makeDefault position={[0,10,13]} rotation={[-Math.atan2(10,13),0,0]} zoom={size.width/18} near={.1} far={100}/>;
}
function Piece({ item, schedule, time, color, reduced }: { item: number; schedule: FlowSchedule; time: number; color: string; reduced: boolean }) {
  const ref = useRef<Group>(null);
  const state = palletState(schedule,item,time);
  const x = centers[state.pallet] + state.slotX;
  const z = state.slotZ;
  const [initial] = useState<[number,number,number]>(()=>[x,.55,z]);
  const invalidate = useThree(state=>state.invalidate);
  useFrame((_,dt)=>{
    if (!ref.current) return;
    const factor = reduced ? 1 : 1-Math.exp(-Math.min(dt,.1)*15);
    ref.current.position.x += (x-ref.current.position.x)*factor;
    // No reordering: every arrival uses its own fixed slot.
    ref.current.position.z = z;
    if (Math.abs(x-ref.current.position.x)>.001) invalidate();
  });
  return <group ref={ref} position={initial}>
    <RoundedBox args={[.53,.36,.53]} radius={.07} smoothness={3} castShadow><meshStandardMaterial color={color} roughness={.8}/></RoundedBox>
    <mesh position={[0,.185,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[state.working?.12:.07,20]}/><meshStandardMaterial color={state.working?'#c9f54b':state.processed||state.pallet===4?'#fff5e6':'#5c625f'} roughness={.8} emissive={state.working?'#9fba37':'#000000'} emissiveIntensity={.3}/></mesh>
  </group>;
}
function Pallet({ x, station, working }: { x: number; station: boolean; working: boolean }) {
  return <group position={[x,0,0]}>
    {[-.46,.46].map(side=><RoundedBox key={side} args={[.2,.16,2.95]} position={[side,.17,0]} radius={.025} smoothness={2} receiveShadow castShadow><meshStandardMaterial color="#b4a38a" roughness={1}/></RoundedBox>)}
    <RoundedBox args={[1.43,.13,3.05]} position={[0,.29,0]} radius={.07} smoothness={3} receiveShadow castShadow><meshStandardMaterial color={station?'#d0c6b4':'#c3b8a4'} roughness={.95}/></RoundedBox>
    {Array.from({length:10},(_,item)=><mesh key={item} position={[(item%2)*.64-.32,.36,Math.floor(item/2)*.58-1.16]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.57,.57]}/><meshStandardMaterial color="#a89d8c" transparent opacity={.4} roughness={1}/></mesh>)}
    {station&&<><RoundedBox args={[1.55,.55,.16]} position={[0,.56,-1.65]} radius={.07} smoothness={3} castShadow><meshStandardMaterial color="#aeb2a9" roughness={.8}/></RoundedBox><mesh position={[.5,.65,-1.55]}><sphereGeometry args={[.055,12,12]}/><meshStandardMaterial color={working?'#c9f54b':'#697166'} roughness={.7}/></mesh></>}
  </group>;
}
export default function BatchFlowScene({ schedule,time,color,reduced }: { schedule: FlowSchedule; time: number; color: string; reduced: boolean }) {
  return <Canvas frameloop="demand" orthographic camera={{position:[0,10,13],zoom:40}} shadows={{type:PCFShadowMap}} dpr={[1,1.5]} gl={{alpha:true,antialias:true}} fallback={<p>The 3D view needs WebGL. Compare the counts and times below.</p>} aria-hidden="true">
    <FitCamera/><ambientLight intensity={1.7}/><directionalLight position={[-4,10,5]} intensity={2.4} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={6} shadow-camera-bottom={-6}/>
    <group scale={.9}>
      <RoundedBox args={[17,.18,4]} radius={.15} smoothness={3} position={[0,.03,0]} receiveShadow><meshStandardMaterial color="#e8e2d7" roughness={1}/></RoundedBox>
      {centers.map((x,i)=><Pallet key={i} x={x} station={i>0&&i<4} working={time>0&&schedule.operations.some(op=>op.station===i-1&&time>=op.start&&time<op.end)}/>)}
      {Array.from({length:10},(_,item)=><Piece key={item} item={item} schedule={schedule} time={time} color={color} reduced={reduced}/>)}
    </group>
    <ContactShadows position={[0,-.12,0]} opacity={.22} scale={24} blur={2.7} far={8} resolution={256}/>
  </Canvas>;
}
