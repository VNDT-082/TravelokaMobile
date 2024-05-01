import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/home';

const HomeNavigator = () => {
    const Tack = createNativeStackNavigator();
    return (
        <Tack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tack.Screen name='Home' component={HomeScreen} />
        </Tack.Navigator>
    )
}

export default HomeNavigator