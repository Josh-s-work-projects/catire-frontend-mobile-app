import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../modules/auth/modules/auth/screens/AuthScreen';
import BranchList from '../modules/catalog/modules/branches/screens/BranchList';
import { OrdersScreen } from '../modules/orders/modules/orders/screens/OrdersScreen';
import BranchesMap from '../modules/catalog/modules/branches/screens/BranchesMap';
import ProductDetails from '../modules/catalog/modules/products/screens/ProductDetails';
import PurchasesList from '../modules/finance/modules/purchases/screens/PurchasesList';
import { useAuthStore } from '../shared/store/auth.store';
import AdminHome from '../shared/screens/AdminHome';
import Taxes from '../shared/screens/Taxes';
import ProductsAdmin from '../shared/screens/ProductsAdmin';
import UsersAdmin from '../shared/screens/UsersAdmin';
import RolesAdmin from '../shared/screens/RolesAdmin';
import { MenuList } from '../modules/catalog/modules/menu/screens/MenuList';
import { Navbar } from '../shared/components/Navbar';
import { CartScreen } from '../modules/catalog/modules/products/screens/CartScreen';
import { OrderDetails } from '../modules/orders/modules/orders/screens/OrderDetails';
import { ProfileScreen } from '../modules/auth/modules/users/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <>
            <Stack.Screen name="Login" component={AuthScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Group screenOptions={{ header: () => <Navbar /> }}>
            <Stack.Screen name="BranchesMap" component={BranchesMap} />
            <Stack.Screen name="Branches" component={BranchList} />
            <Stack.Screen name="MenuList" component={MenuList} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            {user?.role?.name === 'admin' && <Stack.Screen name="Admin" component={AdminHome} />}
            {user?.role?.name === 'admin' && <Stack.Screen name="Taxes" component={Taxes} />}
            {user?.role?.name === 'admin' && <Stack.Screen name="ProductsAdmin" component={ProductsAdmin} />}
            {user?.role?.name === 'admin' && <Stack.Screen name="UsersAdmin" component={UsersAdmin} />}
            {user?.role?.name === 'admin' && <Stack.Screen name="RolesAdmin" component={RolesAdmin} />}
            <Stack.Screen name="Orders" component={OrdersScreen} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="Purchases" component={PurchasesList} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
