import { View, Text } from 'react-native'
import React from 'react'
import HeaderMenu from '../../components/HeaderMenu';
import { AppColor } from '../../assets/AppColor';

const Profile = () => {
    return (
        <View style={{ backgroundColor: AppColor.Snow1, height: '100%' }}>
            <HeaderMenu />
            <View>
                <Text style={{ color: AppColor.TextLight }}>Profile</Text>
            </View>
        </View>

    )
}

export default Profile;