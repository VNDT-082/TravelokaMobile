import React, { ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppColor } from '../assets/AppColor';
import { Buildings, ElementEqual, ProfileCircle, ReceiptEdit } from 'iconsax-react-native';
import { Text, View } from 'react-native';
import HomeScreen from '../screens/home';
import Profile from '../screens/profile';
import TravelScreen from '../screens/travel';
import CartScreen from '../screens/cart';
import Login from '../screens/login';


const TabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <>
            <Tab.Navigator screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: AppColor.bottom,
                    borderRadius: 10,
                    marginBottom: 7,
                    marginLeft: 5,
                    marginRight: 5,
                    position: 'absolute'
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let icon: ReactNode;
                    color = focused ? AppColor.Blue1 : AppColor.Gray31;

                    switch (route.name) {
                        case 'Trang chủ':
                            icon = <ElementEqual size={size} color={color} variant='Bold' />;
                            break;
                        case 'Khách sạn':
                            icon = <Buildings size="32" color={color} variant='Bold' />;
                            break;
                        case 'Giỏ hàng':
                            icon = <ReceiptEdit size="32" color={color} variant='Bold' />;
                            break;
                        case 'Cá nhân':
                            icon = <ProfileCircle size={size} color={color} variant='Bold' />;
                            break;
                    }
                    return icon;
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold',
                    marginBottom: 12,
                    fontSize: 12
                },
                tabBarIconStyle: { marginTop: 8 },

            })}>
                <Tab.Screen name='Trang chủ' component={HomeScreen} />
                <Tab.Screen name='Khách sạn' component={TravelScreen} />
                <Tab.Screen name='Giỏ hàng' component={CartScreen} />
                <Tab.Screen name='Cá nhân' component={Profile} />
                {/* <Tab.Screen name='Login' component={Login} /> */}
            </Tab.Navigator>
            {/* <View style={{
                position: 'absolute', bottom: 90, left: 0,
                right: 0, height: 50, backgroundColor: AppColor.bottom,
                borderRadius: 25, marginLeft: 5, marginRight: 5,
                justifyContent: 'center', alignItems: 'center'
            }}>
            </View> */}
        </>
    )
}

export default TabNavigator;