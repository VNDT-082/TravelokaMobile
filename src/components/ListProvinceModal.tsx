import { Modal, StyleSheet, View, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import { AppColor } from "../assets/AppColor";
import { Pointer } from 'iconsax-react-native';

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
            <TouchableOpacity >
                <Text>Chọn địa điểm đặt phòng</Text>
            </TouchableOpacity>
            <Modal visible={listProvinceModalState} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={toggleModal}
                            style={styles.closeButton}>
                            <Text style={{
                                fontWeight: 'semibold',
                                color: AppColor.Cyan
                            }}>Đóng</Text>
                        </TouchableOpacity>
                        <ScrollView>
                            {listProvince.map((item, index) => (
                                <TouchableOpacity
                                    style={styles.container}
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
    },
    modalContent: {
        height: Dimensions.get('window').height - 100,
        backgroundColor: 'white',
        padding: 20,
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
});
