import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatData = (value) => {
  return format(parseISO(value), 'dd/MMMM', { locale: ptBR });
}

const formatMoeda = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

const formatToken = (value) => {
  return value.toLocaleString('pt-BR') + " PIX";
}

export { formatData, formatMoeda, formatToken };