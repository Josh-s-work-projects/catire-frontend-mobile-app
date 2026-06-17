import { StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    margin: 20,
  },
  backText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '600',
  },

  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  dashboardCard: {
    width: (width - 60) / 2,
    paddingHorizontal: 15,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dashboardIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  dashboardCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A4A4A',
    textAlign: 'center',
  },

  list: {
    padding: 20,
    paddingBottom: 80,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#EAEAEA',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  editBtn: {
    padding: 10,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
  },
  deleteBtn: {
    padding: 10,
    backgroundColor: '#FFF0F0',
    borderRadius: 8,
  },

  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 5,
  },
  categoryPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryPillSelected: {
    backgroundColor: '#FFF9E6',
    borderColor: theme.colors.primary,
  },
  categoryPillText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryPillTextSelected: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },

  saveBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  saveBtnDisabled: {
    backgroundColor: theme.colors.errorBg,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: -2,
  },
});