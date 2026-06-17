import { StyleSheet } from 'react-native';
import { theme } from '../../../../../shared/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.dark,
    marginVertical: 20,
  },
  listContainer: {
    paddingBottom: 30,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 40,
  },
  // Tarjeta general de orden
  orderCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  cardBody: {
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 4,
  },
  detailsBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsBtnText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Estilos para la vista agrupada del Empleado
  userGroupContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  userGroupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.dark,
    marginBottom: 10,
    paddingLeft: 5,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});