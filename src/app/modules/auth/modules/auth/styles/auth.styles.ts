import { StyleSheet } from "react-native";
import { theme } from "../../../../../shared/styles/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoPlaceholder: {
    transform: [{ rotate: '-6deg' }],
    marginBottom: 5,
  },
  logoIcon: {
    fontSize: 32,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandCatire: {
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.dark,
  },
  brandHotDogWrapper: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
    borderWidth: 2,
    borderColor: theme.colors.dark,
    borderRadius: 6,
  },
  brandHotDogText: {
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.white,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.dark,
    letterSpacing: 2,
    marginTop: 8,
  },

  cardShadow: {
    backgroundColor: theme.colors.dark,
    borderRadius: 24,
    marginTop: 8,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderWidth: 3,
    borderColor: theme.colors.dark,
    borderRadius: 24,
    padding: 24,
    transform: [{ translateX: -6 }, { translateY: -6 }],
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: theme.colors.dark,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginBottom: 24,
    lineHeight: 20,
  },

  label: {
    fontSize: 12,
    fontWeight: '900',
    color: theme.colors.dark,
    marginBottom: 6,
    marginTop: 12,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.dark,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: theme.colors.dark,
  },
  inputError: {
    borderColor: theme.colors.primary,
  },
  errorText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  errorBanner: {
    backgroundColor: theme.colors.errorBg,
    color: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    fontWeight: '700',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    textAlign: 'center',
  },

  buttonShadow: {
    backgroundColor: theme.colors.dark,
    borderRadius: 14,
    marginTop: 24,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderWidth: 3,
    borderColor: theme.colors.dark,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '900',
    fontSize: 18,
    textTransform: 'uppercase',
  },

  toggleContainer: {
    alignItems: 'center',
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
    paddingTop: 16,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    marginBottom: 4,
  },
  toggleLink: {
    fontSize: 14,
    fontWeight: '900',
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
});