import moment from "moment";

export const DATE_FORMAT = "DD/MM/YYYY";
export const TIME_FORMAT = "HH:mm";
export const MINUTES_FORMAT = "mm";

export function formatDateAndTime(date: Date) {
  const mtDate = moment(date);
  return `${mtDate.format(DATE_FORMAT)} à ${mtDate.format(TIME_FORMAT)}h${mtDate.format(MINUTES_FORMAT)}`;
}

export function formatDateOnly(date: Date) {
  const mtDate = moment(date);
  return `${mtDate.format(DATE_FORMAT)}`;
}

export function formatTimeOnly(date: Date) {
  const mtDate = moment(date);
  return `${mtDate.format(TIME_FORMAT)}`;
}
