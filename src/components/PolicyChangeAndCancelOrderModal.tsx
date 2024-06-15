import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColor } from "../assets/AppColor";
import FormatDate from "../service/FormatDateString";
import { TickCircle } from "iconsax-react-native";

const todoSubstractDate = (dateInput: Date, totalDaySubstract: number): string => {
    const dateInput_ = FormatDate(dateInput);
    if (dateInput_ != null) {
        const currentDate = new Date(Number.parseInt(dateInput_.split('/')[2])
            , Number.parseInt(dateInput_.split('/')[1]), Number.parseInt(dateInput_.split('/')[0]));
        currentDate.setDate(currentDate.getDate() - totalDaySubstract);
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth()).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }
    return '';

}
interface IPops {
    policyChangeAndCancelOrderModalState: boolean,
    setPolicyChangeAndCancelOrderModalState: (policyChangeAndCancelOrderModalState: boolean) => void;
    timeRecive: Date;
}
export default function PolicyChangeAndCancelOrderModal(props: IPops) {
    const { timeRecive, policyChangeAndCancelOrderModalState, setPolicyChangeAndCancelOrderModalState } = props
    return (
        <View>
            {/* <TouchableOpacity >
            <Text>Chọn địa điểm đặt phòng</Text>
        </TouchableOpacity> */}
            <Modal visible={policyChangeAndCancelOrderModalState} transparent={true}>
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
                            }}>Thông tin hủy phòng và đổi lịch</Text>
                            <TouchableOpacity onPress={() => setPolicyChangeAndCancelOrderModalState(false)}
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
                            justifyContent: 'center', alignItems: 'flex-start',
                        }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <TickCircle size="18" color={AppColor.Green31} />
                                <Text style={{ fontSize: 18, color: AppColor.Green31 }}>Miễn phí hủy phòng trước {FormatDate(timeRecive)?.split(' ')[0]}</Text>
                            </View>

                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <TickCircle size="18" color={AppColor.Green31} />
                                <Text style={{ fontSize: 18, color: AppColor.Green31 }}>Có thể đổi lịch trước {FormatDate(timeRecive)?.split(' ')[0]}</Text>
                            </View>

                            <View style={{
                                borderTopColor: AppColor.Gray31, borderTopWidth: 1,
                                borderBottomColor: AppColor.Gray31, borderBottomWidth: 1,
                                marginVertical: 10, paddingHorizontal: 10
                            }}>
                                <View style={{ borderLeftWidth: 2, borderLeftColor: AppColor.Green31, paddingHorizontal: 20 }}>
                                    <View style={{
                                        position: 'absolute', width: 10, height: 10, backgroundColor: AppColor.Green31,
                                        borderRadius: 5, left: -7, bottom: 3
                                    }}></View>
                                    <Text style={{ fontSize: 15, color: AppColor.Green31 }}>Miễn phí hủy phòng trước:</Text>
                                    <Text style={{ fontSize: 15, color: AppColor.Green31 }}>{todoSubstractDate(timeRecive, 3)}</Text>
                                </View>

                                <View style={{ borderLeftWidth: 2, borderLeftColor: AppColor.SaddleBrown, paddingHorizontal: 20 }}>
                                    <View style={{
                                        position: 'absolute', width: 10, height: 10, backgroundColor: AppColor.SaddleBrown,
                                        borderRadius: 5, left: -7, bottom: '15%'
                                    }}></View>
                                    <Text style={{ fontSize: 15, color: AppColor.SaddleBrown }}>Phí hủy phòng là 30% giá trị phiếu đặt. Mức phí này áp dụng nếu hủy trước:</Text>
                                    <Text style={{ fontSize: 15, color: AppColor.SaddleBrown }}>{FormatDate(timeRecive)?.split(' ')[0]}</Text>
                                </View>

                                <View style={{ borderLeftWidth: 2, borderLeftColor: AppColor.Red, paddingHorizontal: 20 }}>
                                    <View style={{
                                        position: 'absolute', width: 10, height: 10, backgroundColor: AppColor.Red,
                                        borderRadius: 5, left: -7, bottom: '50%'
                                    }}></View>
                                    <Text style={{ fontSize: 15, color: AppColor.Red }}>Hủy phòng sẽ không hoàn tiền. Nếu hủy sau:</Text>
                                    <Text style={{ fontSize: 15, color: AppColor.Red }}>{FormatDate(timeRecive)?.split(' ')[0]}</Text>
                                </View>
                            </View>

                            <View>
                                <Text>
                                    Đặt phòng này có thể đổi lịch nhưng có thể phải chịu phí hủy phòng nếu thực hiện thay đổi sau {FormatDate(timeRecive)}.
                                </Text>
                                <Text>•  Bất kỳ mã giảm giá hoặc điểm đã sử dụng trong đặt phòng ban đầu sẽ không thể áp dụng cho đặt phòng mới.
                                </Text>
                                <Text > •  Phí đổi lịch có thể được áp dụng dựa trên sự chênh lệch giá giữa đặt phòng cũ và mới.
                                </Text>
                            </View>
                        </View>
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
