export const formatTransactionTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  date.setHours(date.getHours() + 3);

  const options = {
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Kiev",
    hour12: false,
  } as const;

  const formatter = new Intl.DateTimeFormat("uk-UA", options);

  const time = formatter.format(date);

  return time;
};
