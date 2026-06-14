import { StyleSheet } from "react-native";
import { theme } from "../../../../../shared/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.dark,
    textTransform: 'uppercase',
  },
  editIcon: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: theme.colors.dark,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: theme.colors.dark,
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f9f9f9',
    color: '#999',
    borderColor: '#eee',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#95a5a6',
    alignItems: 'center',
  },
  saveBtn: {
    flex: 2,
    padding: 15,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});