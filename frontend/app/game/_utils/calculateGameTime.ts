export function calculateGameTime(endIso: string, startIso?: string) {
  if (!startIso) return "00:00:00";

  const start = new Date(startIso);
  const end = new Date(endIso);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error(
      'Invalid date format. Expected ISO string like "2026-05-31T14:06:22Z".',
    );
  }

  const diffMs = Math.abs(end.getTime() - start.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => String(value).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
