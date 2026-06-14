import { StyleSheet } from "react-native";
import { theme } from "../../../../../shared/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: {
    paddingRight: 15,
  },
  backIcon: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.dark,
    textTransform: 'uppercase',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  
  /* --- CARD GENERAL --- */
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.dark,
    padding: 15,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 10,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.dark,
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardBody: {
    gap: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  addressBox: {
    marginTop: 5,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },

  /* --- ITEMS CARD --- */
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.dark,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  itemCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitleRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  featuresContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
    gap: 8,
  },
  featureRow: {
    flexDirection: 'column',
    gap: 4,
  },
  featureName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  pill: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.primary
  },
  pillText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 2,
    borderTopColor: theme.colors.dark,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.white,
  }
});