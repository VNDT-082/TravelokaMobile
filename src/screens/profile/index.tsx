import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppColor } from '../../assets/AppColor';
import { useNavigation } from '@react-navigation/native';
import getLocalStorageItem from '../../service/getLocalStorageItem';
import LocalStoreEnum from '../../axios/LocalStoreEnum';
import URL_Enum from '../../axios/URL_Enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateProfileModal from '../../components/UpdateProfileModal';
import NotifyModal from '../../components/NotifyModal';

const Profile = () => {
    const navigation = useNavigation();
    const [notifyModalState, setNotifyModalState] = useState<boolean>(false);
    const [notifyValue, setNotifyValue] = useState<string>('');
    const [updateProfileModalState, setUpdateProfileModalState] = useState<boolean>(false);
    const [userGuest, setUserGuest] = useState<IGuest>();
    const [action, setAction] = useState<'changeInfor' | 'changePass' | 'changeContact'>('changeContact');
    const getIGuest = () => {
        const IGusetStorage = getLocalStorageItem(LocalStoreEnum.IGUEST)
        console.log('IGusetStorage', IGusetStorage)
        if (IGusetStorage != null) {
            IGusetStorage.then(gusetValue => {
                if (gusetValue) {
                    let jsonIGuest = JSON.parse(gusetValue);
                    setUserGuest(jsonIGuest.result);
                    console.log('userGuest', jsonIGuest);
                }
            }).catch(() => {
                // setErrorDes('Không lấy được thông tin đăng nhập của bạn, vui lòng đăng nhập lại');
                // setTypeNotify('Error');
                // setErrorModalState(true);
            })

        }
        else {
            // setTypeNotify('Error');
            // setErrorDes('Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục.');
            // setErrorModalState(true)
        }
    }
    useEffect(() => {
        getIGuest();
    }, []);
    return (
        <View style={{ backgroundColor: AppColor.Snow1, height: '100%', }}>
            {/* <HeaderMenu /> */}
            {userGuest ? <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: Dimensions.get('window').width, height: 200, position: 'relative' }}
                        source={require('../../assets/home/bookings/landmarklancap.png')} />
                    <View style={{
                        position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        width: '80%', justifyContent: 'center', alignItems: 'center',
                        borderRadius: 10
                    }}>
                        <Image style={{ width: 120, height: 120, borderRadius: 60 }} source={{ uri: URL_Enum.BaseURL_Avarta + userGuest.Avarta }} />
                        <Text style={{ fontSize: 24, fontWeight: 'bold', paddingBottom: 10 }}>{userGuest.Name}</Text>
                    </View>
                </View>
                <ScrollView style={{ height: Dimensions.get('window').height - 290 }}>
                    <View style={{ backgroundColor: AppColor.Gray01, padding: 10, marginVertical: 10 }}>
                        <Text>Thông tin cá nhân</Text>
                        {/* <View style={{ flexDirection: 'row', flex: 5 }}>
                        <Text style={{ flex: 2, fontSize: 15 }}>Họ tên</Text>
                        <Text style={{ flex: 3, fontSize: 15 }}>{userGuest.Name}</Text>
                    </View> */}
                        <View style={{
                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.white,
                            marginVertical: 5,
                            borderTopWidth: 0.5
                        }}>
                            <Text style={{ flex: 2, fontSize: 15 }}>Họ tên</Text>
                            <Text style={{ fontSize: 15 }}>{userGuest.Name}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.white,
                            marginVertical: 5,
                            borderTopWidth: 0.5
                        }}>
                            <Text style={{ flex: 2, fontSize: 15 }}>Giới tính</Text>
                            <Text style={{ fontSize: 15 }}>{userGuest.Sex == 1 ? 'Nam' : 'Nữ'}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.white,
                            marginVertical: 5,
                            borderTopWidth: 0.5
                        }}>
                            <Text style={{ flex: 2, fontSize: 15 }}>Ngày sinh</Text>
                            <Text style={{ fontSize: 15 }}>{userGuest.DateOfBirth ? userGuest.DateOfBirth : 'Chưa đặt'}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.white,
                            marginVertical: 5,
                            borderTopWidth: 0.5
                        }}>
                            <Text style={{ flex: 2, fontSize: 15 }}>Căn cước</Text>
                            <Text style={{ fontSize: 15 }}>{userGuest.CCCD != null &&
                                userGuest.CCCD != undefined && userGuest.CCCD != '' ?
                                userGuest.CCCD : 'Chưa đặt'}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.white,
                            marginVertical: 5, alignItems: 'flex-end', justifyContent: 'flex-end',
                            borderTopWidth: 0.5
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setAction('changeInfor');
                                    setUpdateProfileModalState(true)
                                }}>
                                <Text style={{
                                    color: AppColor.white,
                                    backgroundColor: AppColor.Blue1, paddingHorizontal: 20, paddingVertical: 10
                                }}>Đổi thông tin cá nhân</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ backgroundColor: AppColor.Gray01, padding: 10, marginVertical: 10 }}>
                        <Text>Thông tin liên hệ</Text>
                        {/* <View style={{ flexDirection: 'row', flex: 5 }}>
                        <Text style={{ flex: 2, fontSize: 15 }}>Họ tên</Text>
                        <Text style={{ flex: 3, fontSize: 15 }}>{userGuest.Name}</Text>
                    </View> */}

                        <View style={{
                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.white,
                            marginVertical: 5,
                            borderTopWidth: 0.5
                        }}>
                            <Text style={{ flex: 2, fontSize: 15 }}>Email đăng ký</Text>
                            <Text style={{ fontSize: 15 }}>{userGuest.EmailContact ? userGuest.EmailContact
                                : 'Chưa đặt'}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.white,
                            marginVertical: 5,
                            borderTopWidth: 0.5
                        }}>
                            <Text style={{ flex: 2, fontSize: 15 }}>Email liên hệ</Text>
                            <Text style={{ fontSize: 15 }}>{userGuest.Email ? userGuest.Email
                                : 'Chưa đặt'}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.white,
                            marginVertical: 5,
                            borderTopWidth: 0.5
                        }}>
                            <Text style={{ flex: 2, fontSize: 15 }}>Số điện thoại</Text>
                            <Text style={{ fontSize: 15 }}>{userGuest.TelephoneContact ? userGuest.TelephoneContact
                                : 'Chưa đặt'}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.white,
                            marginVertical: 5, alignItems: 'flex-end', justifyContent: 'flex-end',
                            borderTopWidth: 0.5
                        }}>
                            <TouchableOpacity>
                                <Text style={{
                                    color: AppColor.white,
                                    backgroundColor: AppColor.Blue1, paddingHorizontal: 20, paddingVertical: 10
                                }}>Đổi email liên hệ</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.white,
                            marginVertical: 5, alignItems: 'flex-end', justifyContent: 'flex-end',
                            borderTopWidth: 0.5
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setAction('changePass');
                                    setUpdateProfileModalState(true);
                                }}>
                                <Text style={{
                                    color: AppColor.white,
                                    backgroundColor: AppColor.Blue1, paddingHorizontal: 30, paddingVertical: 10
                                }}>Đổi mật khẩu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ backgroundColor: AppColor.Gray01, marginVertical: 10 }}>
                        <View style={{
                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.white,
                            marginVertical: 5, alignItems: 'center', justifyContent: 'center',
                            borderTopWidth: 0.5
                        }}>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('Login') }}>
                                <Text style={{
                                    width: Dimensions.get('window').width - 20, textAlign: 'center',
                                    color: AppColor.white, fontWeight: 'bold', fontSize: 18,
                                    backgroundColor: AppColor.Blue1, paddingHorizontal: 10, paddingVertical: 10
                                }}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <UpdateProfileModal setUpdateProfileModalState={setUpdateProfileModalState}
                        updateProfileModalState={updateProfileModalState} userGuest={userGuest}
                        setNotifyModalState={setNotifyModalState} setNotifyValue={setNotifyValue}
                        setUserGuest={setUserGuest} action={action} />
                    <NotifyModal notifyModalState={notifyModalState}
                        notifyValue={notifyValue} setNotifyModalState={setNotifyModalState} />
                </ScrollView>
            </View> :
                <View>
                    <View style={{ marginTop: 50 }}>
                        {/* <Text>aaaa</Text> */}
                        <TouchableOpacity onPress={async () => {
                            await AsyncStorage.removeItem(LocalStoreEnum.IGUEST);
                            navigation.navigate('Login');
                        }}>
                            <Text style={{ color: AppColor.TextLight }}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View></View>}


        </View>



    )
}

export default Profile;