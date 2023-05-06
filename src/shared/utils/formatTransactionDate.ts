export function formatTransactionDateToFullDate(dateStr: string): string {
  const date = new Date(dateStr);
  date.setHours(date.getHours() + 3);

  const options = {
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Kiev',
    locale: 'uk-UA',
  } as const;

  const dayOfMonthAndMonthName = new Intl.DateTimeFormat('uk-UA', options).format(date);
  const dayOfWeek = new Intl.DateTimeFormat('uk-UA', { weekday: 'long' }).format(date);
  const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

  return `${capitalizedDayOfWeek}, ${dayOfMonthAndMonthName}`;
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
  const utcDate = new Date(dateStr);
  utcDate.setUTCHours(utcDate.getUTCHours() + 3);

  return utcDate;
}