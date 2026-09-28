// Between 1 second and 3 hours, whatever was typed — a negative or empty field
// would otherwise start a timer that never ends.
export function clampTime(minutes: number, seconds: number): number {
  const m = Math.min(Math.max(Math.floor(minutes) || 0, 0), 180);
  const s = Math.min(Math.max(Math.floor(seconds) || 0, 0), 59);
  return Math.max(m * 60 + s, 1);
}
