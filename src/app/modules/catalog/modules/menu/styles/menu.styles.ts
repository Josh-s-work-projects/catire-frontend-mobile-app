import { StyleSheet } from 'react-native';
import { theme } from '../../../../../shared/styles/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.dark,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginBottom: 24,
  },
  menuTitle: {
    fontSize: 22,
    fontFamily: 'Bold',
    color: theme.colors.white,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 5,
    textTransform: 'uppercase',
  },
  menuSection: {
    marginBottom: 15,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 3,
    borderColor: theme.colors.dark,
    borderRadius: 12,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  accordionIcon: {
    fontSize: 28,
    fontFamily: 'Bold',
    color: theme.colors.white,
  },
  accordionContent: {
    backgroundColor: theme.colors.primary,
    borderWidth: 3,
    borderColor: theme.colors.dark,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 0,
    paddingTop: 15,
    paddingHorizontal: 5,
  },
});