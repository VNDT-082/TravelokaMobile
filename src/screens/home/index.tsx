import { View, Text } from 'react-native'
import React, { useState } from 'react'
import HeaderMenu from '../../components/HeaderMenu';
import { AppColor } from '../../assets/AppColor';



const HomeScreen = () => {

    const [dataHome, setDataHome] = useState([]);


    return (
        <View style={{
            backgroundColor: AppColor.Snow1, height: '100%'
        }}>
            <HeaderMenu />
            <View>
                <Text style={{ color: AppColor.TextLight }}>HomeScreen</Text>
            </View>
        </View>
    )
}

export default HomeScreen;