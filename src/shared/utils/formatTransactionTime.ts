export default function formatTransactionTime(timestamp: string): string {
  const date = new Date(timestamp);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Kiev',
    hour12: false,
  } as const;

  const formatter = new Intl.DateTimeFormat('uk-UA', options);

  const time = formatter.format(date);

  return time;
}
