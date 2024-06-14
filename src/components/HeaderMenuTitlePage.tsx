import { View, Text } from 'react-native'
import React from 'react'
import { Microphone2, Notification, SearchNormal1, SearchStatus } from 'iconsax-react-native'
import { AppColor } from '../assets/AppColor'
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
    title: string;
}
const HeaderMenuTitlePage = (props: IProps) => {
    const { title } = props;
    return (
        <View style={{
            height: 50, flex: 1, flexDirection: 'row', backgroundColor: AppColor.Blue1, width: '100%',
            maxHeight: 50, zIndex: 100, padding: 5, justifyContent: 'center', alignItems: 'center',
            marginBottom: 5, position: 'absolute'
        }}>
            <Icon name='angle-left' size={32} color="white" />
            <View style={{
                width: '20%', flex: 5, flexDirection: 'row', height: 50, paddingLeft: 5,
                justifyContent: 'center', alignItems: 'center'
            }}>
                <View style={{
                    flex: 4, flexDirection: 'column', height: 50, paddingLeft: 5,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text>
                        {title}
                    </Text>
                </View>

                <Text style={{ flex: 1, fontSize: 15, fontWeight: 'semibold', color: 'white' }}>Thay đổi</Text>
            </View>

        </View>
    )
}

export default HeaderMenuTitlePage;