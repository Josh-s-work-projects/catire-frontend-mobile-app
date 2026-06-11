import { StyleSheet, Dimensions } from 'react-native';
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
  containerLoading: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  headerLoading: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.dark,
    textTransform: 'uppercase',
    marginBottom: 8,
    textAlign: 'center',
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
  
  mapContainer: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: theme.colors.dark,
    backgroundColor: theme.colors.white,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.dark,
  },
  markerText: {
    color: theme.colors.white,
    fontWeight: '900',
    fontSize: 12,
  },

  cardShadow: {
    backgroundColor: theme.colors.dark,
    borderRadius: 24,
    marginBottom: 24,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderWidth: 3,
    borderColor: theme.colors.dark,
    borderRadius: 24,
    padding: 24,
    transform: [{ translateX: -6 }, { translateY: -6 }],
  },
  branchName: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.dark,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  branchInfo: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginBottom: 16,
  },

  buttonShadow: {
    backgroundColor: theme.colors.dark,
    borderRadius: 14,
    marginTop: 8,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    borderWidth: 3,
    borderColor: theme.colors.dark,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  buttonSecondary: {
    backgroundColor: theme.colors.white,
    borderWidth: 3,
    borderColor: theme.colors.dark,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  buttonTextPrimary: {
    color: theme.colors.white,
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  buttonTextSecondary: {
    color: theme.colors.dark,
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },

  mapOverlayCard: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },

  customPinContainer: {
    alignItems: 'center',
  },

  pinBox: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'visible',
    elevation: 8,
  },

  pinLogo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  pinTriangle: {
    position: 'absolute',
    width: 5,
    height: 5,
    top: 30,
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: theme.colors.primary,
  },
});