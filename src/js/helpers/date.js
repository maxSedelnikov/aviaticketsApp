import { format } from "date-fns";

/**
 *
 * @param {String} str дата в виде строки
 * @param {String} type - 'yyyy.mm.dd'
 */

export default function formatDate(str, type) {
  const date = new Date(str);
  return format(date, type);
}
