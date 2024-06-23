import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Modal, View } from "react-native";
import { AppColor } from "../assets/AppColor";
import { Clock, Danger, Information, TickSquare } from "iconsax-react-native";
import { useState } from "react";
import { Image } from "react-native";
import GenerateId from "../service/generateId";
import BookingHotel_Model from "../types/booking.class";
import { createBookingHotel } from "../service/bookinghotel.service";
import { ActivityIndicator } from "react-native-paper";

interface IProps {
    payModalState: boolean;
    setPayModalState: (payModalState: boolean) => void;
    room: IRoom | undefined;
    totalPrice: number;
    discountCanUse: boolean;
    discountValue: number;
    discountState: boolean;
    totalDay: number;
    TotalRoom: number;
    userGuest: IGuest | undefined;
    discountCode: string;
    discountPrice: number;
    setNotifyValue: (notifyValue: string) => void;
    setBookingResult: (bookingResult: IBooking) => void;
    setNotifyModalState: (notifyModalState: boolean) => void;
}
export default function PayModal(props: IProps) {
    const { payModalState, setPayModalState, discountCanUse, discountState,
        discountValue, room, totalPrice, totalDay, TotalRoom,
        userGuest, discountCode, discountPrice, setBookingResult, setNotifyValue,
        setNotifyModalState } = props;
    const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
    const [listMember, setListMember] = useState<IMemberBooking[]>([]);
    const toggleModal = () => { setPayModalState(false) }
    const [tickRule, setTickRule] = useState<boolean>(false);
    const handlePayByHand = async () => {
        let thueVAT = room?.Bao_Gom_Thue_Va_Phi ? 0 : totalPrice * 8 / 100;
        if (userGuest != undefined && room != undefined) {
            let newBookingHotel: BookingHotel_Model = {
                id: GenerateId('bookinghotel'),
                GuestId: userGuest?.id,
                RoomId: room?.id,
                ConfirmBy: '',
                CreateDate: new Date(),
                Price: totalPrice,
                Gift: room.Gift,
                Discount: discountValue,
                State: false,
                Notes: '',
                TypePay: 'Thanh toán trực tiếp',
                TimeRecive: room.TimeRecive,
                TimeLeave: room.TimeLeave,
                ConfirmAt: new Date(),
                created_at: new Date(),
                updated_at: new Date(),
                GiftCode: discountCode,
                GiftCodePrice: discountPrice,
                VAT: thueVAT,
                members: listMember,
                room: null
            }
            setIsLoadingModal(true);
            console.log('bookingResult', newBookingHotel)
            const bookingResult = await createBookingHotel(newBookingHotel)
                .then((response) => {
                    console.log('response', response)
                    setNotifyValue(response.data.message);
                    setBookingResult(response.data.result);
                    setNotifyModalState(true);
                    setPayModalState(false);
                }).catch((err) => {
                    setNotifyValue("Đặt phòng thất bại, vui lòng thử lại.");
                })
                .finally(() => { setIsLoadingModal(false) });
        }
    }
    return (
        <View>
            <Modal visible={payModalState} transparent={true}>
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
                            }}>Chọn hình thức thanh toán</Text>
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
                                room != undefined ? <View>
                                    <View style={{
                                        width: Dimensions.get('window').width - 70,
                                        padding: 5, backgroundColor: AppColor.white,
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
                                                flex: 7
                                            }}>
                                                <View style={{ flex: 5 }}>
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
                                            <TickSquare size="24" color="#FF8A65" variant={tickRule ? 'Bold' : 'Linear'}
                                                onPress={() => setTickRule(!tickRule)} />
                                            <Text style={{ fontSize: 15, color: "#FF8A65" }}>Tôi đã đọc và chấp nhận điều khoản của hệ thống.</Text>
                                        </View>

                                        <Text style={{ fontSize: 15, color: "#FF8A65" }}>Chọn hình thức thanh toán:</Text>

                                        <TouchableOpacity
                                            onPress={() => { handlePayByHand() }}>
                                            <Text style={{
                                                color: AppColor.white, backgroundColor: AppColor.Orage,
                                                textAlign: 'center', paddingVertical: 10, borderRadius: 5, fontWeight: 'black', fontSize: 16
                                            }}>Thanh toán trực tiếp</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                paddingVertical: 5, justifyContent: 'center', alignItems: 'center', marginVertical: 10,
                                                width: '100%', backgroundColor: AppColor.white, borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 5,
                                            }}
                                            onPress={() => { }}>
                                            <Image source={require('../assets/icon/logo-en.webp')}
                                                style={{
                                                    width: 120
                                                }} />

                                        </TouchableOpacity>
                                    </View>
                                </View> : <View><Text>Lỗi kết nối</Text></View>}
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
        height: Dimensions.get('window').height - 250,
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
