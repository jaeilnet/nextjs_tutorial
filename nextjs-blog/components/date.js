import { format, parseISO } from "date-fns";

export default function Date({ dataString }) {
  const date = parseISO(dataString);
  return <time dateTime={dataString}>{format(date, "LLLL d yyyy")}</time>;
}
