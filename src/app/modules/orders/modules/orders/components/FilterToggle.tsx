import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../../../../shared/styles/theme";

export const FilterToggle = ({ value, onChange }: { value: boolean, onChange: (v: boolean) => void }) => (
  <TouchableOpacity
    onPress={() => onChange(!value)}
    style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, padding: 5 }}
  >
    <View style={{
      width: 20, height: 20, borderRadius: 4, borderWidth: 2,
      borderColor: '#000', backgroundColor: value ? theme.colors.primary : 'transparent',
      marginRight: 10,
    }} />
    <Text>Incluir órdenes pagadas</Text>
  </TouchableOpacity>
);