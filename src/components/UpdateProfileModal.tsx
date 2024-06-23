import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Modal, View } from "react-native";
import { AppColor } from "../assets/AppColor";
import { ActivityIndicator } from "react-native-paper";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import { TickSquare } from "iconsax-react-native";
import { updateUserInfo } from "../service/auth.service";
import { getUserByEmail } from "../service/guest.service";
import getLocalStorageItem from "../service/getLocalStorageItem";
import LocalStoreEnum from "../axios/LocalStoreEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setLocalStorageItem from "../service/setLocalStorageItem";

interface IProps {
    updateProfileModalState: boolean;
    setUpdateProfileModalState: (updateProfileModalState: boolean) => void;
    userGuest: IGuest;
    setUserGuest: (userGuest: IGuest) => void;
    setNotifyModalState: (notifyModalState: boolean) => void;
    setNotifyValue: (notifyValue: string) => void;
    action: 'changeInfor' | 'changePass' | 'changeContact';

}
export default function UpdateProfileModal(props: IProps) {
    const { updateProfileModalState, setUpdateProfileModalState, userGuest
        , setNotifyModalState, setNotifyValue, setUserGuest, action
    } = props;
    const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
    const toggleModal = () => { setUpdateProfileModalState(false) }
    const [Name, setName] = useState<string>(userGuest.Name);
    const [sex, setSex] = useState<number>(userGuest.Sex);
    const [dateOfBirth, setDateOfBirth] = useState<string>(userGuest.DateOfBirth);
    const [cCCD, setCCD] = useState<string>(userGuest.CCCD);
    const [dateTimePickerState, setDateTimePickerState] = useState<boolean>(false);
    const handleChangeDateOfBirth = (newDate: Date) => {
        setDateOfBirth(newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear())
    }

    const [passOld, setPassOld] = useState<string>('');
    const [passNew, setPassNew] = useState<string>('');
    const [rePassNew, setRePassNew] = useState<string>('');

    const dataForm = {
        idAccount: userGuest?.UserAccountId,
        name: userGuest.Name,
        email: userGuest?.Email,
        phone: userGuest?.Telephone,
        sex: sex,
        cccd: cCCD,
        dob: dateOfBirth,
    };
    const handleUpdateInfo = async () => {
        const res = await updateUserInfo(dataForm).then(async response => {
            if (response == true) {
                const responseGuest = await getUserByEmail(userGuest.Email).then(async response => {
                    if (response != null && response != undefined) {
                        console.log('responseGuest', response.result);
                        setUserGuest(response.result);
                        const IGusetStorage = getLocalStorageItem(LocalStoreEnum.IGUEST);
                        // await AsyncStorage.removeItem(LocalStoreEnum.IGUEST);
                        if (IGusetStorage != undefined) {
                            await AsyncStorage.removeItem(LocalStoreEnum.IGUEST);
                        }

                        setLocalStorageItem(LocalStoreEnum.IGUEST, JSON.stringify(response));
                        setNotifyValue('Cập nhật thông tin thành công');
                    }

                });

            }
            else {
                setNotifyValue('Cập nhật thông tin không thành công');
            }
            setNotifyModalState(true);
            setUpdateProfileModalState(false);
        }).catch(err => {
            setNotifyValue('Lỗi cập nhật thông tin tài khoản');
            setNotifyModalState(true);
            setUpdateProfileModalState(false);
        });
        console.log('handleUpdateInfo', res);
    }



    return (
        <View>
            <Modal visible={updateProfileModalState} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{
                            flex: 5, flexDirection: 'row', justifyContent: 'space-around',
                            alignItems: 'flex-start', height: 50, maxHeight: 50
                        }}>
                            <Text style={{
                                flex: 4,
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                                fontSize: 18,
                            }}>{action == 'changeInfor' ? 'Cập nhật thông tin cá nhân'
                                : action == 'changePass' ? 'Cập nhật mật khẩu' : 'Cập nhật thông tin liên hệ'
                                }</Text>
                            <TouchableOpacity onPress={toggleModal}
                                style={{
                                    flex: 1,
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-end',
                                    backgroundColor: AppColor.white
                                }}>
                                <Text style={{
                                    fontWeight: 'semibold',
                                    color: AppColor.Cyan,
                                    textAlign: 'right',
                                    backgroundColor: AppColor.white
                                }}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ maxHeight: Dimensions.get('window').height - 350 }}>
                            {isLoadingModal ? <View style={{
                                width: Dimensions.get('window').width - 70,
                                height: '100%', flex: 1, justifyContent: 'center',
                                alignItems: 'center', display: 'flex'
                            }}><ActivityIndicator /></View> :
                                action == 'changeInfor' ?
                                    //doi thong tin tai khoan
                                    <View>
                                        <View style={{
                                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.Gray31,
                                            marginVertical: 5, justifyContent: 'center',
                                            borderTopWidth: 0.5,
                                            width: '100%', alignItems: 'center'
                                        }}>
                                            <Text style={{ width: '20%', fontSize: 15 }}>Họ tên:</Text>
                                            <TextInput style={{
                                                paddingLeft: 10,
                                                fontSize: 15, borderColor: AppColor.Gray31,
                                                borderWidth: 0.5, borderRadius: 5, width: '80%'
                                            }}
                                                value={Name}
                                                onChangeText={(value) => { setName(value) }} />
                                        </View>

                                        <View style={{
                                            flexDirection: 'row', padding: 10,
                                            marginVertical: 5, justifyContent: 'center',

                                            width: '100%', alignItems: 'center'
                                        }}>

                                            <Text style={{ width: '20%', fontSize: 15 }}>Ngày sinh:</Text>
                                            <Text style={{
                                                fontSize: 15, borderColor: AppColor.Gray31, paddingLeft: 10,
                                                borderWidth: 0.5, borderRadius: 5, width: '80%', paddingVertical: 15
                                            }}
                                                onPress={() => { setDateTimePickerState(true) }}>{dateOfBirth}
                                            </Text>
                                            <Modal visible={dateTimePickerState} style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                                                <View style={{
                                                    width: '100%', zIndex: 10, justifyContent: 'center'
                                                    , alignItems: 'center', position: 'absolute',
                                                    display: dateTimePickerState ? 'flex' : 'none',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', height: Dimensions.get('window').height
                                                }}>
                                                    <View style={{
                                                        width: '90%', backgroundColor: AppColor.white,
                                                        borderRadius: 10, padding: 10
                                                    }}>
                                                        <DatePicker
                                                            date={new Date(userGuest.DateOfBirth)}
                                                            onDateChange={handleChangeDateOfBirth}
                                                            mode="date"
                                                            minimumDate={new Date('1900-01-01')}
                                                            maximumDate={new Date('2025-12-31')}
                                                        />
                                                        <TouchableOpacity
                                                            onPress={() => setDateTimePickerState(false)}>
                                                            <Text style={{
                                                                backgroundColor: AppColor.Blue1,
                                                                paddingVertical: 10, color: AppColor.white,
                                                                textAlign: 'center', borderRadius: 5
                                                            }}>Ok</Text>
                                                        </TouchableOpacity>
                                                    </View>

                                                </View>
                                            </Modal>

                                        </View>
                                        {/* gioitinh */}
                                        <View style={{
                                            flexDirection: 'row', padding: 10,
                                            marginVertical: 5, justifyContent: 'center',

                                            width: '100%', alignItems: 'center'
                                        }}>
                                            <Text style={{ width: '20%', fontSize: 15 }}>Giới tính:</Text>
                                            <View style={{
                                                flexDirection: 'row', width: '40%',
                                                justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <TickSquare onPress={() => { setSex(1) }} size="24"
                                                    color={AppColor.Gray31} variant={sex == 1 ? 'Bold' : 'Linear'} />
                                                <Text>Nam</Text>
                                            </View>
                                            <View style={{
                                                flexDirection: 'row', width: '40%',
                                                justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <TickSquare onPress={() => setSex(0)} size="24"
                                                    color={AppColor.Gray31} variant={sex == 0 ? 'Bold' : 'Linear'} />
                                                <Text>Nữ    </Text>
                                            </View>
                                        </View>

                                        {/* cccd */}
                                        <View style={{
                                            flexDirection: 'row', padding: 10, borderTopColor: AppColor.Gray31,
                                            marginVertical: 5, justifyContent: 'center',
                                            borderTopWidth: 0.5,
                                            width: '100%', alignItems: 'center'
                                        }}>
                                            <Text style={{ width: '20%', fontSize: 15 }}>CCCD:</Text>
                                            <TextInput style={{
                                                paddingLeft: 10,
                                                fontSize: 15, borderColor: AppColor.Gray31,
                                                borderWidth: 0.5, borderRadius: 5, width: '80%'
                                            }}
                                                value={cCCD}
                                                onChangeText={(value) => { setCCD(value) }} />
                                        </View>
                                        <TouchableOpacity onPress={() => { handleUpdateInfo() }}><Text style={{
                                            color: AppColor.white,
                                            backgroundColor: AppColor.Blue1, paddingVertical: 10,
                                            borderRadius: 5, textAlign: 'center'
                                        }}>Cập nhật thông tin</Text></TouchableOpacity>
                                    </View> :
                                    action == 'changePass' ?
                                        <View>
                                            <View style={{
                                                padding: 10, borderTopColor: AppColor.Gray31,
                                                marginVertical: 5, justifyContent: 'center',
                                                borderTopWidth: 0.5,
                                                width: Dimensions.get('window').width - 90, alignItems: 'center'
                                            }}>
                                                <Text style={{ fontSize: 15, width: '100%' }}>Nhập mật khẩu cũ:</Text>
                                                <TextInput style={{
                                                    paddingLeft: 10, width: '100%',
                                                    fontSize: 15, borderColor: AppColor.Gray31,
                                                    borderWidth: 0.5, borderRadius: 5,
                                                }}
                                                    secureTextEntry={true}
                                                    value={passOld}
                                                    onChangeText={(value) => { setPassOld(value) }} />

                                                <Text style={{ fontSize: 15, width: '100%' }}>Nhập mật khẩu mới:</Text>
                                                <TextInput style={{
                                                    paddingLeft: 10, width: '100%',
                                                    fontSize: 15, borderColor: AppColor.Gray31,
                                                    borderWidth: 0.5, borderRadius: 5,
                                                }}
                                                    secureTextEntry={true}
                                                    value={passNew}
                                                    onChangeText={(value) => { setPassNew(value) }} />

                                                <Text style={{ fontSize: 15, width: '100%' }}>Nhập lại mật khẩu mới:</Text>
                                                <TextInput style={{
                                                    paddingLeft: 10, width: '100%',
                                                    fontSize: 15, borderColor: AppColor.Gray31,
                                                    borderWidth: 0.5, borderRadius: 5,
                                                }}
                                                    secureTextEntry={true}
                                                    value={rePassNew}
                                                    onChangeText={(value) => { setRePassNew(value) }} />

                                                <TouchableOpacity onPress={() => { handleUpdateInfo() }}
                                                    style={{ width: '100%', marginTop: 10 }}><Text style={{
                                                        color: AppColor.white, width: '100%',
                                                        backgroundColor: AppColor.Blue1, paddingVertical: 10,
                                                        borderRadius: 5, textAlign: 'center'
                                                    }}>Cập nhật mật khẩu</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                        : <View>

                                        </View>
                            }

                        </ScrollView>
                    </View>
                </View >
            </Modal >
        </View >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: Dimensions.get('window').width,
    },
    modalContent: {
        height: Dimensions.get('window').height - 350,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    closeButton: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        height: 50,
        backgroundColor: 'white'
    },
    container: {
        flex: 5,
        width: Dimensions.get('window').width,
        borderBottomWidth: 1,
        borderBottomColor: AppColor.Gray01,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: AppColor.Gray01,
    },
    leftColumn: {
        flex: 3,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rightColumn: {
        flex: 2,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    displayName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    country: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#999',
    },
    regionButton: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#00BFFF',
    },
    regionButtonText: {
        color: '#00BFFF',
        fontSize: 14,
    },
    hotelCount: {
        fontSize: 14,
        color: '#666',
    },
});
