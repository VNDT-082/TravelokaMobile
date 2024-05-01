import { View, Text } from 'react-native'
import React from 'react'
import { Microphone2, Notification, SearchNormal1, SearchStatus } from 'iconsax-react-native'
import { AppColor } from '../assets/AppColor'
import { TextInput } from 'react-native-paper'

const HeaderMenu = () => {
    return (
        <View style={{
            height: 50, flex: 1, flexDirection: 'row', backgroundColor: AppColor.Blue1, width: '100%',
            maxHeight: 50, zIndex: 100, padding: 5, justifyContent: 'center', alignItems: 'center', marginBottom: 5
        }}>
            <TextInput style={{
                width: '80%', height: 40, borderRadius: 5, backgroundColor: AppColor.TextDark

            }}
                placeholder='Tìm kiếm' />
            <View style={{
                width: '20%', flex: 1, flexDirection: 'row', height: 50, paddingLeft: 5,
                justifyContent: 'center', alignItems: 'center'
            }}>
                <SearchNormal1 size="32" color={AppColor.Snow1} variant="Outline" />
                <Notification size="32" color={AppColor.Snow1} variant="Outline" />
            </View>

        </View>
    )
}

export default HeaderMenu;