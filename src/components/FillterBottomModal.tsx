import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { AppColor } from "../assets/AppColor";
import { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import Icon from 'react-native-vector-icons/FontAwesome';
import { CloseSquare } from "iconsax-react-native";
interface ConvenienceIcon {
    name: string;
    iconName: string;
    isCheck: boolean;
}
interface IPops {
    fillterBottomModalState: boolean;
    setFillterBottomModalState: (fillterBottomModalState: boolean) => void;
}
const findMax = (arr: number[]) => {
    let max = 1;
    arr.forEach(item => {
        if (max < item) {
            max = item;
        }
    });
    return max;
}
export default function FillterBottomModal(props: IPops) {
    const { fillterBottomModalState, setFillterBottomModalState } = props;
    const arrConvenient: ConvenienceIcon[] = [
        { isCheck: false, name: 'WiFi', iconName: 'WiFi' },
        { isCheck: false, name: 'Hồ bơi', iconName: 'Hồ bơi' },
        { isCheck: false, name: 'Chỗ đậu xe', iconName: 'Chỗ đậu xe' },
        { isCheck: false, name: 'Nhà hàng', iconName: 'Nhà hàng' },
        { isCheck: false, name: 'Lễ tân 24h', iconName: 'Lễ tân 24h' },
        { isCheck: false, name: 'Thang máy', iconName: 'Thang máy' },
        { isCheck: false, name: 'Lối dành cho xe lăn', iconName: 'Lối dành cho xe lăn' },
        { isCheck: false, name: 'Trung tâm thể dục', iconName: 'Trung tâm thể dục' },
        { isCheck: false, name: 'Phòng họp', iconName: 'Phòng họp' },
        { isCheck: false, name: 'Đưa đón sân bay', iconName: 'Đưa đón sân bay' }];

    const iconPaths: { [key: string]: any } = {
        'WiFi': require('../assets/icon/KetNoiMang.webp'),
        'Hồ bơi': require('../assets/icon/TheThaoVaGiaiTri.webp'),
        'Chỗ đậu xe': require('../assets/icon/VanChuyen.webp'),
        'Nhà hàng': require('../assets/icon/DichVuKhachSan.webp'),
        'Lễ tân 24h': require('../assets/icon/LienHe.webp'),
        'Thang máy': require('../assets/icon/TienNghiPhong.webp'),
        'Lối dành cho xe lăn': require('../assets/icon/HoTroKhuyetTat.webp'),
        'Trung tâm thể dục': require('../assets/icon/TienNghiCongCong.webp'),
        'Phòng họp': require('../assets/icon/TienNghiVanPhong.webp'),
        'Đưa đón sân bay': require('../assets/icon/DuaDon.webp'),
    };
    const [arrConvenientMater, setArrConvenientMater] = useState<ConvenienceIcon[]>(arrConvenient);
    const [arrConvenientSelected, setArrConvenientSelected] = useState<ConvenienceIcon[]>([]);
    const [arrStarSelected, setArrStarSelected] = useState<number[]>([1]);
    const [star1Checked, setStar1Checked] = useState<boolean>(false);
    const [star2Checked, setStar2Checked] = useState<boolean>(false);
    const [star3Checked, setStar3Checked] = useState<boolean>(false);
    const [star4Checked, setStar4Checked] = useState<boolean>(false);
    const [star5Checked, setStar5Checked] = useState<boolean>(false);

    const [typeHotelSelected, setTypeHotelSelected] = useState<string>('Tất cả');
    const [typeHotel, setTypeHotel] = useState<boolean>(false);
    const [typeOrder, setTypeOrder] = useState<boolean>(false);
    const [typeAll, setTypeAll] = useState<boolean>(true);

    const [arrRateStarHotelSelected, setArrRateStarHotelSelected] = useState<number[]>([]);
    const [priceDistance, setpriceDistance] = useState<number>(50000000);
    const [maxPriceSearch, setMaxPriceSearch] = useState<number>(0);
    const [showFillterStar, setShowFillterStar] = useState<boolean>(true);
    const [showFillterConvenient, setShowFillterConvenient] = useState<boolean>(true);
    const [showFillterHotelCate, setShowFillterHotelCate] = useState<boolean>(true);
    const [listHotelSearch, setListHotelSearch] = useState<IHotel[]>([]);
    const handleClickConvenient = (item: ConvenienceIcon, index: number) => {
        arrConvenientMater[index].isCheck = !arrConvenientMater[index].isCheck;
        if (arrConvenientMater[index].isCheck == true) {
            setArrConvenientSelected([...arrConvenientSelected, item]);
        }
        else {
            setArrConvenientSelected(arrConvenientSelected.filter(fitem => {
                return fitem.name != item.name;
            }));
        }
    };
    const handleSetType = (type: 'Khách sạn' | 'Tất cả' | 'Khác') => {
        console.log('type', type);
        if (type == 'Tất cả') {
            setTypeAll(true);
            setTypeHotel(false);
            setTypeOrder(false);
        }
        else if (type == 'Khách sạn') {
            setTypeAll(false);
            setTypeHotel(true);
            setTypeOrder(false);
        }
        else {
            setTypeAll(false);
            setTypeHotel(false);
            setTypeOrder(true);
        }
        setTypeHotelSelected(type);
        console.log(type);
    }
    const handleReset = () => {
        arrConvenientMater.map(item => {
            item.isCheck = false;
        })
        setArrConvenientSelected([]);
        setArrRateStarHotelSelected([]);
        setpriceDistance(0);
        setTypeAll(true);
        setTypeHotel(false);
        setTypeOrder(false);
        setStar1Checked(false);
        setStar2Checked(false);
        setStar3Checked(false);
        setStar4Checked(false);
        setStar5Checked(false);
        setArrStarSelected([1]);
    }

    useEffect(() => {
        setArrConvenientMater(arrConvenientMater);
    }, [arrConvenientMater])
    return (
        <View>
            <Modal visible={fillterBottomModalState} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                flex: 4,
                                fontWeight: 'bold', color: AppColor.Cyan, marginTop: 10,
                                fontSize: 18
                            }}>Bộ lọc</Text>
                            <CloseSquare size="24" color={AppColor.Cyan} onPress={() => { setFillterBottomModalState(false) }} />
                        </View>

                        <ScrollView style={{ height: 500 }}>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.button1}>
                                        <Text style={{ color: AppColor.white }}>{typeHotelSelected}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.button1, { flexDirection: 'row', gap: 5 }]}>
                                        <Text style={{ color: AppColor.white }}>
                                            {star5Checked ? 5 : star4Checked ? 4 : star3Checked ? 3 : star2Checked ? 2 : star1Checked ? 1 : 1}</Text>
                                        <Icon name='star' size={24} color="#FFCC00" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button1}>
                                        <Text style={{ color: AppColor.white }}>+{arrConvenientSelected.length} tiện nghi</Text>
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <Text style={{
                                        fontWeight: 'bold', color: AppColor.Cyan, marginTop: 10,
                                        fontSize: 18
                                    }}>Khoảng giá phòng mỗi đêm</Text>
                                    <View style={{
                                        flex: 5, flexDirection: 'row', justifyContent: 'center',
                                        alignItems: 'center', marginTop: 5
                                    }}>
                                        <Text style={{
                                            flex: 2, width: '100%', fontSize: 15, fontWeight: 'semibold',
                                            borderWidth: 1, borderColor: AppColor.Gray31, textAlign: 'center'
                                            , borderRadius: 10, paddingHorizontal: 20, paddingVertical: 5
                                        }}>VNĐ 0</Text>
                                        <View style={{
                                            flex: 1, width: '100%',
                                            height: 1, backgroundColor: AppColor.Gray31
                                        }}></View>
                                        <Text style={{
                                            flex: 2, width: '100%', fontSize: 15, fontWeight: 'semibold',
                                            borderWidth: 1, borderColor: AppColor.Gray31, textAlign: 'center'
                                            , borderRadius: 10, paddingHorizontal: 20, paddingVertical: 5
                                        }}>VNĐ {priceDistance.toLocaleString()}</Text>
                                    </View>
                                    <View>
                                        <Slider
                                            style={{ width: '100%', height: 40 }}
                                            minimumValue={0}
                                            maximumValue={100000000}
                                            minimumTrackTintColor={AppColor.Cyan}
                                            maximumTrackTintColor="#000000"
                                            thumbImage={require('../assets/icon/birth.png')}
                                            onValueChange={(value) => { setpriceDistance(value) }}
                                        //value={priceDistance}
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text style={{
                                        fontWeight: 'bold', color: AppColor.Cyan, marginTop: 10,
                                        fontSize: 18
                                    }}>Hạng sao</Text>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'flex-start',
                                        alignItems: 'center', marginTop: 5
                                    }}>
                                        {star1Checked ? <Text style={{
                                            fontSize: 15, fontWeight: 'semibold', textAlign: 'center', paddingHorizontal: 0, paddingVertical: 5
                                        }}>1, </Text> : null}
                                        {star2Checked ? <Text style={{
                                            fontSize: 15, fontWeight: 'semibold', textAlign: 'center', paddingHorizontal: 0, paddingVertical: 5
                                        }}>2, </Text> : null}
                                        {star3Checked ? <Text style={{
                                            fontSize: 15, fontWeight: 'semibold', textAlign: 'center', paddingHorizontal: 0, paddingVertical: 5
                                        }}>3, </Text> : null}
                                        {star4Checked ? <Text style={{
                                            fontSize: 15, fontWeight: 'semibold', textAlign: 'center', paddingHorizontal: 0, paddingVertical: 5
                                        }}>4, </Text> : null}
                                        {star5Checked ? <Text style={{
                                            fontSize: 15, fontWeight: 'semibold', textAlign: 'center', paddingHorizontal: 0, paddingVertical: 5
                                        }}>5 </Text> : null}



                                    </View>
                                    <View style={{ flex: 5, flexDirection: 'row' }}>
                                        {/* 1sao */}
                                        <TouchableOpacity style={{
                                            flex: 1,
                                            flexDirection: 'row', borderWidth: 0.5, borderColor: AppColor.Gray31,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                            onPress={() => {
                                                setStar1Checked(!star1Checked);
                                                if (star1Checked && arrStarSelected.find(fitem => { return fitem == 1 }) != undefined) {
                                                    setArrStarSelected([...arrStarSelected, 1]);
                                                }
                                                else {
                                                    setArrStarSelected(arrStarSelected.filter(fitem => {
                                                        return fitem != 1
                                                    }))
                                                }
                                            }}>
                                            <Text style={{ fontSize: 24, color: star1Checked ? "#FFCC00" : AppColor.Gray31 }}>1</Text>
                                            <Icon name='star' size={24} color={star1Checked ? "#FFCC00" : AppColor.Gray31} />
                                        </TouchableOpacity>
                                        {/* 2sao */}
                                        <TouchableOpacity style={{
                                            flex: 1,
                                            flexDirection: 'row', borderWidth: 0.5, borderColor: AppColor.Gray31,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                            onPress={() => {
                                                setStar2Checked(!star2Checked);
                                                if (star2Checked && arrStarSelected.find(fitem => { return fitem == 2 }) != undefined) {
                                                    setArrStarSelected([...arrStarSelected, 2]);
                                                }
                                                else {
                                                    setArrStarSelected(arrStarSelected.filter(fitem => {
                                                        return fitem != 2
                                                    }))
                                                }
                                            }}>
                                            <Text style={{ fontSize: 24, color: star2Checked ? "#FFCC00" : AppColor.Gray31 }}>2</Text>
                                            <Icon name='star' size={24} color={star2Checked ? "#FFCC00" : AppColor.Gray31} />
                                        </TouchableOpacity>
                                        {/* 3sao */}
                                        <TouchableOpacity style={{
                                            flex: 1,
                                            flexDirection: 'row', borderWidth: 0.5, borderColor: AppColor.Gray31,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                            onPress={() => {
                                                setStar3Checked(!star3Checked);
                                                if (star3Checked && arrStarSelected.find(fitem => { return fitem == 3 }) != undefined) {
                                                    setArrStarSelected([...arrStarSelected, 3]);
                                                }
                                                else {
                                                    setArrStarSelected(arrStarSelected.filter(fitem => {
                                                        return fitem != 3
                                                    }))
                                                }
                                            }}>
                                            <Text style={{ fontSize: 24, color: star3Checked ? "#FFCC00" : AppColor.Gray31 }}>3</Text>
                                            <Icon name='star' size={24} color={star3Checked ? "#FFCC00" : AppColor.Gray31} />
                                        </TouchableOpacity>
                                        {/* 4sao */}
                                        <TouchableOpacity style={{
                                            flex: 1,
                                            flexDirection: 'row', borderWidth: 0.5, borderColor: AppColor.Gray31,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                            onPress={() => {
                                                setStar4Checked(!star4Checked);
                                                if (star4Checked && arrStarSelected.find(fitem => { return fitem == 4 }) != undefined) {
                                                    setArrStarSelected([...arrStarSelected, 4]);
                                                }
                                                else {
                                                    setArrStarSelected(arrStarSelected.filter(fitem => {
                                                        return fitem != 4
                                                    }))
                                                }
                                            }}>
                                            <Text style={{ fontSize: 24, color: star4Checked ? "#FFCC00" : AppColor.Gray31 }}>4</Text>
                                            <Icon name='star' size={24} color={star4Checked ? "#FFCC00" : AppColor.Gray31} />
                                        </TouchableOpacity>
                                        {/* 5sao */}
                                        <TouchableOpacity style={{
                                            flex: 1, height: 50,
                                            flexDirection: 'row', borderWidth: 0.5, borderColor: AppColor.Gray31,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                            onPress={() => {
                                                setStar5Checked(!star5Checked);
                                                if (star5Checked && arrStarSelected.find(fitem => { return fitem == 5 }) != undefined) {
                                                    setArrStarSelected([...arrStarSelected, 5]);
                                                }
                                                else {
                                                    setArrStarSelected(arrStarSelected.filter(fitem => {
                                                        return fitem != 5
                                                    }))
                                                }
                                            }}>
                                            <Text style={{ fontSize: 24, color: star5Checked ? "#FFCC00" : AppColor.Gray31 }}>5</Text>
                                            <Icon name='star' size={24} color={star5Checked ? "#FFCC00" : AppColor.Gray31} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <Text style={{
                                    fontWeight: 'bold', color: AppColor.Cyan, marginTop: 10,
                                    fontSize: 18
                                }}>Tiện nghi</Text>
                                <View style={{
                                    flexDirection: 'row', gap: 10
                                }}>
                                    <ScrollView horizontal>
                                        {arrConvenientSelected.map(item => (
                                            <Text
                                                style={{
                                                    color: AppColor.Gray31, marginTop: 5,
                                                    fontSize: 15, borderColor: AppColor.Cyan, borderWidth: 1,
                                                    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
                                                    marginHorizontal: 5
                                                }}>{item.name}</Text>))}
                                    </ScrollView>
                                </View>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'center',
                                    alignContent: 'center'
                                    , gap: 10,
                                    paddingTop: 10
                                }}>
                                    {arrConvenientMater.slice(0, 4).map((item, index) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleClickConvenient(item, index);
                                            }}>
                                            <View style={{
                                                backgroundColor: item.isCheck ? AppColor.CyanLight : AppColor.white,
                                                borderBlockColor: AppColor.Cyan,
                                                width: 90, justifyContent: 'center'
                                                , alignItems: 'center',
                                                borderRadius: 10, borderWidth: 1, height: 90
                                            }}>
                                                <Image
                                                    resizeMode="stretch"
                                                    source={iconPaths[item.iconName]}
                                                    style={{ width: 40, height: 40 }}
                                                />
                                                <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'center',
                                    alignContent: 'center'
                                    , gap: 10,
                                    padding: 10
                                }}>
                                    {arrConvenientMater.slice(4, 8).map((item, index) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleClickConvenient(item, 4 + index);
                                            }}>
                                            <View style={{
                                                width: 90, justifyContent: 'center'
                                                , alignItems: 'center', borderBlockColor: AppColor.Cyan,
                                                backgroundColor: item.isCheck ? AppColor.CyanLight : AppColor.white,
                                                borderRadius: 10, borderWidth: 1, height: 90
                                            }}>
                                                <Image
                                                    resizeMode="stretch"
                                                    source={iconPaths[item.iconName]}
                                                    style={{ width: 40, height: 40 }}
                                                />
                                                <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'flex-start',
                                    alignContent: 'center'
                                    , gap: 10,
                                    padding: 0
                                }}>
                                    {arrConvenientMater.slice(8, 10).map((item, index) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleClickConvenient(item, 8 + index);
                                            }}>
                                            <View style={{
                                                width: 90, justifyContent: 'center'
                                                , alignItems: 'center', borderBlockColor: AppColor.Cyan,
                                                backgroundColor: item.isCheck ? AppColor.CyanLight : AppColor.white,
                                                borderRadius: 10, borderWidth: 1, height: 90
                                            }}>
                                                <Image
                                                    resizeMode="stretch"
                                                    source={iconPaths[item.iconName]}
                                                    style={{ width: 40, height: 40 }}
                                                />
                                                <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{
                                        fontWeight: 'bold', color: AppColor.Cyan, marginTop: 10,
                                        fontSize: 18
                                    }}>Loại hình kinh doanh</Text>
                                    <TouchableOpacity onPress={() => { handleSetType('Tất cả') }}
                                        style={{
                                            flexDirection: 'row', flex: 5, justifyContent: 'center', alignItems: 'center',
                                            backgroundColor: typeAll ? AppColor.CyanLight : AppColor.white
                                        }}>
                                        <Text style={{
                                            flex: 4,
                                            width: '100%', fontSize: 18, paddingVertical: 10, paddingLeft: 10,

                                        }}
                                        >Tất cả</Text>
                                        {typeAll ? <Icon name="check" size={18} color={AppColor.Blue1} style={{ flex: 1 }} /> : null}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { handleSetType('Khách sạn') }}
                                        style={{
                                            flexDirection: 'row', flex: 5, justifyContent: 'center', alignItems: 'center',
                                            backgroundColor: typeHotel ? AppColor.CyanLight : AppColor.white
                                        }}>
                                        <Text style={{
                                            flex: 4,
                                            width: '100%', fontSize: 18, paddingVertical: 10, paddingLeft: 10,
                                            backgroundColor: typeHotel ? AppColor.CyanLight : AppColor.white
                                        }} >Khách sạn</Text>
                                        {typeHotel ? <Icon name="check" size={18} color={AppColor.Blue1} style={{ flex: 1 }} /> : null}
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { handleSetType('Khác') }}
                                        style={{
                                            flexDirection: 'row', flex: 5, justifyContent: 'center', alignItems: 'center',
                                            backgroundColor: typeOrder ? AppColor.CyanLight : AppColor.white
                                        }}>
                                        <Text
                                            style={{
                                                flex: 4,
                                                width: '100%', fontSize: 18, paddingVertical: 10, paddingLeft: 10,
                                            }}
                                        >khác</Text>
                                        {typeOrder ? <Icon name="check" size={18} color={AppColor.Blue1} style={{ flex: 1 }} /> : null}
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </ScrollView>
                        <View style={{
                            height: 70, flexDirection: 'row', gap: 10,
                            backgroundColor: AppColor.Gray01, marginLeft: -10, marginRight: -10,
                            marginBottom: -10, padding: 10
                        }}>
                            <TouchableOpacity style={{
                                flex: 1, backgroundColor: AppColor.white,
                                justifyContent: 'center', alignItems: 'center',
                                borderBlockColor: AppColor.Blue1, borderWidth: 1,
                                borderRadius: 10
                            }}
                                onPress={() => { handleReset() }}>
                                <Text style={{ fontSize: 18, fontWeight: 'semibold', color: AppColor.Blue1 }}>Đặt lại</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flex: 1, backgroundColor: AppColor.Blue1,
                                justifyContent: 'center', alignItems: 'center',
                                borderBlockColor: AppColor.Blue1, borderWidth: 1,
                                borderRadius: 10
                            }}>
                                <Text style={{ fontSize: 18, fontWeight: 'semibold', color: AppColor.white }}>Hoàn tất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal></View>

    );
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        //height: Dimensions.get('window').height - 100,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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
        backgroundColor: AppColor.Cyan, paddingVertical: 10, paddingHorizontal: 20,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 1000, marginLeft: 10, marginRight: 10
    }

});