import { StyleSheet } from "react-native";
import { theme } from "../../../../../shared/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    paddingTop: 0,
    backgroundColor: theme.colors.secondary
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.dark,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 30,
    color: 'gray'
  },
  
  /* --- NUEVOS ESTILOS PARA EL ACORDEÓN --- */
  cartItemWrapper: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.dark,
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden', // Evita que el fondo sobresalga en las esquinas
  },
  cartItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  expandText: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginTop: 5,
  },
  accordionContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa'
  },
  featureSection: {
    marginTop: 10,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 6,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  readOnlyPill: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  readOnlyPillText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  /* --------------------------------------- */

  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemPrice: {
    color: 'green',
    marginTop: 2,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  actionBtn: {
    padding: 10,
    borderRadius: 5,
    width: 35,
    alignItems: 'center'
  },
  actionBtnText: {
    fontSize: 20,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  deleteBtn: {
    padding: 10
  },
  deleteText: {
    color: 'red',
    fontSize: 18,
  },
  checkoutSection: {
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
    paddingTop: 20
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'right'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  label: {
    fontSize: 16
  },
  addressForm: {
    gap: 10,
    marginBottom: 10
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.dark,
    backgroundColor: theme.colors.white,
    padding: 12,
    borderRadius: 8
  },
  confirmBtn: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12
  },
  confirmBtnDisabled: {
    backgroundColor: theme.colors.errorBg
  },
  confirmBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
    elevation: 5
  },
  successIcon: {
    fontSize: 60,
    marginBottom: 15
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  modalMessage: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    lineHeight: 22
  },
  modalBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },
  modalBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});