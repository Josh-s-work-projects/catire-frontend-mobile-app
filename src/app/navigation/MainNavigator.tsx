import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../modules/auth/modules/auth/screens/AuthScreen';
import BranchList from '../modules/catalog/modules/branches/screens/BranchList';
import MenuList from '../modules/catalog/modules/menu/screens/MenuList';
import OrdersList from '../modules/orders/modules/orders/screens/OrdersList';
import BranchesMap from '../modules/catalog/modules/branches/screens/BranchesMap';
import ProductsList from '../modules/catalog/modules/products/screens/ProductsList';
import ProductDetails from '../modules/catalog/modules/products/screens/ProductDetails';
import PurchasesList from '../modules/finance/modules/purchases/screens/PurchasesList';
import { useAuthStore } from '../shared/store/auth.store';
import AdminHome from '../shared/screens/AdminHome';
import Taxes from '../shared/screens/Taxes';
import ProductsAdmin from '../shared/screens/ProductsAdmin';
import UsersAdmin from '../shared/screens/UsersAdmin';
import RolesAdmin from '../shared/screens/RolesAdmin';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <>
            <Stack.Screen name="Login" component={AuthScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Branches" component={BranchList} />
            <Stack.Screen name="BranchesMap" component={BranchesMap} />
            <Stack.Screen name="MenuList" component={MenuList} />
            <Stack.Screen name="ProductsList" component={ProductsList} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            {user?.role?.name === 'admin' && <Stack.Screen name="Admin" component={AdminHome} />}
            {user?.role?.name === 'admin' && <Stack.Screen name="Taxes" component={Taxes} />}
            {user?.role?.name === 'admin' && <Stack.Screen name="ProductsAdmin" component={ProductsAdmin} />}
            {user?.role?.name === 'admin' && <Stack.Screen name="UsersAdmin" component={UsersAdmin} />}
            {user?.role?.name === 'admin' && <Stack.Screen name="RolesAdmin" component={RolesAdmin} />}
            <Stack.Screen name="Orders" component={OrdersList} />
            <Stack.Screen name="Purchases" component={PurchasesList} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
