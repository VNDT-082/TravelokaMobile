import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { AppColor } from "../assets/AppColor";
import { useState } from "react";
import { Clock, Warning2 } from "iconsax-react-native";
import { Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import URL_Enum from "../axios/URL_Enum";

interface IPops {
    descrionAndPolicyModalState: boolean,
    setDescrionAndPolicyModalState: (descrionAndPolicyModal: boolean) => void;
    typeOpenState: 'MoTa' | 'ChinhSach' | 'TienIch';
    setTypeOpenState: (typeOpenState: 'MoTa' | 'ChinhSach' | 'TienIch') => void;
    description: string;
    listPolicy?: IPolicy[];
    listConvenient?: IConvenient[];
    timeCheckin?: string;
    timeCheckout?: string;
}
export default function DescrionAndPolicyModal(props: IPops) {
    const { descrionAndPolicyModalState, setDescrionAndPolicyModalState, typeOpenState, setTypeOpenState
        , description, listPolicy, timeCheckin, timeCheckout, listConvenient } = props;
    const toggleModal = () => {
        setDescrionAndPolicyModalState(false);
    }
    const handleChangTypeLocation = (title: 'MoTa' | 'ChinhSach' | 'TienIch') => {
        setTypeOpenState(title);
    }
    return (
        <View>
            {/* <TouchableOpacity >
                <Text>Chọn địa điểm đặt phòng</Text>
            </TouchableOpacity> */}
            <Modal visible={descrionAndPolicyModalState} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{
                            flex: 5, flexDirection: 'row', justifyContent: 'space-around',
                            alignItems: 'flex-start', height: 50, maxHeight: 50,
                        }}>
                            <Text style={{
                                flex: 4,
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                                fontSize: 18,
                            }}>Thông tin khách sạn</Text>
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
                        <View style={{
                            flex: 2, flexDirection: 'row', backgroundColor: AppColor.Cyan, height: 50,
                            marginHorizontal: -20, maxHeight: 50, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{
                                flex: 1, textAlign: 'center', height: 50, color: AppColor.white, paddingTop: 15,
                                borderBottomColor: typeOpenState == 'MoTa' ? AppColor.Blue1 : 'transparent',
                                borderBottomWidth: typeOpenState == 'MoTa' ? 5 : 0,
                                fontWeight: typeOpenState == 'MoTa' ? 'bold' : 'normal'
                            }} onPress={() => handleChangTypeLocation('MoTa')}>Mô tả</Text>
                            <Text style={{
                                flex: 1, textAlign: 'center', height: 50, color: AppColor.white, paddingTop: 15,
                                borderBottomColor: typeOpenState == 'ChinhSach' ? AppColor.Blue1 : 'transparent',
                                borderBottomWidth: typeOpenState == 'ChinhSach' ? 5 : 0,
                                fontWeight: typeOpenState == 'ChinhSach' ? 'bold' : 'normal'
                            }} onPress={() => handleChangTypeLocation('ChinhSach')}>Chính sách</Text>
                            <Text style={{
                                flex: 1, textAlign: 'center', height: 50, color: AppColor.white, paddingTop: 15,
                                borderBottomColor: typeOpenState == 'TienIch' ? AppColor.Blue1 : 'transparent',
                                borderBottomWidth: typeOpenState == 'TienIch' ? 5 : 0,
                                fontWeight: typeOpenState == 'TienIch' ? 'bold' : 'normal'
                            }} onPress={() => handleChangTypeLocation('TienIch')}>Tiện ích</Text>
                        </View>
                        <ScrollView style={{ maxHeight: Dimensions.get('window').height - 300 }}>

                            <View style={{ display: typeOpenState == 'MoTa' ? 'flex' : 'none' }}>
                                <Text>{description}</Text>
                            </View>
                            <View style={{ display: typeOpenState == 'ChinhSach' ? 'flex' : 'none' }}>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                    padding: 10, backgroundColor: AppColor.Yellow01, margin: 5, borderRadius: 10
                                }}>
                                    <Warning2 size="32" color="#FF8A65" variant="Broken" />
                                    <Text style={{ width: '95%' }}>
                                        Vui lòng đảm bảo rằng bạn đã nắm rõ thời gian nhận phòng và trả phòng như sau.</Text>
                                </View>
                                {listPolicy != undefined ? <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Clock size="24" color={AppColor.Gray31} variant="Broken" />
                                        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>Giờ nhận phòng/ trả phòng</Text>
                                    </View>
                                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                        <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Giờ nhận phòng</Text>
                                        <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>{timeCheckin}</Text>
                                    </View>
                                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                        <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Giờ trả phòng</Text>
                                        <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>{timeCheckout}</Text>
                                    </View>

                                    {listPolicy.map((item, index) => (
                                        <View key={index} style={{ marginVertical: 5 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image style={{
                                                    width: 18, height: 18, padding: 5, borderRadius: 10,
                                                }}
                                                    source={{ uri: URL_Enum.BaseURL_Image_Icon + item.ImageIcon }}
                                                    resizeMode="cover" />
                                                <Text style={{ fontSize: 18, fontWeight: "semibold", marginLeft: 10 }}>{item.Name}</Text>
                                            </View>
                                            <Text style={{ paddingLeft: 20, paddingRight: 5 }}>{item.Description}</Text>
                                        </View>
                                    ))}
                                </View>
                                    : <Text>Chính sách của khách sạn không có sẵn</Text>}

                            </View>

                            <View style={{ display: typeOpenState == 'TienIch' ? 'flex' : 'none' }}>
                                {/* Tất cả tiện ích*/}
                                {listConvenient != undefined ?
                                    <View style={{ padding: 10, }}>
                                        <Text style={{ fontSize: 18, color: AppColor.Gray31 }}>Tất cả tiện ích</Text>
                                        {listConvenient.map((citem, cindex) => (
                                            <View key={cindex}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ width: 18, height: 18, marginVertical: 10, }} >
                                                        <Image style={{ width: '100%', height: 18, }}
                                                            source={{ uri: URL_Enum.BaseURL_Image_Icon + citem.ImageIcon }} />
                                                    </View>
                                                    <Text style={{ fontSize: 16 }}>{citem.Title}</Text>
                                                </View>
                                                {citem.Description.map((ditem, dindex) => (
                                                    <View key={dindex} style={{ alignItems: 'center', gap: 2, flexDirection: 'row' }}>
                                                        <View style={{ width: 7, height: 7, borderRadius: 10, backgroundColor: AppColor.Gray31 }}></View>
                                                        <Text style={{ fontSize: 15 }}>{ditem}</Text></View>


                                                ))}
                                            </View>
                                        ))}
                                    </View>
                                    : null}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
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
        height: Dimensions.get('window').height - 150,
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
