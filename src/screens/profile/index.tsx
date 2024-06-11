import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderMenu from '../../components/HeaderMenu';
import { AppColor } from '../../assets/AppColor';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: AppColor.Snow1, height: '100%' }}>
            <HeaderMenu />
            <View style={{ marginTop: 50 }}>
                {/* <Text>aaaa</Text> */}
                <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                    <Text style={{ color: AppColor.TextLight }}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default Profile;