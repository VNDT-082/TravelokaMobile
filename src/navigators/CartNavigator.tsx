import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/cart';

const LibraryNavigator = () => {
    const Tack = createNativeStackNavigator();
    return (
        <Tack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tack.Screen name='Cart' component={CartScreen} />
        </Tack.Navigator>
    )
}

export default LibraryNavigator