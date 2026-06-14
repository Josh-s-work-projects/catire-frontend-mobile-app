import { StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: theme.colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.dark,
  },
  logo: {
    width: 50,
    height: 50,
  },
  menuButton: {
    padding: 10,
  },
  menuIconText: {
    fontSize: 28,
    color: theme.colors.white,
    fontFamily: 'Bold',
  },

  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  closeArea: {
    flex: 1,
  },

  drawerContainer: {
    width: width * 0.70,
    backgroundColor: theme.colors.secondary,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: -5, height: 0 },
    shadowOpacity: 0.5,
    elevation: 10,
  },
  drawerHeader: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.dark,
  },
  drawerLogo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 40,
  },
  drawerUserText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  drawerBody: {
    flex: 1,
    padding: 20,
  },
  drawerItem: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.dark,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
    textAlign: 'center',
  },
  logoutItem: {
    backgroundColor: '#FFcccc',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Bold',
    color: theme.colors.primary,
    textAlign: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  cartButton: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  }
});