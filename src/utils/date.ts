import { parseISO, formatRelative, subHours } from "date-fns";
import { pt } from "date-fns/locale";
import { format } from "date-fns-tz";

const TIMEZONE_OFFSET = 0;

interface FormatOptions {
  relative?: boolean;
  replacerOnInvalid?: string;
  format?: string;
}

export const formatDate = (
  date: string | Date | undefined | null,
  options?: FormatOptions
): string => {
  if (!date) return options?.replacerOnInvalid || "-";

  if (options?.relative) {
    const [createAt, now] = [
      subHours(new Date(date), TIMEZONE_OFFSET),
      subHours(new Date(), TIMEZONE_OFFSET),
    ];

    const formattedDate = formatRelative(createAt, now, {
      locale: pt,
    });
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return format(parseISO(String(date)), options?.format ?? "dd/MM/yy", {
    timeZone: "America/Sao_Paulo",
  });
};
