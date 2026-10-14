// Original procedural artwork. No video, downloaded texture or external runtime.
export const vertex = `#version 300 es
in vec2 position;
out vec2 uv;
void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;

export const fragment = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 colour;
uniform vec2 resolution;
uniform float time;
uniform vec2 pointer;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
float fbm(vec2 p){float n=0.;float a=.5;mat2 turn=mat2(.8,.6,-.6,.8);for(int i=0;i<4;i++){n+=a*noise(p);p=turn*p*2.02+3.1;a*=.5;}return n;}
void main(){
  float aspect=resolution.x/resolution.y;
  vec2 p=(uv-.5)*vec2(aspect,1.);
  p+=pointer*.055;
  float t=time*.105;
  vec2 q=vec2(fbm(p*1.7+vec2(t*.19,.0)),fbm(p*1.7+vec2(4.3,-t*.16)));
  vec2 r=vec2(fbm(p*1.8+q*2.+vec2(2.7,t*.14)),fbm(p*1.65+q*2.5+vec2(-t*.14,6.1)));
  vec2 flow=p+1.05*(r-.5);
  float surface=flow.y+.18*sin(flow.x*2.6+t*.3)+.13*sin(flow.x*4.8-flow.y*2.2-t*.17);
  float ridge=surface+.20*fbm(flow*3.+q);
  vec3 ink=vec3(.055,.062,.064);
  vec3 blue=vec3(.16,.32,.41);
  vec3 copper=vec3(.66,.35,.19);
  vec3 light=vec3(.95,.73,.52);
  float blueMask=smoothstep(-.30,-.05,ridge)*(1.-smoothstep(.16,.39,ridge));
  float copperMask=smoothstep(.08,.36,ridge);
  vec3 c=mix(ink,blue,blueMask*.93);
  c=mix(c,copper,copperMask);
  float sheen=pow(clamp(.5+.5*sin(ridge*8.0+flow.x*.55),0.,1.),6.);
  c=mix(c,light,sheen*copperMask*.68);
  float folded=pow(clamp(.5+.5*sin(ridge*16.+flow.x*.7),0.,1.),14.);
  c+=folded*blueMask*vec3(.06,.11,.14);
  // Fine contour strokes connect the liquid field with diagrams and analysis.
  float contours=abs(fract((ridge+.4)*5.)-.5);
  float aa=fwidth(ridge)*5.;
  float line=1.-smoothstep(aa,aa+.009,contours);
  float strokeArea=smoothstep(.37,.78,uv.x)*(1.-smoothstep(.15,.4,abs(uv.y-.5)));
  c+=line*strokeArea*.065;
  float grain=(hash(gl_FragCoord.xy)-.5)*.035;
  c+=grain;
  // Keep the writing on a consistently dark area, independent of motion.
  float clearText=1.-smoothstep(.12,.70,uv.x);
  c=mix(c,ink,clearText*.97);
  float edge=smoothstep(.02,.55,uv.y)*(1.-smoothstep(.72,1.15,uv.y));
  c*=.66+.34*edge;
  colour=vec4(c,1.);
}`;
