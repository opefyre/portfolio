"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { fragment, vertex } from "./notes-field-shader";
import "./NotesField.css";

const reducedQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(change: () => void) {
  const mq=window.matchMedia(reducedQuery);mq.addEventListener("change",change);
  return ()=>mq.removeEventListener("change",change);
}

export function NotesField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const state = useRef({ paused: false, wake: () => {} });
  const [paused, setPaused] = useState(false);
  const reduced=useSyncExternalStore(subscribeMotion,()=>window.matchMedia(reducedQuery).matches,()=>false);
  useEffect(() => { state.current.paused=paused||reduced;state.current.wake(); },[paused,reduced]);
  useEffect(() => {
    const controls=state.current;
    const el=canvas.current;
    if(!el)return;
    const gl=el.getContext("webgl2",{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:"low-power",preserveDrawingBuffer:true});
    if(!gl)return;
    const shader=(type:number,source:string)=>{const s=gl.createShader(type)!;gl.shaderSource(s,source);gl.compileShader(s);return s;};
    const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,fragment),program=gl.createProgram()!;
    gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
    if(!gl.getShaderParameter(vs,gl.COMPILE_STATUS)||!gl.getShaderParameter(fs,gl.COMPILE_STATUS)||!gl.getProgramParameter(program,gl.LINK_STATUS)){
      gl.deleteShader(vs);gl.deleteShader(fs);gl.deleteProgram(program);return;
    }
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    gl.useProgram(program);const position=gl.getAttribLocation(program,"position");gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    const uniforms={resolution:gl.getUniformLocation(program,"resolution"),time:gl.getUniformLocation(program,"time"),pointer:gl.getUniformLocation(program,"pointer")};
    let frame=0,last=0,previous=0,elapsed=14,visible=true,lost=false,px=0,py=0,targetX=0,targetY=0,disposed=false;
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const draw=(now:number)=>{
      frame=0;if(disposed||lost||document.hidden||!visible)return;
      const moving=!controls.paused&&!motion.matches;
      if(now>=last&&now-last<1000/30&&moving){frame=requestAnimationFrame(draw);return;}
      const dt=previous?Math.min((now-previous)/1000,.1):0;previous=now;last=now;
      if(moving)elapsed+=dt;
      px+=(targetX-px)*.035;py+=(targetY-py)*.035;
      gl.viewport(0,0,el.width,el.height);gl.useProgram(program);
      gl.uniform2f(uniforms.resolution,el.width,el.height);gl.uniform1f(uniforms.time,elapsed);gl.uniform2f(uniforms.pointer,px,py);gl.drawArrays(gl.TRIANGLES,0,6);
      el.dataset.renderer="webgl";
      if(moving)frame=requestAnimationFrame(draw);
    };
    const wake=()=>{previous=0;last=0;if(!frame&&!disposed&&!lost)frame=requestAnimationFrame(draw);};
    controls.wake=wake;
    const resize=()=>{
      const box=el.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,1.5);
      const budget=box.width<600?380000:900000,scale=Math.min(dpr,Math.sqrt(budget/(box.width*box.height||1)));
      el.dataset.renderer="still";
      el.width=Math.max(1,Math.round(box.width*scale));el.height=Math.max(1,Math.round(box.height*scale));wake();
    };
    const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(el);
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else {cancelAnimationFrame(frame);frame=0;}},{threshold:0});intersection.observe(el);
    const onVisibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else wake();};
    const onMove=(e:PointerEvent)=>{if(e.pointerType!=="mouse")return;const box=el.getBoundingClientRect();targetX=(e.clientX-box.left)/box.width-.5;targetY=.5-(e.clientY-box.top)/box.height;};
    const onLeave=()=>{targetX=0;targetY=0;};
    const onLost=(e:Event)=>{e.preventDefault();lost=true;cancelAnimationFrame(frame);frame=0;el.dataset.renderer="still";};
    const parent=el.parentElement!;parent.addEventListener("pointermove",onMove,{passive:true});parent.addEventListener("pointerleave",onLeave);
    document.addEventListener("visibilitychange",onVisibility);motion.addEventListener("change",wake);el.addEventListener("webglcontextlost",onLost);resize();
    return ()=>{disposed=true;cancelAnimationFrame(frame);controls.wake=()=>{};resizeObserver.disconnect();intersection.disconnect();document.removeEventListener("visibilitychange",onVisibility);motion.removeEventListener("change",wake);el.removeEventListener("webglcontextlost",onLost);parent.removeEventListener("pointermove",onMove);parent.removeEventListener("pointerleave",onLeave);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);};
  },[]);
  return <section className="notes-field" aria-labelledby="notes-title" data-nav-tone="dark">
    <canvas ref={canvas} className="notes-field-canvas" aria-hidden="true"/>
    <div className="notes-field-content"><p className="notes-field-kicker">Operations and transformation</p><h1 id="notes-title">Notes<span aria-hidden="true">.</span></h1><p className="notes-field-intro">Practical guides to supply chains, continuous improvement and projects. Worked examples, numbers and sources.</p><a className="notes-field-read" href="#latest">Read the notes <span aria-hidden="true">↘</span></a></div>
    <div className="notes-field-footer"><p>By Abolfazl Shirkavand</p><div className="notes-field-tools"><button type="button" className="notes-field-pause" aria-pressed={paused||reduced} disabled={reduced} aria-label={reduced?"Motion off, reduced motion preference":paused?"Play hero animation":"Pause hero animation"} onClick={()=>setPaused(p=>!p)}><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">{paused||reduced?<path d="M3 1.5 10 6 3 10.5Z" fill="currentColor"/>:<path d="M3 2v8M9 2v8" stroke="currentColor" strokeWidth="1.5"/>}</svg><span>{reduced?"Motion off":paused?"Play":"Pause"}</span></button></div></div>
  </section>;
}
