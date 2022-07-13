import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const datePublication = (date: string) => {
  const formNow = formatDistanceToNow(parseISO(date), { locale: es });
  return `hace ${formNow}`;
};

export const dateUser = (date: string) => {
  const formNow = format(parseISO(date), "'el' d 'de' MMMM yyyy", { locale: es });
  return `${formNow}`;
};
