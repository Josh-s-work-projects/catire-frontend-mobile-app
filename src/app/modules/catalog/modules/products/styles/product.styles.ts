import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../../../shared/styles/theme';

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 40;

export const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: theme.colors.white,
    borderWidth: 3,
    borderColor: theme.colors.dark,
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 140,
    marginBottom: 8,
    objectFit: 'contain',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Bold',
    color: theme.colors.dark,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
    height: 35,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Bold',
    color: theme.colors.primary,
  },
  addButton: {
    backgroundColor: theme.colors.dark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addText: {
    color: theme.colors.white,
    fontFamily: 'Bold',
  },
});