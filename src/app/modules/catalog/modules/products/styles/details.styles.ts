import { StyleSheet } from 'react-native';
import { theme } from '../../../../../shared/styles/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  backButton: {
    padding: 10,
    marginLeft: -10,
  },
  backIcon: {
    fontSize: 16,
    fontFamily: 'Bold',
    color: theme.colors.dark,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  image: {
    width: '100%',
    height: 150,
    marginTop: 10,
    marginBottom: 15,
    objectFit: 'contain',
  },
  productHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 26,
    fontFamily: 'Bold',
    color: theme.colors.dark,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  productPrice: {
    fontSize: 20,
    fontFamily: 'Regular',
    color: theme.colors.dark,
    marginTop: 5,
  },

  featuresContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    minHeight: '100%',
  },
  featureSection: {
    marginBottom: 25,
  },
  featureTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Bold',
    color: theme.colors.dark,
    textTransform: 'uppercase',
  },
  
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  pillSelected: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  pillText: {
    fontSize: 14,
    fontFamily: 'Regular',
    color: theme.colors.dark,
  },
  pillTextSelected: {
    fontFamily: 'Bold',
    color: theme.colors.dark,
  },

  // Cantidad
  quantitySection: {
    marginBottom: 30,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    alignSelf: 'flex-start',
  },
  qtyBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  qtyBtnText: {
    fontSize: 24,
    fontFamily: 'Bold',
    color: theme.colors.dark,
  },
  qtyValue: {
    fontSize: 18,
    fontFamily: 'Bold',
    minWidth: 40,
    textAlign: 'center',
  },

  // Footer Flotante
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    elevation: 10,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: 'Bold',
    textTransform: 'uppercase',
  },
});