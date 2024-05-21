export function displayDate(dateStr: Date): string {
  const date = new Date(dateStr);
  const time = date.toLocaleTimeString();
  return date.toDateString()
    + ' '
    + time.slice(0, time.length - 3)
    + '.'
    + date.getMilliseconds()
    + time.slice(-3);
}
