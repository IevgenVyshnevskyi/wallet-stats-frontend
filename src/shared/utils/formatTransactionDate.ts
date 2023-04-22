export function formatTransactionDateToHours(dateStr: string): string {
  const date = new Date(dateStr);

  const options = {
    weekday: 'long',
    timeZone: 'Europe/Kiev',
    locale: 'uk-UA',
  } as const;

  const dayName = new Intl.DateTimeFormat('uk-UA', options).format(date);

  const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

  return capitalizedDayName;
}

export function formatTransactionDateToUTC(date: Date): string {
  const newDate = new Date(date);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  } as const;

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(newDate);
  const isoDate = new Date(formattedDate).toISOString();

  return isoDate;
}

export function formatTransactionDateToString(dateStr: string): Date {
  return new Date(Date.parse(dateStr));
}