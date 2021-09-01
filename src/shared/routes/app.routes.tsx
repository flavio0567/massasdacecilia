
import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Feather';

import Porch from '../../modules/main/pages/Porch';
import SignUp from '../../modules/auth/pages/SignUp';
import SignIn from '../../modules/auth/pages/SignIn';

import Location from '../../modules/order/pages/Location';
import LocationDetails from '../../modules/order/pages/LocationDetails';
import DateTimeDelivery from '../../modules/order/pages/DateTimeDelivery';
import Menu from '../../modules/order/pages/Menu';
import Order from '../../modules/order/pages/Order';
import Main from '../../modules/main/pages/Main';
import Products from '../../modules/order/pages/Products';
import ProductDetails from '../../modules/order/pages/ProductDetails';
import Cart from '../../modules/order/pages/Cart';
import Success from '../../modules/order/pages/Success';
import More from '../../modules/main/pages/More';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => {

  const MainStackScreen = useCallback(() => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Order"
          component={Order}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Products"
          component={Products}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }, []);

  const DeliveryStackScreen = useCallback(() => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LocationDetails"
          component={LocationDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DateTimeDelivery"
          component={DateTimeDelivery}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }, []);

  function HomeTabs(): any {
    return (
      <Tab.Navigator
        initialRouteName="Porch"
      >
        <Tab.Group>
          <Tab.Screen
            name="DeliveryStack"
            component={DeliveryStackScreen}
            options={{
              tabBarLabel: 'Início',
              headerShown: false,
              tabBarActiveTintColor: '#F2A900',
              tabBarInactiveTintColor: '#fcd0ba',
              tabBarStyle: {
                backgroundColor: '#fff5e6',
                height: 72,
              },
              tabBarLabelStyle: {
                textAlign: 'center',
                fontSize: 12,
              },
              tabBarIcon: ({ color }) => (
                <Icon
                  name="home"
                  color={color}
                  size={20}
                  style={{ padding: 6 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="MainStack"
            component={MainStackScreen}
            options={{
              tabBarLabel: 'Cardápio',
              headerShown: false,
              tabBarActiveTintColor: '#F2A900',
              tabBarInactiveTintColor: '#fcd0ba',
              tabBarStyle: {
                backgroundColor: '#fff5e6',
                height: 72,
              },
              tabBarLabelStyle: {
                textAlign: 'center',
                fontSize: 12,
              },
              tabBarIcon: ({ color }) => (
                <Icon
                  name="book-open"
                  color={color}
                  size={20}
                  style={{ padding: 6 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarLabel: 'Pedido',
              headerShown: false,
              tabBarActiveTintColor: '#F2A900',
              tabBarInactiveTintColor: '#fcd0ba',
              tabBarStyle: {
                backgroundColor: '#fff5e6',
                height: 72,
              },
              tabBarLabelStyle: {
                textAlign: 'center',
                fontSize: 12,
              },
              tabBarIcon: ({ color }) => (
                <Icon
                  name="shopping-cart"
                  color={color}
                  size={20}
                  style={{ padding: 6 }}
                />
              ),
              // tabBarBadge: 3,
            }}
          />
          <Tab.Screen
            name="More"
            component={More}
            options={{
              tabBarLabel: 'Mais',
              headerShown: false,
              tabBarActiveTintColor: '#F2A900',
              tabBarInactiveTintColor: '#fcd0ba',
              tabBarStyle: {
                backgroundColor: '#fff5e6',
                height: 72,
              },
              tabBarLabelStyle: {
                textAlign: 'center',
                fontSize: 12,
              },
              tabBarIcon: ({ color }) => (
                <Icon
                  name="more-horizontal"
                  color={color}
                  size={20}
                  style={{ padding: 6 }}
                />
              ),
            }}
            />
        </Tab.Group>
      </Tab.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Porch"
        component={Porch}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'SignIn',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'Cadastrar',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeTabs}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;