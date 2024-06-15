import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColor } from "../assets/AppColor";
import IconEmpty from "./iconfromsvg/IconEmpty";
import URL_Enum from "../axios/URL_Enum";
import { ArchiveTick, Component, DiscountShape, InfoCircle, Money2, MoneySend, NotificationStatus } from "iconsax-react-native";
import IconFloorArea from "./iconfromsvg/IconFloorArea";
import { useState } from "react";
import PolicyChangeAndCancelOrderModal from "./PolicyChangeAndCancelOrderModal";
import ErrorModal from "./ErrorModal";
import FormatDate from "../service/FormatDateString";

interface IPops {
    roomModalState: boolean,
    setRoomModalState: (roomModalState: boolean) => void;
    typeRoomSelected?: ITypeRoom;
    listImageTypeRoomSelected?: IHotelImage[];
}
export default function RoomModal(props: IPops) {
    const [errorModalState, setErrorModalState] = useState<boolean>(false);
    const { roomModalState, setRoomModalState, typeRoomSelected, listImageTypeRoomSelected } = props;
    const [policyChangeAndCancelOrderModalState, setPolicyChangeAndCancelOrderModalState] = useState<boolean>(false);
    const [timeReciveSelected, setTimeReciveSelected] = useState<Date>(new Date());
    const [errorDes, setErrorDes] = useState<string>('')
    const [typeNotify, setTypeNotify] = useState<'Error' | 'Sucsess' | 'Warning'>('Sucsess')
    return (
        <View>
            {/* <TouchableOpacity >
            <Text>Chọn địa điểm đặt phòng</Text>
        </TouchableOpacity> */}
            <Modal visible={roomModalState} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{
                            flex: 5, flexDirection: 'row', justifyContent: 'space-around',
                            alignItems: 'flex-start', height: 50, maxHeight: 50,
                        }}>
                            <View>
                                <Text style={{
                                    flex: 4,
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-end',
                                    fontSize: 15,
                                }}>Danh sách phòng</Text>
                                <Text style={{
                                    flex: 4,
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-end',
                                    fontSize: 15, fontWeight: 'bold'
                                }}>{typeRoomSelected?.Name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setRoomModalState(false)}
                                style={{
                                    flex: 1,
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-end',
                                    backgroundColor: AppColor.white
                                }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: AppColor.Cyan,
                                    textAlign: 'right',
                                    backgroundColor: AppColor.white
                                }}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ maxHeight: Dimensions.get('window').height - 250 }}>
                            {typeRoomSelected != undefined && typeRoomSelected.room != undefined ? <View>
                                <ScrollView horizontal>
                                    {listImageTypeRoomSelected != undefined ? listImageTypeRoomSelected.map((item, index) => (
                                        <View style={{ width: Dimensions.get('window').width - 90, marginHorizontal: 5, marginVertical: 10, borderRadius: 10 }} key={index}>
                                            <Image style={{ width: '100%', height: 220, borderRadius: 10 }}
                                                source={{ uri: URL_Enum.BaseURL_Image + item.FileName }} />
                                        </View>
                                    )) : null}
                                </ScrollView>
                                {typeRoomSelected.room != undefined ?
                                    <View style={{
                                        borderBottomColor: AppColor.Gray01,
                                        borderBottomWidth: 0.5
                                    }}>
                                        {typeRoomSelected.room.find(findItem => { return findItem.Hinh_Thuc_Thanh_Toan == '0' }) != undefined ?
                                            <Text>Bạn có thêm nhiều lựa chọn linh hoạt với loại phòng này! Bạn có thể</Text> : null}
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <ArchiveTick size="18" color={AppColor.Blue1} />
                                            <Text style={{ fontWeight: 'bold', color: AppColor.Blue1, marginHorizontal: 2 }}>Thanh toán trực tiếp tại khách sạn</Text>
                                            <InfoCircle size="18" color={AppColor.Blue1} variant="Bold"
                                                onPress={() => {
                                                    setErrorDes('Có thể hoàn tất thanh toán khi nhận phòng tại khách sạn');
                                                    setTypeNotify('Warning');
                                                    setErrorModalState(true);
                                                }} />
                                        </View>
                                        <Text style={{ fontWeight: 'normal', color: AppColor.Blue1, marginHorizontal: 26 }}>Thanh toán khi bạn nhận phòng tại nơi ở</Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                                            <ArchiveTick size="18" color={AppColor.Blue1} />
                                            <Text style={{ fontWeight: 'bold', color: AppColor.Blue1, marginHorizontal: 2 }}>Thanh toán online ngay khi đặt phòng</Text>
                                            <InfoCircle size="18" color={AppColor.Blue1} variant="Bold" onPress={() => {
                                                setErrorDes('Phải hoàn tất việc thanh toán ngay khi đặt phòng');
                                                setTypeNotify('Warning');
                                                setErrorModalState(true);
                                            }} />
                                        </View>
                                    </View> : <View style={{
                                        flexDirection: 'row', alignItems: 'center', borderBottomColor: AppColor.Gray01,
                                        borderBottomWidth: 0.5
                                    }}>
                                        <ArchiveTick size="18" color={AppColor.Blue1} />
                                        <Text style={{ fontWeight: 'bold', color: AppColor.Blue1, marginHorizontal: 2 }}>Thanh toán online ngay khi đặt phòng</Text>
                                        <InfoCircle size="18" color={AppColor.Blue1} variant="Bold" onPress={() => {
                                            setErrorDes('Phải hoàn tất việc thanh toán ngay khi đặt phòng');
                                            setTypeNotify('Warning');
                                            setErrorModalState(true);
                                        }} />
                                    </View>}

                                <View style={{
                                    flexDirection: 'row', flex: 2, justifyContent: 'space-between', borderBottomColor: AppColor.Gray01,
                                    borderBottomWidth: 0.5
                                }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{
                                            flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                            marginHorizontal: 5
                                        }}>
                                            <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                source={require('../assets/icon/buaansang.webp')} />
                                            <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>
                                                {typeRoomSelected.room?.find(fitem => { return fitem.Breakfast == true }) != undefined ? 'Bao gồm phục vụ bữa sáng' : 'Không bao gồm phục vụ bữa sáng'}</Text>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                            marginHorizontal: 5
                                        }}>
                                            <MoneySend size="24" color={AppColor.Blue1} />
                                            <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>{typeRoomSelected.room?.find(fitem => { return fitem.Hinh_Thuc_Thanh_Toan == '1' }) != undefined ? 'Thanh toán online' : 'Có thanh toán trực tiếp'}</Text>
                                        </View>

                                        {typeRoomSelected.No_Moking ? <View style={{
                                            flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                            marginHorizontal: 5
                                        }}>
                                            <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                source={require('../assets/icon/NoSmoke.webp')} />
                                            <Text style={{ fontSize: 16, color: AppColor.Red }}>Không hút thuốc</Text>
                                        </View> : <View style={{
                                            flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                            marginHorizontal: 5
                                        }}>
                                            <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                source={require('../assets/icon/NoSmoke.webp')} />
                                            <Text style={{ fontSize: 16, }}>Được hút thuốc</Text>
                                        </View>}

                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <View style={{
                                            flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                            marginHorizontal: 5
                                        }}>
                                            <IconFloorArea height="24" width="24" />
                                            <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>{typeRoomSelected.FloorArea} m²</Text>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                            marginHorizontal: 5
                                        }}>
                                            <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                source={require('../assets/icon/TreEmVaThuCung.webp')} />
                                            <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>{typeRoomSelected.MaxQuantityMember} người</Text>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                            marginHorizontal: 5
                                        }}>
                                            <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                source={require('../assets/icon/giuong.webp')} />
                                            <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>{typeRoomSelected.SoLuongGiuong + ' ' + typeRoomSelected.TenLoaiGiuong}</Text>
                                        </View>

                                    </View>
                                </View>

                                {/* Dac diem phong ban thich */}
                                <View style={{
                                    borderBottomColor: AppColor.Gray01,
                                    borderBottomWidth: 0.5
                                }}>
                                    <Text style={{ fontSize: 18 }}>Đặc điểm phòng bạn thích</Text>
                                    <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <IconFloorArea height="24" width="24" />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>{typeRoomSelected.FloorArea} m²</Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                            source={require('../assets/icon/TreEmVaThuCung.webp')} />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>{typeRoomSelected.MaxQuantityMember} người</Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                            source={require('../assets/icon/giuong.webp')} />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>{typeRoomSelected.SoLuongGiuong + ' ' + typeRoomSelected.TenLoaiGiuong}</Text>
                                    </View>
                                    {typeRoomSelected.Voi_Tam_Dung ? <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                            source={require('../assets/icon/voisen.webp')} />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>Vòi tắm đứng</Text>
                                    </View> : null}

                                    {typeRoomSelected.Ban_Cong_San_Hien ? <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                            source={require('../assets/icon/bancong.webp')} />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>Ban công sân hiên</Text>
                                    </View> : null}


                                    {typeRoomSelected.Khu_Vuc_Cho ? <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                            source={require('../assets/icon/khuvucho.webp')} />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>Ban công sân hiên</Text>
                                    </View> : null}

                                    {typeRoomSelected.May_Lanh ? <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                            source={require('../assets/icon/maylanh.webp')} />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>Máy lạnh</Text>
                                    </View> : null}

                                    {typeRoomSelected.Nuoc_Nong ? <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                            source={require('../assets/icon/nuocnong.webp')} />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>Nước nóng</Text>
                                    </View> : null}


                                    {typeRoomSelected.Bon_Tam ? <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                            source={require('../assets/icon/bontam.webp')} />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>Bồn tắm</Text>
                                    </View> : null}

                                    {typeRoomSelected.Lo_Vi_Song ? <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                            source={require('../assets/icon/lovisong.webp')} />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>Lò vi sóng</Text>
                                    </View> : null}


                                    {typeRoomSelected.Tu_Lanh ? <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                            source={require('../assets/icon/TienNghiPhong.webp')} />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>Tủ lạnh</Text>
                                    </View> : null}


                                    {typeRoomSelected.May_Giat ? <View style={{
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                            source={require('../assets/icon/maygiat.webp')} />
                                        <Text style={{ fontSize: 16, color: AppColor.Blue1 }}>Máy giặt</Text>
                                    </View> : null}
                                </View>

                                {/* tien nghi phong */}
                                <View style={{
                                    borderBottomColor: AppColor.Gray01,
                                    borderBottomWidth: 0.5
                                }}>
                                    <Text style={{ fontSize: 18 }}>Đặc điểm phòng bạn thích</Text>
                                    {typeRoomSelected.ConvenientRoom.split(';').map((item, index) => (
                                        <View key={index} style={{
                                            flexDirection: 'row', alignItems: 'center',
                                            paddingHorizontal: 10, paddingVertical: 5,
                                            marginHorizontal: 5
                                        }}>
                                            <Component size="10" color={AppColor.Blue1} variant="Bold" />
                                            <Text style={{ fontSize: 16, marginLeft: 5, color: AppColor.Blue1 }}>{item}</Text>
                                        </View>
                                    ))}
                                </View>


                                {/* tien nghi phong tam */}
                                <View style={{
                                    borderBottomColor: AppColor.Gray01,
                                    borderBottomWidth: 0.5
                                }}>
                                    <Text style={{ fontSize: 18 }}>Đặc điểm phòng bạn thích</Text>
                                    {typeRoomSelected.ConvenientBathRoom.split(';').map((item, index) => (
                                        <View key={index} style={{
                                            flexDirection: 'row', alignItems: 'center',
                                            paddingHorizontal: 10, paddingVertical: 5,
                                            marginHorizontal: 5
                                        }}>
                                            <Component size="10" color={AppColor.Blue1} variant="Bold" />
                                            <Text style={{ fontSize: 16, marginLeft: 5, color: AppColor.Blue1 }}>{item}</Text>
                                        </View>
                                    ))}
                                </View>

                                {typeRoomSelected.room?.map((item, index) => (
                                    item.State == false ?
                                        <View key={index}
                                            style={{
                                                borderStyle: 'solid', borderRadius: 10,
                                                backgroundColor: AppColor.CyanLight,
                                                width: '100%',
                                                shadowColor: AppColor.Gray31,
                                                shadowOffset: {
                                                    width: 1,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.23,
                                                shadowRadius: 2.62,
                                                elevation: 4,
                                                marginVertical: 10
                                            }}>
                                            <View style={{ padding: 10 }}>
                                                <Text style={{ fontSize: 15, color: AppColor.Blue1 }}>Mã phòng: {item.id}</Text>
                                                <Text style={{ fontSize: 15, color: AppColor.Blue1 }}>Tên phòng: {item.RoomName}</Text>
                                                <Text style={{ fontSize: 15, color: AppColor.Blue1 }}>Thông tin về phòng này</Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 15, color: AppColor.Blue1, paddingHorizontal: 10, }}>Thời gian nhận phòng: {FormatDate(item.TimeRecive)}</Text>
                                                <Text style={{ fontSize: 15, color: AppColor.Blue1, paddingHorizontal: 10, }}>Thời gian trả phòng: {FormatDate(item.TimeLeave)}</Text>
                                                <View style={{
                                                    flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                                    marginHorizontal: 5
                                                }}>
                                                    <Image style={{ width: 18, height: 18, borderRadius: 10 }}
                                                        source={require('../assets/icon/buaansang.webp')} />
                                                    <Text style={{ fontSize: 15, color: AppColor.Blue1 }}>
                                                        {typeRoomSelected.room?.find(fitem => { return fitem.Breakfast == true }) != undefined ? 'Bao gồm phục vụ bữa sáng' : 'Không bao gồm phục vụ bữa sáng'}</Text>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                                    marginHorizontal: 5
                                                }}>
                                                    <MoneySend size="18" color={AppColor.Blue1} />
                                                    <Text style={{ fontSize: 15, color: AppColor.Blue1 }}>{typeRoomSelected.room?.find(fitem => { return fitem.Hinh_Thuc_Thanh_Toan == '1' }) != undefined ? 'Thanh toán online' : 'Có thanh toán trực tiếp'}</Text>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                                    marginHorizontal: 5
                                                }}>
                                                    <Money2 size="18" color={AppColor.Blue1} />
                                                    <Text style={{ fontSize: 15, color: AppColor.Blue1 }}>{typeRoomSelected.room?.find(fitem => { return fitem.Bao_Gom_Thue_Va_Phi == '1' }) != undefined ? 'Đã bao gồm thuế và phí' : 'Chưa bao gồm thuế và phí'}</Text>
                                                </View>

                                                {typeRoomSelected.No_Moking ? <View style={{
                                                    flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                                    marginHorizontal: 5
                                                }}>
                                                    <Image style={{ width: 18, height: 18, borderRadius: 10 }}
                                                        source={require('../assets/icon/NoSmoke.webp')} />
                                                    <Text style={{ fontSize: 15, color: AppColor.Red }}>Không hút thuốc</Text>
                                                </View> : <View style={{
                                                    flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                                    marginHorizontal: 5
                                                }}>
                                                    <Image style={{ width: 18, height: 18, borderRadius: 10 }}
                                                        source={require('../assets/icon/NoSmoke.webp')} />
                                                    <Text style={{ fontSize: 15, }}>Được hút thuốc</Text>
                                                </View>}

                                                {item.ChangeTimeRecive ?
                                                    <View style={{
                                                        alignItems: 'center',
                                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                                        marginHorizontal: 5
                                                    }}>
                                                        <NotificationStatus size="18" color={AppColor.Blue1} />
                                                        <Text style={{ fontSize: 18, color: AppColor.Blue1, marginHorizontal: 5, fontWeight: 'bold' }}>Có thể đổi lịch</Text>
                                                        <InfoCircle size="18" color={AppColor.Blue1} variant="Bold"
                                                            onPress={() => {
                                                                setTimeReciveSelected(item.TimeRecive);
                                                                setPolicyChangeAndCancelOrderModalState(true);
                                                            }} />
                                                    </View> :
                                                    <View style={{
                                                        alignItems: 'center',
                                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                                        marginHorizontal: 5
                                                    }}>
                                                        <NotificationStatus size="18" color={AppColor.Blue1} />
                                                        <Text style={{ fontSize: 18, color: AppColor.Blue1, marginHorizontal: 5, fontWeight: 'bold' }}>Không thể đổi lịch</Text>
                                                        {/* <InfoCircle size="18" color={AppColor.Blue1} variant="Bold" /> */}
                                                    </View>}

                                                {item.Cancel ?
                                                    <View style={{
                                                        alignItems: 'center',
                                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                                        marginHorizontal: 5
                                                    }}>
                                                        <NotificationStatus size="18" color={AppColor.Blue1} />
                                                        <Text style={{ fontSize: 18, color: AppColor.Blue1, marginHorizontal: 5, fontWeight: 'bold' }}>Có thể hủy phòng</Text>
                                                        <InfoCircle size="18" color={AppColor.Blue1} variant="Bold"
                                                            onPress={() => {
                                                                setTimeReciveSelected(item.TimeRecive);
                                                                setPolicyChangeAndCancelOrderModalState(true);
                                                            }} />
                                                    </View> :
                                                    <View style={{
                                                        alignItems: 'center',
                                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                                        marginHorizontal: 5
                                                    }}>
                                                        <NotificationStatus size="18" color={AppColor.Blue1} />
                                                        <Text style={{ fontSize: 18, color: AppColor.Blue1, marginHorizontal: 5, fontWeight: 'bold' }}>Không thể hủy phòng</Text>
                                                        {/* <InfoCircle size="18" color={AppColor.Blue1} variant="Bold" /> */}
                                                    </View>}

                                                <View style={{ padding: 5 }}>
                                                    {item.Discount > 0 ?

                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                                                <DiscountShape size="32" color="#FF8A65" />
                                                                <Text style={{
                                                                    fontSize: 18, fontWeight: 'bold',
                                                                    color: '#FF8A65'
                                                                }}>giảm {item.Discount}%</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                                                <Text style={{
                                                                    color: AppColor.Gray31,
                                                                    fontSize: 15,
                                                                    textDecorationLine: 'line-through',
                                                                    marginRight: 5
                                                                }}>{typeRoomSelected.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                                                <Text
                                                                    style={{ color: 'red', fontWeight: 'bold', fontSize: 18 }}>
                                                                    {(typeRoomSelected.Price - typeRoomSelected.Price * item.Discount / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </Text>
                                                            </View>

                                                        </View> :
                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                                            <Text
                                                                style={{ color: 'red', fontWeight: 'bold', fontSize: 18 }}>
                                                                {typeRoomSelected.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </Text>
                                                        </View>}
                                                </View>
                                                <View style={{ padding: 5 }}>
                                                    <TouchableOpacity>
                                                        <Text style={{
                                                            fontWeight: 'bold', fontSize: 18,
                                                            color: AppColor.white, textAlign: 'center',
                                                            backgroundColor: '#FFC125', paddingVertical: 5,
                                                            borderRadius: 5
                                                        }}>Đặt phòng này</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                        </View> : null
                                ))}
                                <View>
                                    <ErrorModal errorDes={errorDes} errorModalState={errorModalState}
                                        setErrorModalState={setErrorModalState} typeNotify={typeNotify} />
                                    <PolicyChangeAndCancelOrderModal policyChangeAndCancelOrderModalState={policyChangeAndCancelOrderModalState}
                                        setPolicyChangeAndCancelOrderModalState={setPolicyChangeAndCancelOrderModalState} timeRecive={timeReciveSelected} />
                                </View>
                            </View> :
                                <View><IconEmpty height="54" width="54" /></View>}
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
