/** Hold the completed run briefly, then repeat until explicitly paused. */
export function advancePlayback(current: number, elapsed: number, finish: number) {
  const cycle = finish + 2;
  return (current + elapsed) % cycle;
}
