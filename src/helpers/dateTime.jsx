import { dateTimeOptions } from "../common/dateType";

export default function dateTime(date) {
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString("tr-TR", dateTimeOptions);
  return formattedDate;
}
