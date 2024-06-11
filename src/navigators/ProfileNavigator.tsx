import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/profile';
import Login from '../screens/login';

const ProfileNavigator = () => {
    const Tack = createNativeStackNavigator();
    return (
        <Tack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tack.Screen name='Profile' component={Profile} />
            {/* <Tack.Screen name='Login' component={Login} /> */}
        </Tack.Navigator>
    )
}

export default ProfileNavigator