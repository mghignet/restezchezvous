import moment from "moment";

export const DATE_FORMAT = "DD/MM/YYYY";
export const HOURS_FORMAT = "HH";
export const MINUTES_FORMAT = "mm";

export function formatDateAndTime(date: Date) {
  const mtDate = moment(date);
  return `${mtDate.format(DATE_FORMAT)} à ${mtDate.format(HOURS_FORMAT)}h${mtDate.format(MINUTES_FORMAT)}`;
}

export function formatDateOnly(date: Date) {
  const mtDate = moment(date);
  return `${mtDate.format(DATE_FORMAT)}`;
}

export function formatHoursOnly(date: Date) {
  const mtDate = moment(date);
  return `${mtDate.format(HOURS_FORMAT)}`;
}

export function formatMinutesOnly(date: Date) {
  const mtDate = moment(date);
  return `${mtDate.format(MINUTES_FORMAT)}`;
}
