import { Modal, StyleSheet, View, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import { AppColor } from "../assets/AppColor";

interface IProps {
    searchProvince: IProvince | undefined;
    setSearchProvince: (searchProvince: IProvince | undefined) => void;
    listProvinceModalState: boolean;
    setListProvinceModalState: (listProvinceModalState: boolean) => void;
    listProvince: IProvince[];
}
export default function ListProvinceModal(props: IProps) {
    const { searchProvince, setSearchProvince, listProvinceModalState, setListProvinceModalState, listProvince } = props;
    const toggleModal = () => {
        setListProvinceModalState(!listProvinceModalState);
    };
    return (
        <View>
            {/* <TouchableOpacity >
                <Text>Chọn địa điểm đặt phòng</Text>
            </TouchableOpacity> */}
            <Modal visible={listProvinceModalState} transparent={true}>
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
                            }}>Chọn địa điểm</Text>
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
                            {listProvince.map((item, index) => (
                                <TouchableOpacity
                                    style={[styles.container, { backgroundColor: index % 2 != 0 ? AppColor.white : AppColor.Gray01 }]}
                                    onPress={() => {
                                        setSearchProvince(item)
                                        setListProvinceModalState(false)
                                    }}
                                    key={index}
                                >
                                    <View style={styles.leftColumn}>
                                        <Text style={styles.displayName}>{item.DisplayName}</Text>
                                        <Text style={styles.country}>Việt Nam</Text>
                                    </View>
                                    <View style={styles.rightColumn}>
                                        <TouchableOpacity style={styles.regionButton}>
                                            <Text style={styles.regionButtonText}>Vùng</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.hotelCount}>{item.totalHotel} khách sạn</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
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
