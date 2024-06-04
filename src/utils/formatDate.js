import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function dataExibicao(dateString) {
  return format(parseISO(dateString), 'dd/MMMM', { locale: ptBR });
}