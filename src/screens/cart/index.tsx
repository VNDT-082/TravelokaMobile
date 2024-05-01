import { View, Text } from 'react-native'
import React, { useState } from 'react'
import HeaderMenu from '../../components/HeaderMenu';
import { AppColor } from '../../assets/AppColor';



const CartScreen = () => {

    const [dataHome, setDataHome] = useState([]);


    return (
        <View style={{
            backgroundColor: AppColor.Snow1, height: '100%'
        }}>
            <HeaderMenu />
            <View>
                <Text style={{ color: AppColor.TextLight }}>CartScreen</Text>
            </View>
        </View>
    )
}

export default CartScreen;