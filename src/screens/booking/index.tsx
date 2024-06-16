import { RouteProp, useRoute } from "@react-navigation/native";
import { ActivityIndicator, Image, ScrollView, TextInput, TouchableOpacity, View, useAnimatedValue } from "react-native";
import { ScreenProps } from "react-native-screens";
import GenerateId from "../../service/generateId";
import { useEffect, useState } from "react";
import getLocalStorageItem from "../../service/getLocalStorageItem";
import LocalStoreEnum from "../../axios/LocalStoreEnum";
import ErrorModal from "../../components/ErrorModal";
import HeaderMenuTitlePage from "../../components/HeaderMenuTitlePage";
import { Text } from "react-native";
import { AppColor } from "../../assets/AppColor";
import axios from "axios";
import CalculateTotalDay from "../../service/CalculateTotalDay";
import { getAvartaHotelByIdHotel } from "../../service/images.service";
import URL_Enum from "../../axios/URL_Enum";
import FormatDateDDD from "../../service/FormatDateDDD";
import { Clock, Danger, InfoCircle, Information, NotificationStatus, SearchNormal1 } from "iconsax-react-native";
import PolicyChangeAndCancelOrderModal from "../../components/PolicyChangeAndCancelOrderModal";
import { getOnePosterByGiftCode } from "../../service/poster.service";
import IconBooking from "../../components/iconfromsvg/IconBooking";


type ScreenBookingHotelProp = RouteProp<RootStackParamList, 'BookingHotel'>;
const BookingHotelSrceen: React.FC<ScreenProps> = () => {
    const route = useRoute<ScreenBookingHotelProp>();
    const { idRoom } = route.params;
    const [errorModalState, setErrorModalState] = useState<boolean>(false);
    const [errorDes, setErrorDes] = useState<string>('')
    const [typeNotify, setTypeNotify] = useState<'Error' | 'Sucsess' | 'Warning'>('Sucsess');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [room, setRoom] = useState<IRoom>();

    const [policyChangeAndCancelOrderModalState, setPolicyChangeAndCancelOrderModalState] = useState<boolean>(false);
    const [timeReciveSelected, setTimeReciveSelected] = useState<Date>(new Date());

    const [discountCode, setDisountCode] = useState<string>("");
    const [discountState, setDiscountState] = useState<boolean>(false);
    const [discountValue, setDiscountValue] = useState<number>(0);
    const [discountCanUse, setDiscountCanUse] = useState<boolean>(false);
    const [discountMessage, setDiscountMessage] = useState<string>('');
    const [discountModel, setDiscountModel] = useState<IPoster>();
    const [discountPrice, setDiscountPrice] = useState<number>(0);

    const [totalDay, setTotalDay] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalPriceActual, setTotalPriceActual] = useState<number>(totalPrice);
    const [TotalRoom, setTotalRoom] = useState<number>(1);
    const [avartaHotel, setAvartaHotel] = useState<IHotelImage>();
    const TotalRoomStorage = getLocalStorageItem(LocalStoreEnum.TOTAL_ROOM);
    useEffect(() => {
        TotalRoomStorage.then(value => {
            setTotalRoom(Number.parseInt(value ? value : '1'));
        })
    }, []);
    const IdBooking = GenerateId("bookinghotel");
    const [modalErr, setModalErr] = useState<boolean>(false);
    const [modalQuestionYN, setModalQuestionYN] = useState<boolean>(false);
    const [typePay, setTypePay] = useState<boolean>(false);
    const [modalErrValue, setModalErrValue] = useState<string>('');
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
                setErrorDes('Không lấy được thông tin đăng nhập của bạn, vui lòng đăng nhập lại');
                setTypeNotify('Error');
                setErrorModalState(true);
            })

        }
        else {
            setTypeNotify('Error');
            setErrorDes('Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục.');
            setErrorModalState(true)
        }
    }
    useEffect(() => {
        getIGuest();
    }, []);

    useEffect(() => {
        if (idRoom == undefined || idRoom == null) {
            setTypeNotify('Error');
            setErrorDes('Lỗi kết nối, không lấy được dữ liệu');
            setErrorModalState(true)
        }
        const fetchData = (url: string) => {
            setIsLoading(true);
            axios.get(url).then((response) => {
                console.log('room', response.data.result);
                if (response.data.result === 'NOT_FOUND') { setModalErr(false); }
                else {
                    setRoom(response.data.result);
                    setTotalDay(CalculateTotalDay(new Date(response.data.result.TimeRecive),
                        new Date(response.data.result.TimeLeave)));
                    setTotalPrice((CalculateTotalDay(new Date(response.data.result.TimeRecive),
                        new Date(response.data.result.TimeLeave)) * (response.data.result.typeroom.Price
                            - response.data.result.typeroom.Price * response.data.result.Discount / 100
                        )) * Number.parseInt(TotalRoom != null ? TotalRoom.toString() : '1'));
                    setTotalPriceActual((CalculateTotalDay(new Date(response.data.result.TimeRecive),
                        new Date(response.data.result.TimeLeave)) * (response.data.result.typeroom.Price
                            - response.data.result.typeroom.Price * response.data.result.Discount / 100
                        )) * Number.parseInt(TotalRoom != null ? TotalRoom.toString() : '1'));

                }

                //search avarta hotel
                getAvartaHotelByIdHotel(response.data.result.typeroom.HotelId)
                    .then((subResponse) => {
                        if (subResponse != false) {
                            setAvartaHotel(subResponse);
                        }
                        console.log('response.data.result', subResponse)
                    });

            }).catch((err) => { console.log(err); setModalErr(false) })
                .finally(() => {
                    setIsLoading(false);
                });
        };
        fetchData(URL_Enum.BaseURL_Host + 'room/get-one-by-id?id=' + idRoom);

    }, []);

    const handleGetDiscountValue = (data: IPoster) => {
        const currentDate = new Date();
        if (data?.EndDate != undefined) {
            const hanGiamGia = new Date(data.EndDate)
            console.log('thoi han mgg', hanGiamGia)
            console.log('ngay hien tai', currentDate)
            if (hanGiamGia >= currentDate) {
                setDiscountCanUse(true);
                if (data.SubstractWithPercent == true) {
                    setDiscountState(true);
                    setDiscountValue(data.GiftCodePercent)
                    setDiscountMessage('Bạn được giảm ' + data.GiftCodePercent + '% vào tổng giá hóa đơn')
                    setTotalPrice(totalPriceActual - totalPriceActual * data.GiftCodePercent / 100)
                    setDiscountPrice(totalPriceActual * data.GiftCodePercent / 100)
                }
                else {
                    setDiscountState(false);
                    setDiscountValue(data.GiftCodePrice)
                    setTotalPrice(totalPriceActual - data.GiftCodePrice)
                    setDiscountMessage('Bạn được giảm' + (data.GiftCodePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })) + ' vào tổng giá hóa đơn')
                    setDiscountPrice(data.GiftCodePrice)
                }
            }
            else {
                setTotalPrice(totalPriceActual)
                setDiscountMessage('Mã giảm giá hết hạn sử dụng.')
            }

        }
        else {
            setTotalPrice(totalPriceActual)
            setDiscountCanUse(true)
            setDiscountValue(0)
            setDiscountMessage('Mã giảm giá không tồn tại, vui lòng thử lại.')
        }
    }


    return (
        isLoading ? <View style={{
            width: '100%', height: '100%', flex: 1, justifyContent: 'center',
            alignItems: 'center', display: 'flex'
        }}><ActivityIndicator /></View> :
            <View >
                <HeaderMenuTitlePage title="Trang đặt phòng" />
                <ScrollView>
                    <View style={{ marginTop: 50, padding: 10, backgroundColor: AppColor.Blue1 }}>
                        <View style={{}}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: AppColor.white }}>Xin chào! {userGuest?.Name}</Text>
                        </View>
                        <View style={{
                            padding: 15, backgroundColor: AppColor.white,
                            borderStyle: 'solid', borderRadius: 10,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 1,
                                height: 2,
                            },
                            shadowOpacity: 0.23,
                            shadowRadius: 2.62,
                            elevation: 4,
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../assets/icon/iconhotel.webp')} />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: AppColor.Gray31 }}>{room?.typeroom?.hotel?.Name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                <Text style={{ fontSize: 15, color: AppColor.Gray31 }}>Thời gian nhận phòng:</Text>
                                <Text style={{ fontSize: 15, color: AppColor.Gray31 }}> {room?.TimeRecive && FormatDateDDD(room?.TimeRecive)}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row', marginVertical: 5, borderBottomColor: AppColor.Gray01,
                                borderBottomWidth: 0.5, paddingBottom: 10
                            }}>
                                <Text style={{ fontSize: 15, color: AppColor.Gray31 }}>Thời gian trả phòng:</Text>
                                <Text style={{ fontSize: 15, color: AppColor.Gray31 }}> {room?.TimeLeave && FormatDateDDD(room?.TimeLeave)}</Text>
                            </View>

                            <View style={{
                                marginVertical: 5, borderBottomColor: AppColor.Gray01,
                                borderBottomWidth: 0.5, paddingBottom: 10
                            }}>
                                <Text>({TotalRoom}x) {room?.typeroom?.Name}</Text>
                                {room?.Breakfast ? <Text style={{ color: AppColor.Green31 }}>Bữa sáng miễn phí</Text> : null}
                                <Text>{room?.typeroom?.SoLuongGiuong} {room?.typeroom?.TenLoaiGiuong}</Text>
                                <Text>{room?.typeroom?.MaxQuantityMember} khách/phòng</Text>
                            </View>
                            <View>

                                {room?.ChangeTimeRecive ?
                                    <View style={{
                                        alignItems: 'center',
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <NotificationStatus size="15" color={AppColor.Blue1} />
                                        <Text style={{ fontSize: 15, color: AppColor.Blue1, marginHorizontal: 5, fontWeight: 'bold' }}>Có thể đổi lịch</Text>
                                        <InfoCircle size="15" color={AppColor.Blue1} variant="Bold"
                                            onPress={() => {
                                                setTimeReciveSelected(room.TimeRecive);
                                                setPolicyChangeAndCancelOrderModalState(true);
                                            }} />
                                    </View> :
                                    <View style={{
                                        alignItems: 'center',
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <NotificationStatus size="15" color={AppColor.Blue1} />
                                        <Text style={{ fontSize: 15, color: AppColor.Blue1, marginHorizontal: 5, fontWeight: 'bold' }}>Không thể đổi lịch</Text>
                                        {/* <InfoCircle size="15" color={AppColor.Blue1} variant="Bold" /> */}
                                    </View>}

                                {room?.Cancel ?
                                    <View style={{
                                        alignItems: 'center',
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <NotificationStatus size="15" color={AppColor.Blue1} />
                                        <Text style={{ fontSize: 15, color: AppColor.Blue1, marginHorizontal: 5, fontWeight: 'bold' }}>Có thể hủy phòng</Text>
                                        <InfoCircle size="15" color={AppColor.Blue1} variant="Bold"
                                            onPress={() => {
                                                setTimeReciveSelected(room.TimeRecive);
                                                setPolicyChangeAndCancelOrderModalState(true);
                                            }} />
                                    </View> :
                                    <View style={{
                                        alignItems: 'center',
                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                        marginHorizontal: 5
                                    }}>
                                        <NotificationStatus size="15" color={AppColor.Blue1} />
                                        <Text style={{ fontSize: 15, color: AppColor.Blue1, marginHorizontal: 5, fontWeight: 'bold' }}>Không thể hủy phòng</Text>
                                        {/* <InfoCircle size="15" color={AppColor.Blue1} variant="Bold" /> */}
                                    </View>}
                            </View>

                        </View>
                        <View style={{
                            padding: 15, backgroundColor: AppColor.Yellow01,
                            borderStyle: 'solid', borderRadius: 10,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 1,
                                height: 2,
                            },
                            shadowOpacity: 0.23,
                            shadowRadius: 2.62,
                            elevation: 4, marginVertical: 10,
                        }}>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}><Danger size="32" color="#ff8a65" variant="Bold" />
                                <Text style={{ fontSize: 18, color: AppColor.Gray31 }}> Phải đọc trước khi nhận phòng</Text></View>

                            <View style={{ flexDirection: "row", alignItems: 'center', marginVertical: 10 }}>
                                <Image style={{ width: 18, height: 18 }}
                                    source={require('../../assets/icon/GiayTo.webp')} />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: AppColor.SaddleBrown }}>Giấy tờ bắt buộc</Text>
                            </View>

                            <Text style={{ fontSize: 16, color: AppColor.SaddleBrown }}>Khi nhận phòng bạn cần cung
                                cấp CMND/CCCD, orther. Các giấy tờ cần thiết có thể ở dạng bản mềm.
                            </Text>

                        </View>




                    </View>

                    <View style={{ backgroundColor: AppColor.Gray01, padding: 10 }}>
                        <View style={{
                            padding: 15, backgroundColor: AppColor.white,
                            borderStyle: 'solid', borderRadius: 10,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 1,
                                height: 2,
                            },
                            shadowOpacity: 0.23,
                            shadowRadius: 2.62,
                            elevation: 4, marginVertical: 10,
                        }}>
                            <Text style={{ fontSize: 16, color: AppColor.Gray31 }}>Nhập mã code giảm giá</Text>
                            <View style={{ flexDirection: 'row', flex: 5, padding: 10 }}>
                                <TextInput
                                    style={{
                                        fontSize: 15, paddingLeft: 5,
                                        flex: 4, borderColor: AppColor.BlueDark, borderTopLeftRadius: 5,
                                        borderBottomLeftRadius: 5, borderWidth: 1, backgroundColor: AppColor.white
                                    }}
                                    placeholder="Mã giảm giá của bạn"
                                    onChangeText={(value: string) => {
                                        setDisountCode(value)
                                        if (value.length == 0) {
                                            setDiscountMessage('')
                                            setDiscountCanUse(false)
                                            setDiscountValue(0)
                                            setTotalPrice(totalPriceActual)
                                        }
                                    }}
                                    value={discountCode}
                                /><TouchableOpacity style={{
                                    width: 50, height: 50, backgroundColor: AppColor.Blue1,
                                    justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 5,
                                    borderTopRightRadius: 5, borderColor: AppColor.BlueDark, borderWidth: 1
                                }} onPress={() => {
                                    setDiscountMessage('Đang kiểm tra...')
                                    const response = getOnePosterByGiftCode(discountCode);
                                    response.then((data) => {
                                        setDiscountModel(data);
                                        if (data != undefined) {
                                            handleGetDiscountValue(data);
                                        }
                                        else {
                                            setDiscountMessage('Mã giảm giá không tồn tại, vui lòng thử lại.')
                                        }
                                        console.log('iposter', data);
                                    }).catch((err) => { console.log('errr', err) })
                                }}>
                                    <SearchNormal1 size="32" color="#d9e3f0" variant="Outline" />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 16, color: AppColor.Red }}>{discountMessage}</Text>
                        </View>

                        <View style={{
                            padding: 15, backgroundColor: AppColor.white,
                            borderStyle: 'solid', borderRadius: 10,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 1,
                                height: 2,
                            },
                            shadowOpacity: 0.23,
                            shadowRadius: 2.62,
                            elevation: 4, marginVertical: 10,
                        }}>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <Information size="32" color="#ff8a65" variant="Bulk" />

                                <Text style={{ fontSize: 16, color: AppColor.Gray31, paddingHorizontal: 10 }}> Thuế và phí là các
                                    khoản được chúng tôi chuyển trả cho khách sạn. Mọi thắc mắc về thuế và hóa
                                    đơn, vui lòng tham khảo Điều khoản và Điều kiện của chúng tôi để được giải đáp</Text>
                            </View>
                            <Text style={{ fontWeight: 'bold', color: AppColor.Blue1, fontSize: 18 }}>Giá phòng</Text>
                            <View >
                                <View>
                                    <Text style={{ fontSize: 16, }}>
                                        <Text>
                                            (x{TotalRoom} Phòng)
                                        </Text>
                                        <Text >
                                            {room?.typeroom?.Name}, (x{totalDay}Đêm)
                                        </Text>
                                    </Text>
                                </View>
                                <View >
                                    <Text style={{ fontSize: 16, color: AppColor.Red }}>
                                        <Text>
                                            {room?.typeroom?.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            (x{totalDay})
                                            = {((room?.typeroom?.Price ?? 0) * totalDay * Number.parseInt(TotalRoom ? TotalRoom.toString() : '1')).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </Text>
                                    </Text>
                                </View>
                            </View>

                            {/* thue vat */}
                            {room?.Bao_Gom_Thue_Va_Phi ? <Text style={{ fontSize: 15 }}>
                                Đã bao gồm thuế VAT(8%)
                            </Text> :
                                <View style={{
                                    flexDirection: 'row', borderTopColor: AppColor.Gray01, gap: 5, marginVertical: 10
                                    , borderTopWidth: 0.5,
                                }}>
                                    <View>
                                        <Text style={{ fontSize: 15 }}>Giá chưa bao gồm VAT, bạn phải trả thêm:</Text>
                                        <Text style={{ fontSize: 12 }}>VAT = 8% giá trị phiếu đặt</Text>
                                    </View>
                                    <Text style={{ fontSize: 16, color: AppColor.Red }}>
                                        {(totalPrice * 8 / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </Text>
                                </View>}

                            {/* gia phong co khuyen mai */}
                            {room?.Discount && room?.Discount > 0 ?
                                <><View style={{
                                    flex: 2,
                                    flexDirection: 'row', borderTopColor: AppColor.Gray01, gap: 5, marginVertical: 10
                                    , borderTopWidth: 0.5,
                                }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 15 }}>Giá phòng sau giảm giá</Text>
                                        <Text >
                                            Phòng được giảm: {room.Discount}%
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: 16, color: AppColor.Red, textAlign: 'right' }}>
                                        chỉ còn  {(totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </Text>
                                </View></>
                                : null}

                            {/* Gift code neu co */}
                            {discountCanUse == true ?
                                <><View style={{
                                    flex: 2,
                                    flexDirection: 'row', borderTopColor: AppColor.Gray01, gap: 5, marginVertical: 10
                                    , borderTopWidth: 0.5,
                                }}>
                                    <View style={{ flex: 1 }}>
                                        <Text>Giảm giá từ GIFT-CODE</Text>
                                        <Text >
                                            Được tính vào tổng giá trị hóa đơn
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: 16, color: AppColor.Red, textAlign: 'right' }}>
                                        giảm {discountState ? discountValue + '%' :
                                            discountValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </Text>
                                </View>
                                </>
                                : null}

                            {/* gia phong phai tra */}
                            <View style={{
                                flex: 2,
                                flexDirection: 'row', borderTopColor: AppColor.Gray01, gap: 5, marginVertical: 10
                                , borderTopWidth: 0.5,
                            }}>
                                <Text style={{ flex: 1, fontSize: 18, color: AppColor.Red, }}>Giá phòng phải thanh toán:</Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: AppColor.Red, textAlign: 'right' }}>
                                    {room?.Bao_Gom_Thue_Va_Phi ?
                                        totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                        : (totalPrice + (totalPrice * 8 / 100)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Clock size="32" color="#2ccce4" variant="Outline" />
                                <Text style={{ fontSize: 18, color: AppColor.Blue1 }}>Hãy giữ phòng này ngay trước khi nó tăng cao hơn!</Text>
                            </View>

                            <TouchableOpacity>
                                <Text style={{
                                    color: AppColor.white, backgroundColor: AppColor.Orage,
                                    textAlign: 'center', paddingVertical: 10, borderRadius: 5, fontWeight: 'black', fontSize: 16
                                }}>Tiếp tục thanh toán</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <View>
                    <ErrorModal errorDes={errorDes} errorModalState={errorModalState}
                        setErrorModalState={setErrorModalState} typeNotify={typeNotify} />
                    <PolicyChangeAndCancelOrderModal policyChangeAndCancelOrderModalState={policyChangeAndCancelOrderModalState}
                        setPolicyChangeAndCancelOrderModalState={setPolicyChangeAndCancelOrderModalState} timeRecive={timeReciveSelected} />
                </View>
            </View>
    );
}
export default BookingHotelSrceen;