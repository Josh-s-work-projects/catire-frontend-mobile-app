import { StyleSheet } from "react-native";
import { theme } from "../../../../../shared/styles/theme";

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
    textTransform: 'uppercase',
    marginVertical: 15,
  },
  listContainer: {
    paddingBottom: 30,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 40,
  },
  orderCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.dark,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.dark,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardBody: {
    marginBottom: 15,
    gap: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  notesText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
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
    textTransform: 'uppercase',
  }
});