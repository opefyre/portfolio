export type QueueJob = { id: number; arrival: number; start: number; finish: number; wait: number };
export type QueueSchedule = { jobs: QueueJob[]; finish: number; minutesPerJob: number; averageWait: number; maxWait: number };
export type QueueSnapshot = { arrived: number; waiting: number; completed: number; busy: boolean; longestWait: number };

/** One hour of deterministic arrivals, one workbench, first arrival first served. */
export function queueSchedule(count: number, minutesPerJob: number, group: 1 | 2 | 4): QueueSchedule {
  if (!Number.isInteger(count)||count<6||count>15||!Number.isFinite(minutesPerJob)||minutesPerJob<=0||minutesPerJob>8||![1,2,4].includes(group)) throw Error('Invalid queue inputs');
  const finalArrival=(count-1)*60/count;
  const finalGroup=Math.floor((count-1)/group);
  let available=0;
  const jobs: QueueJob[]=Array.from({length:count},(_,id)=>{
    const arrival=group===1?id*60/count:Math.floor(id/group)/finalGroup*finalArrival;
    const start=Math.max(arrival,available);
    const finish=start+minutesPerJob;
    available=finish;
    return {id,arrival,start,finish,wait:start-arrival};
  });
  return {jobs,finish:available,minutesPerJob,averageWait:jobs.reduce((n,j)=>n+j.wait,0)/count,maxWait:Math.max(...jobs.map(j=>j.wait))};
}
export function queueSnapshot(schedule: QueueSchedule,time: number): QueueSnapshot {
  if(time<0)return {arrived:0,waiting:0,completed:0,busy:false,longestWait:0};
  const arrived=schedule.jobs.filter(j=>j.arrival<=time);
  return {arrived:arrived.length,waiting:arrived.filter(j=>j.start>time).length,completed:arrived.filter(j=>j.finish<=time).length,busy:arrived.some(j=>j.start<=time&&time<j.finish),longestWait:Math.max(0,...arrived.map(j=>Math.min(time,j.start)-j.arrival))};
}
export function queuePlot(schedule: QueueSchedule,end: number) {
  const events=[...new Set([0,...schedule.jobs.flatMap(j=>[j.arrival,j.start]),end])].sort((a,b)=>a-b);
  return events.map(time=>({time,waiting:queueSnapshot(schedule,time===0?.000001:time).waiting}));
}
/** Waiting/finished trays never compact when another job leaves. */
export function queueSlot(id: number) { return {x:(id%3-1)*.62,z:(Math.floor(id/3)-2)*.58}; }
