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
import { MenuList } from '../modules/catalog/modules/menu/screens/MenuList';
import { Navbar } from '../shared/components/Navbar';
import { CartScreen } from '../modules/catalog/modules/products/screens/CartScreen';
import { OrderDetails } from '../modules/orders/modules/orders/screens/OrderDetails';
import { ProfileScreen } from '../modules/auth/modules/users/screens/ProfileScreen';
import { EmployeeOrdersScreen } from '../modules/orders/modules/orders/screens/EmployeeOrdersScreen';
import { ProductsAdmin } from '../modules/catalog/modules/products/screens/ProductsAdmin';
import { MenuAdmin } from '../modules/catalog/modules/menu/screens/MenuAdmin';
import { MenuForm } from '../modules/catalog/modules/menu/forms/MenuForm';
import { ProductForm } from '../modules/catalog/modules/products/forms/ProductForm';
import { OrdersAdmin } from '../modules/orders/modules/orders/screens/OrderAdmin';
import { BranchAdmin } from '../modules/catalog/modules/branches/screens/BranchAdmin';
import { UsersAdmin } from '../modules/auth/modules/users/screens/UserAdmin';
import { AdminScreen } from '../shared/screens/AdminScreen';
import { BranchForm } from '../modules/catalog/modules/branches/forms/BranchForm';
import { UserForm } from '../modules/auth/modules/users/forms/UserForm';

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
            {
              user?.role.name === 'client' && (
                <>
                  <Stack.Screen name="BranchesMap" component={BranchesMap} />
                  <Stack.Screen name="Branches" component={BranchList} />
                  <Stack.Screen name="MenuList" component={MenuList} />
                  <Stack.Screen name="ProductDetails" component={ProductDetails} />
                  <Stack.Screen name="Cart" component={CartScreen} />
                </>
              )
            }

            {
              user?.role.name === 'employee' && (
                <>
                  <Stack.Screen name="EmployeeOrders" component={EmployeeOrdersScreen} />
                  <Stack.Screen name="MenuAdmin" component={MenuAdmin} />
                  <Stack.Screen name="ProductsAdmin" component={ProductsAdmin} />
                  <Stack.Screen name="MenuForm" component={MenuForm} />
                  <Stack.Screen name="ProductForm" component={ProductForm} />
                </>
              )
            }

            {
              user?.role.name === 'admin' && (
                <>
                  <Stack.Screen name="AdminScreen" component={AdminScreen} />

                  <Stack.Screen name="MenuAdmin" component={MenuAdmin} />
                  <Stack.Screen name="BranchAdmin" component={BranchAdmin} />
                  <Stack.Screen name="ProductsAdmin" component={ProductsAdmin} />
                  <Stack.Screen name="OrdersAdmin" component={OrdersAdmin} />
                  <Stack.Screen name="UsersAdmin" component={UsersAdmin} />

                  <Stack.Screen name="MenuForm" component={MenuForm} />
                  <Stack.Screen name="BranchForm" component={BranchForm} />
                  <Stack.Screen name="ProductForm" component={ProductForm} />
                  <Stack.Screen name="UserForm" component={UserForm} />
                </>
              )
            }
            
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Orders" component={OrdersScreen} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="Purchases" component={PurchasesList} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
