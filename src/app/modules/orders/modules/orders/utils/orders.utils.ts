import { OrderStatusType } from '../../../../../shared/api/enums';

export const getStatusDisplay = (status: OrderStatusType) => {
  switch (status) {
    case 'PENDING':
      return { text: 'Pendiente', color: '#f39c12', bg: '#fdf1de' };
    case 'PROCESSING':
      return { text: 'En Preparación', color: '#9b59b6', bg: '#f5eef8' };
    case 'DELIVERED':
      return { text: 'Entregada', color: '#2ecc71', bg: '#eafaf1' };
    case 'CANCELLED':
      return { text: 'Cancelada', color: '#e74c3c', bg: '#fdedec' };
    case 'PAID':
      return { text: 'Pagada', color: '#197a41', bg: '#fdedec' };
    default:
      return { text: 'Desconocido', color: '#95a5a6', bg: '#f4f6f7' };
  }
};