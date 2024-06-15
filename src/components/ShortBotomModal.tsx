import { CloseSquare, TickCircle } from "iconsax-react-native"
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AppColor } from "../assets/AppColor";

interface IPops {
    shortBotomModalState: boolean;
    setShortBotomModalState: (shortBotomModalState: boolean) => void;
    hienFilterRate: string;
    setHienFilterRate: (hienFilterRate: string) => void;
    listRateTemp: IRate[];
    setListRateTemp: (listRateTemp: IRate[]) => void;
    listRate?: IRate[];
}
export default function ShortBotomModal(props: IPops) {
    const { shortBotomModalState, setShortBotomModalState, hienFilterRate, setHienFilterRate
        , listRate, listRateTemp, setListRateTemp } = props;
    const arrFilterRate = ['Tất cả', 'Top 3', 'Gần đây nhất', 'Điểm (Từ cao đến thấp)', 'Điểm (từ thấp đến cao)'];

    const handleClickFilterRate = (filter: string) => {
        if (listRate != undefined) {
            if (filter == 'Gần đây nhất') {
                setListRateTemp(
                    listRate.sort((a, b) => {
                        const dateA = new Date(a.created_at);
                        const dateB = new Date(b.created_at);
                        return dateB.getTime() - dateA.getTime();
                    })
                );
            }
            else if (filter == 'Điểm (Từ cao đến thấp)') {
                setListRateTemp(
                    listRate.sort((a, b) => b.Rating - a.Rating)
                );
            }
            else if (filter == 'Điểm (từ thấp đến cao)') {
                setListRateTemp(
                    listRate.sort((a, b) => a.Rating - b.Rating)
                );

            }
            else if (filter == 'Tất cả') {
                setListRateTemp(listRate ? listRate : []);
            }
            else {
                setListRateTemp(
                    listRate.filter((item) => {
                        return item.HinhAnh != null;
                    }));
            }
        }
        setShortBotomModalState(false);
    }
    return (
        <View>
            <Modal visible={shortBotomModalState} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 5,
                            borderBottomWidth: 1, borderBottomColor: AppColor.Gray01
                        }}>
                            <Text style={{
                                flex: 4,
                                fontWeight: 'bold', color: AppColor.Cyan, marginTop: 10,
                                fontSize: 18, textAlign: 'center'
                            }}>Sắp xếp theo</Text>
                            <CloseSquare size="24" color={AppColor.Cyan} onPress={() => { setShortBotomModalState(false) }} />
                        </View>

                        <ScrollView style={{ height: 320 }}>
                            {arrFilterRate.map((item, index) => (
                                <View key={index} style={{ marginVertical: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
                                    <TickCircle size="32" color="#697689" variant={hienFilterRate == item ? 'Bold' : 'Outline'}
                                        onPress={() => { setHienFilterRate(item) }} />
                                    <Text style={{ fontSize: 18 }}>{item}</Text>
                                </View>
                            ))}
                            <TouchableOpacity onPress={() => { handleClickFilterRate(hienFilterRate) }}>
                                <Text style={{
                                    backgroundColor: AppColor.Blue1, color: AppColor.white,
                                    paddingVertical: 10, textAlign: 'center', borderRadius: 5,
                                    fontSize: 18
                                }}>Xong</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>

    )
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