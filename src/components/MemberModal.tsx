import { useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Dimensions, ScrollView, TextInput } from 'react-native';
import { AppColor } from '../assets/AppColor';

interface IProps {
    valueSoNguoiLon: number;
    setValueSoNguoiLon: (valueSoNguoiLon: number) => void;
    valueSoTreEm: number;
    setValueSoTreEm: (valueSoTreEm: number) => void;
    valueSoPhong: number;
    setValueSoPhong: (valueSoPhong: number) => void;
    valueNguoiLonTreEmPhong: string;
    setValueNguoiLonTreEmPhong: (valueNguoiLonTreEmPhong: string) => void;
    memberModalState: boolean;
    setMemberModalState: (memberModalState: boolean) => void
}
export default function MemberModal(props: IProps) {
    const { valueSoNguoiLon, setValueSoNguoiLon, valueSoTreEm,
        setValueSoTreEm, valueSoPhong, setValueSoPhong, valueNguoiLonTreEmPhong,
        setValueNguoiLonTreEmPhong, memberModalState, setMemberModalState } = props;

    // const [valueSoNguoiLon, setValueSoNguoiLon] = useState<number>(2);
    // const [valueSoTreEm, setValueSoTreEm] = useState<number>(0);
    // const [valueSoPhong, setValueSoPhong] = useState<number>(1);
    // const [valueNguoiLonTreEmPhong, setValueNguoiLonTreEmPhong] = useState<string>(
    //     valueSoNguoiLon + ' Người lớn' + valueSoTreEm + ' Trẻ em' + valueSoPhong + ' Phòng');
    const handleCompliteMember = () => {
        setValueNguoiLonTreEmPhong(valueSoNguoiLon + ' Người lớn, ' + valueSoTreEm + ' Trẻ em, ' + valueSoPhong + ' Phòng');
        setMemberModalState(false);
    }
    const handleAddNguoiLon = () => {

        if (valueSoNguoiLon > 0 && valueSoNguoiLon < 20) {
            setValueSoNguoiLon(valueSoNguoiLon + 1);
        }
    }
    const handleSubstractNguoiLon = () => {

        if (valueSoNguoiLon > 1) {
            setValueSoNguoiLon(valueSoNguoiLon - 1);
        }
    }

    const handleAddTreEm = () => {

        if (valueSoTreEm < valueSoNguoiLon * 3) {
            setValueSoTreEm(valueSoTreEm + 1);
        }
    }
    const handleSubstractTreEm = () => {

        if (valueSoTreEm > 0) { setValueSoTreEm(valueSoTreEm - 1); }

    }

    const handleAddPhong = () => {

        if (valueSoPhong < valueSoNguoiLon && valueSoPhong < 8) { setValueSoPhong(valueSoPhong + 1); }
    }
    const handleSubstractPhong = () => {

        if (valueSoPhong > 1) {
            setValueSoPhong(valueSoPhong - 1);
        }
    }
    const toggleModal = () => {
        setMemberModalState(!memberModalState);
    };
    return (
        <View>
            <TouchableOpacity >
                <Text>Chọn địa điểm đặt phòng</Text>
            </TouchableOpacity>
            <Modal visible={memberModalState} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                                fontSize: 18
                            }}>Chọn số lượng phòng</Text>
                            <TouchableOpacity onPress={toggleModal}
                                style={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-end',
                                }}>
                                <Text style={{
                                    fontWeight: 'semibold',
                                    color: AppColor.Cyan,
                                    textAlign: 'right'
                                }}>Đóng</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView>
                            <View style={styles.modalContent}>
                                <View style={styles.modalContent}>
                                    <View style={styles.row}>
                                        <Text style={{ fontSize: 15, width: 150 }}>Người lớn</Text>
                                        <TouchableOpacity
                                            style={styles.button1}
                                            onPress={() => { handleSubstractNguoiLon() }} >
                                            <Text style={{
                                                fontSize: 15, fontWeight: 'bold',
                                                color: 'white'
                                            }}>-</Text>
                                        </TouchableOpacity>
                                        <TextInput
                                            style={{ width: 50, textAlign: 'center', fontSize: 15, fontWeight: 'bold', }}
                                            readOnly
                                            value={valueSoNguoiLon.toString()}
                                        />
                                        <TouchableOpacity
                                            style={styles.button1}
                                            onPress={() => handleAddNguoiLon()}>
                                            <Text style={{
                                                fontSize: 15, fontWeight: 'bold',
                                                color: 'white'
                                            }}>+</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.row}>
                                        <Text style={{ fontSize: 15, width: 150 }}>Trẻ em</Text>
                                        <TouchableOpacity
                                            style={styles.button1}
                                            onPress={() => { handleSubstractTreEm() }} >
                                            <Text style={{
                                                fontSize: 15, fontWeight: 'bold',
                                                color: 'white'
                                            }}>-</Text>
                                        </TouchableOpacity>
                                        <TextInput
                                            style={{ width: 50, textAlign: 'center', fontSize: 15, fontWeight: 'bold', }}
                                            readOnly
                                            value={valueSoTreEm.toString()}
                                        />
                                        <TouchableOpacity
                                            style={styles.button1}
                                            onPress={() => handleAddTreEm()}>
                                            <Text style={{
                                                fontSize: 15, fontWeight: 'bold',
                                                color: 'white'
                                            }}>+</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.row}>
                                        <Text style={{ fontSize: 15, width: 150 }}>Số phòng</Text>
                                        <TouchableOpacity
                                            style={styles.button1}
                                            onPress={() => { handleSubstractPhong() }} >
                                            <Text style={{
                                                fontSize: 15, fontWeight: 'bold',
                                                color: 'white'
                                            }}>-</Text>
                                        </TouchableOpacity>
                                        <TextInput
                                            style={{ width: 50, textAlign: 'center', fontSize: 15, fontWeight: 'bold', }}
                                            readOnly
                                            value={valueSoPhong.toString()}
                                        />
                                        <TouchableOpacity
                                            style={styles.button1}
                                            onPress={() => handleAddPhong()}>
                                            <Text style={{
                                                fontSize: 15, fontWeight: 'bold',
                                                color: 'white'
                                            }}>+</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{
                                        width: '90%', backgroundColor: AppColor.Cyan, marginTop: 5,
                                        height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <TouchableOpacity onPress={() => handleCompliteMember()}>
                                            <Text style={{ fontWeight: 'bold', color: 'white' }}>Xong</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>




                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        //height: Dimensions.get('window').height - 100,
        width: Dimensions.get('window').width - 60,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    closeButton: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        height: 50,
    },
    container: {
        width: Dimensions.get('window').width - 60,
        borderBottomWidth: 1,
        borderBottomColor: AppColor.Gray01,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    leftColumn: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rightColumn: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
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
        paddingHorizontal: 16,
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
    row: {
        width: '100%',
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 2,
        marginBottom: 2
    },
    button1: {
        backgroundColor: AppColor.Cyan, width: 50, height: 50,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 5
    }

});
