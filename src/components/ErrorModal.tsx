import { TickCircle } from "iconsax-react-native";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColor } from "../assets/AppColor";
import { BottomSheetAndroid } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";
import { useNavigation } from "@react-navigation/native";


interface IProps {
    errorModalState: boolean;
    setErrorModalState: (errorModal: boolean) => void;
    errorDes: string;
    typeNotify: 'Error' | 'Sucsess' | 'Warning';
}
export default function ErrorModal(props: IProps) {
    const { errorDes, errorModalState, setErrorModalState, typeNotify } = props;
    const navigation = useNavigation();
    const handleClick = () => {
        if (typeNotify == 'Error') {
            navigation.goBack();
            setErrorModalState(false);
        }
    }
    return (
        <View>
            <Modal visible={errorModalState} transparent={true}>
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
                                fontSize: 24,
                                textAlign: 'center'
                            }}>Thông báo</Text>

                        </View>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%',
                        }}>
                            <TickCircle size="128" color={AppColor.Green31} />
                            <Text style={{
                                fontSize: 18, color: AppColor.Gray31, textAlign: 'center'
                            }}>{errorDes}</Text>
                            <TouchableOpacity onPress={() => {
                                handleClick()
                            }}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: typeNotify == 'Error' ? AppColor.Red
                                        : typeNotify == 'Sucsess' ? AppColor.Green31 : AppColor.Orage
                                }}>
                                <Text style={{
                                    fontWeight: 'semibold',
                                    color: AppColor.Cyan,
                                    textAlign: 'center',
                                    backgroundColor: AppColor.white,
                                    borderColor: typeNotify == 'Error' ? AppColor.Red
                                        : typeNotify == 'Sucsess' ? AppColor.Green31 : AppColor.Orage,
                                    borderWidth: 1, borderRadius: 10,
                                    paddingHorizontal: 40, paddingVertical: 15,
                                    position: 'absolute', bottom: 0
                                }} >Đóng</Text>
                            </TouchableOpacity>
                        </View>
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
        height: Dimensions.get('window').height - 500,
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
