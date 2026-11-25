'use client';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {ContactShadows,OrthographicCamera,RoundedBox} from '@react-three/drei';
import {useRef,useState} from 'react';
import {PCFShadowMap,type Group} from 'three';
import {queueSlot,type QueueJob,type QueueSchedule} from './queue-capacity-model';
function Camera(){const size=useThree(s=>s.size);return <OrthographicCamera makeDefault position={[0,9,12]} rotation={[-Math.atan2(9,12),0,0]} zoom={size.width/16} near={.1} far={100}/>;}
function Job({job,time,color,reduced}:{job:QueueJob;time:number;color:string;reduced:boolean}){
 const ref=useRef<Group>(null),invalidate=useThree(s=>s.invalidate);
 const slot=queueSlot(job.id),done=time>=job.finish,working=time>=job.start&&!done;
 const x=working?0:(done?5.2:-5.2)+slot.x,z=working?0:slot.z;
 const [initial]=useState<[number,number,number]>(()=>[-7.3+slot.x,.55,slot.z]);
 useFrame((_,dt)=>{if(!ref.current)return;const k=reduced?1:1-Math.exp(-Math.min(dt,.1)*16);ref.current.position.x+=(x-ref.current.position.x)*k;ref.current.position.z+=(z-ref.current.position.z)*k;if(Math.abs(x-ref.current.position.x)+Math.abs(z-ref.current.position.z)>.001)invalidate();});
 return <group ref={ref} position={initial} visible={time>=job.arrival}><RoundedBox args={[.52,.42,.52]} radius={.065} smoothness={3} castShadow><meshStandardMaterial color={color} roughness={.85}/></RoundedBox><mesh position={[0,.215,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.08,16]}/><meshStandardMaterial color={done?'#f5f0e6':working?'#d3ff3b':'#55605b'} roughness={.8}/></mesh></group>;
}
function Tray({x}:{x:number}){return <group position={[x,0,0]}><RoundedBox args={[2.35,.18,3.35]} position={[0,.25,0]} radius={.12} smoothness={3} receiveShadow castShadow><meshStandardMaterial color="#c8b89c" roughness={1}/></RoundedBox>{Array.from({length:15},(_,i)=>{const slot=queueSlot(i);return <mesh key={i} position={[slot.x,.345,slot.z]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.55,.55]}/><meshStandardMaterial color="#a99a81" roughness={1}/></mesh>;})}</group>;}
export default function QueueCapacityScene({schedule,time,color,reduced}:{schedule:QueueSchedule;time:number;color:string;reduced:boolean}){
 const current=schedule.jobs.find(j=>j.start<=time&&time<j.finish);
 const progress=current?(time-current.start)/schedule.minutesPerJob:0;
 const stroke=current&&!reduced?Math.sin(progress*Math.PI)*.62:0;
 return <Canvas frameloop="demand" orthographic shadows={{type:PCFShadowMap}} dpr={[1,1.5]} gl={{alpha:true,antialias:true}} aria-hidden="true"><Camera/><ambientLight intensity={1.7}/><directionalLight position={[-3,10,5]} intensity={2.5} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={6} shadow-camera-bottom={-6}/><group scale={.95}>
 <RoundedBox args={[14.5,.18,4]} radius={.15} smoothness={3} position={[0,.03,0]} receiveShadow><meshStandardMaterial color="#e8e2d7" roughness={1}/></RoundedBox><Tray x={-5.2}/><Tray x={5.2}/>
 <RoundedBox args={[2.6,.22,2.65]} radius={.1} smoothness={3} position={[0,.25,0]} receiveShadow castShadow><meshStandardMaterial color="#c9c6bb" roughness={.9}/></RoundedBox>
 {[-1.05,1.05].map(x=><RoundedBox key={x} args={[.22,1.9,.25]} radius={.05} smoothness={3} position={[x,1.3,-.65]} castShadow><meshStandardMaterial color="#a6aca5" roughness={.8}/></RoundedBox>)}
 <RoundedBox args={[2.35,.28,.5]} radius={.08} smoothness={3} position={[0,2.2,-.65]} castShadow><meshStandardMaterial color="#a6aca5" roughness={.8}/></RoundedBox>
 <RoundedBox args={[.26,.9,.26]} radius={.04} smoothness={2} position={[0,1.8-stroke,0]} castShadow><meshStandardMaterial color="#777e77" roughness={.7}/></RoundedBox>
 <RoundedBox args={[1.25,.3,1]} radius={.08} smoothness={3} position={[0,1.55-stroke,0]} castShadow><meshStandardMaterial color="#9ba398" roughness={.85}/></RoundedBox>
 {current&&<mesh position={[-.9+progress*.9,.39,1.1]}><boxGeometry args={[Math.max(.01,progress*1.8),.045,.09]}/><meshStandardMaterial color={color}/></mesh>}
 {schedule.jobs.map(job=><Job key={job.id} job={job} time={time} color={color} reduced={reduced}/>)}
 </group><ContactShadows position={[0,-.12,0]} opacity={.22} scale={20} blur={2.7} far={8} resolution={256}/></Canvas>;
}
