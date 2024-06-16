import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderMenu from '../../components/HeaderMenu';
import { AppColor } from '../../assets/AppColor';
import HeaderMenuTitlePage from '../../components/HeaderMenuTitlePage';
import getLocalStorageItem from '../../service/getLocalStorageItem';
import LocalStoreEnum from '../../axios/LocalStoreEnum';
import { getListBookingByGusetId } from '../../service/bookinghotel.service';
import FormatDateDDD from '../../service/FormatDateDDD';


const getMonthLatter = (monthLatte: number) => {
    const currentDate = new Date();
    const month = currentDate.getMonth() - monthLatte + 1;
    return 'Tháng ' + month + ', năm ' + currentDate.getFullYear();
}
const CartScreen = () => {

    const [dataHome, setDataHome] = useState([]);

    const [userGuest, setUserGuest] = useState<IGuest>();
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

    enum PageEnum {
        ThongBao = 'ThongBao',
        LichSu = 'LichSu',
        TaiKhoan = 'TaiKhoan',
        DangXuat = 'DangXuat'
    }
    enum SortEnum {
        ChinMuoiNgayQua = '90 ngày qua',
        MoiNhat = 'Mới nhất',
        CuNhat = 'Cũ nhất',
        MotThangTruoc = 'MotThangTruoc',
        HaiThangTruoc = 'HaiThangTruoc',
        BaThangTruoc = 'BaThangTruoc',
        Clear = 'Tất cả'
    }

    const [loadingBookingState, setLoadingBookingState] = useState<boolean>(false);
    const [modalErr, setModalErr] = useState<boolean>(false);
    const [modalErrValue, setModalErrValue] = useState<string>('');
    const [listMessage, setListMessage] = useState<IMessage[]>([]);





    const [sortDate, setSortDate] = useState<string>(SortEnum.MoiNhat);
    const [listBookingHotel, setListBookingHotel] = useState<IBooking[]>([]);

    useEffect(() => {
        getIGuest();
    }, [])

    const getData = () => {
        if (userGuest?.id != undefined) {
            setLoadingBookingState(true);
            const reponseHistory = getListBookingByGusetId(userGuest?.id)
                .then(response => {
                    setListBookingHotel(response.result)
                    console.log('reponseHistory', response)
                }).catch((err) => {
                    setModalErrValue('Lỗi truy cập vui lòng thử lại')
                    setModalErr(true)
                }).finally(() => { setLoadingBookingState(false) })

        }
        // if (userGuest?.id != undefined) {
        //     setLoadingBookingState(true);
        //     const reponseMessage = getListMessageByGusetId(userGuest?.id)
        //         .then(response => {
        //             setListMessage(response.result)
        //             console.log('reponseHistory', response)
        //         }).catch((err) => {
        //             setModalErrValue('Lỗi truy cập vui lòng thử lại')
        //             setModalErr(true)
        //         }).finally(() => { setLoadingBookingState(false) })
        // }
    }


    useEffect(() => {
        getData();
    }, [])



    return (
        <View style={{
            backgroundColor: AppColor.Snow1, height: '100%'
        }}>
            <HeaderMenuTitlePage title='Phiếu đặt phòng' />
            <View style={{ marginTop: 50 }}>
                <ScrollView horizontal style={{ padding: 10 }}>
                    <Text style={styles.textShort}
                        onPress={() => setSortDate(SortEnum.MoiNhat)}>{SortEnum.MoiNhat}</Text>

                    <Text style={styles.textShort}
                        onPress={() => setSortDate(SortEnum.CuNhat)}>{SortEnum.CuNhat}</Text>

                    <Text style={styles.textShort}
                        onPress={() => setSortDate(SortEnum.ChinMuoiNgayQua)}>{SortEnum.ChinMuoiNgayQua}</Text>

                    <Text style={styles.textShort}
                        onPress={() => setSortDate(SortEnum.MotThangTruoc)}>{getMonthLatter(1)}</Text>

                    <Text style={styles.textShort}
                        onPress={() => setSortDate(SortEnum.HaiThangTruoc)}>{getMonthLatter(2)}</Text>

                    <Text style={styles.textShort}
                        onPress={() => setSortDate(SortEnum.BaThangTruoc)}>{getMonthLatter(3)}</Text>

                    <Text style={styles.textShort}
                        onPress={() => setSortDate(SortEnum.Clear)}>{SortEnum.Clear}</Text>
                </ScrollView>
                <ScrollView style={{ padding: 10 }}>
                    {listBookingHotel ?
                        listBookingHotel.map((item, index) => (

                            <View key={index}
                                style={{
                                    backgroundColor: AppColor.CyanLight,
                                    marginVertical: 10,
                                    padding: 10,
                                    borderStyle: 'solid', borderRadius: 10,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 1,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.23,
                                    shadowRadius: 2.62,
                                    elevation: 4,
                                    borderColor: AppColor.Blue1,
                                    borderWidth: 1
                                }}>
                                <Text style={{ fontSize: 15, color: AppColor.Gray31, marginVertical: 5 }}>Mã phòng: {item?.RoomId}(Tên phòng: {item.room?.RoomName}) - Loại phòng: {item.room?.typeroom?.Name} - Khách sạn: {item.room?.typeroom?.hotel?.Name}</Text>
                                <Text style={{ fontSize: 15, color: AppColor.Gray31, marginVertical: 5 }}>Mã phiếu đặt: {item?.id} </Text>
                                <Text style={{ fontSize: 15, color: AppColor.Gray31, marginVertical: 5 }}>Ngày nhận phòng: {item?.TimeRecive != undefined ? FormatDateDDD(item?.TimeRecive) : null} - Ngày trả phòng: {item?.TimeLeave != undefined ? FormatDateDDD(item?.TimeLeave) : null}</Text>
                                <Text style={{ fontSize: 15, color: AppColor.Red, marginVertical: 5 }}>Chi phí: <Text>{item?.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text> (Giảm giá: {item?.Discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} )</Text>
                                <Text style={{ fontSize: 15, color: AppColor.Blue1, marginVertical: 5 }}>Hình thức thanh toán:{item?.TypePay}</Text>
                                <TouchableOpacity><Text
                                    style={{
                                        textAlign: 'center', paddingVertical: 10,
                                        fontSize: 17, color: AppColor.white, marginVertical: 5,
                                        backgroundColor: AppColor.Blue1, fontWeight: 'bold', borderRadius: 5
                                    }}>Xem chi tiết phòng</Text>
                                </TouchableOpacity>
                            </View>
                        ))


                        : <View></View>}
                    <View style={{ height: 90, paddingBottom: 90 }}></View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textShort: {
        fontSize: 16, fontWeight: 'bold', borderWidth: 1,
        color: AppColor.Blue1, borderColor: AppColor.Blue1,
        borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5,
        marginHorizontal: 2.5,
        borderStyle: 'solid',
        backgroundColor: AppColor.Snow1,
        shadowColor: AppColor.Blue1,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
    },
})

export default CartScreen;