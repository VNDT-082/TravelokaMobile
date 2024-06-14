import { CloseSquare } from "iconsax-react-native"
import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native"
import { AppColor } from "../assets/AppColor";
import SearchComponent from "./SearchComponent";
interface IProps {
    searchComponentModalState: boolean;
    setSearchComponentModalState: (searchComponentModalState: boolean) => void;
}
export default function SearchComponentModal(props: IProps) {
    const { searchComponentModalState, setSearchComponentModalState } = props;
    return (
        <View>
            <Modal visible={searchComponentModalState} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                            backgroundColor: AppColor.Cyan, marginHorizontal: -10, marginTop: -10, paddingHorizontal: 20
                            , paddingVertical: 10
                        }}>
                            <Text style={{
                                flex: 4,
                                fontWeight: 'bold', color: AppColor.white, marginTop: 10,
                                fontSize: 18
                            }}>Điều chỉnh</Text>
                            <CloseSquare size="24" color={AppColor.white} onPress={() => { setSearchComponentModalState(false) }} />
                        </View>
                        <ScrollView style={{ paddingBottom: 10 }}>
                            <SearchComponent />
                            {/* key={'SearchComponentSearchComponentModal'} */}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        //height: Dimensions.get('window').height - 100,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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