import { TouchableOpacity, View } from "react-native";
import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";
import { AppColor } from "../assets/AppColor";
import { Modal } from "react-native";
import URL_Enum from "../axios/URL_Enum";
import { Image } from "react-native";
import { useEffect, useState } from "react";

interface IPops {
    listImageModalState: boolean,
    setListImageModalState: (listImageModalState: boolean) => void;
    listImage: IHotelImage[];
}
export default function ListImageModal(props: IPops) {
    const { listImage, listImageModalState, setListImageModalState } = props;
    const [listImageShort, setListImageShort] = useState<IHotelImage[]>(listImage);
    const [listTitle, setListTitle] = useState<string[]>([]);
    const getListTitle = () => {
        let list: string[] = [];
        listImage.map(item => {
            let titleItem = item.TypeRoom.split(';')[item.TypeRoom.split(';').length - 1];

            if (list.find(fitem => {
                return fitem == titleItem;
            }) == undefined) {
                list.push(titleItem);
            }
        });
        setListTitle(list);
    }
    useEffect(() => {
        getListTitle();
    }, []);
    const handleShort = (title: string) => {
        setListImageShort(listImage.filter(item => {
            return item.TypeRoom.split(';')[item.TypeRoom.split(';').length - 1] == title;
        }));
    }

    return (
        <View>
            {/* <TouchableOpacity >
                <Text>Chọn địa điểm đặt phòng</Text>
            </TouchableOpacity> */}
            <Modal visible={listImageModalState} transparent={true}>
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
                            }}>Hình ảnh của khách sạn</Text>
                            <TouchableOpacity onPress={() => setListImageModalState(false)}
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
                            flex: 2, flexDirection: 'row', backgroundColor: AppColor.Cyan, height: 50,
                            marginHorizontal: -20, maxHeight: 50, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <ScrollView horizontal>
                                {listTitle.map((item, index) => (
                                    <Text key={index}
                                        style={{
                                            color: AppColor.white, fontSize: 17,
                                            paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: AppColor.white,
                                            borderRadius: 10, marginHorizontal: 5
                                        }}
                                        onPress={() => handleShort(item)}>{item}</Text>
                                ))}
                            </ScrollView>
                        </View>
                        <ScrollView style={{ maxHeight: Dimensions.get('window').height - 300 }}>
                            {listImageShort.map((item, index) => (
                                <View style={{ width: Dimensions.get('window').width - 70, marginVertical: 10, borderRadius: 10 }} key={index}>
                                    <Image style={{ width: '100%', height: 220, borderRadius: 10 }}
                                        source={{ uri: URL_Enum.BaseURL_Image + item.FileName }} />
                                </View>

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
