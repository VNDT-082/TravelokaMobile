import { useEffect, useState } from "react";
import { Button, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GenerateId from "../../service/generateId";
import { addNewRate } from "../../service/ratehotel.service";
// Import Document Picker
import DocumentPicker from 'react-native-document-picker';
//import {launchImageLibrary} from 'react-native-image-picker';
import { launchImageLibrary as _launchImageLibrary, launchCamera as _launchCamera, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { AppColor } from "../../assets/AppColor";
import { CloseSquare } from "iconsax-react-native";
import { TextInput } from "react-native-paper";
import { Rating } from "@rneui/themed";
import RateStar from "./RateStar";
import RateClearnUp from "./RateStarClearnUp";
import RateStarService from "./RateStarService";
import RateStarConvenient from "./RateStarConvenient";
let launchImageLibrary = _launchImageLibrary;
let launchCamera = _launchCamera;
interface IProps {
    rateStar: number,
    setRateStar: (rataStar: number) => void,

    rateConvenient: number,
    setRateConvenient: (rateConvenient: number) => void,

    rateService: number,
    setRateService: (rateService: number) => void,

    rateClearnUp: number,
    setRateClearnUp: (rateClearnUp: number) => void,

    hotelId: string,

    listRate?: IRate[],

    setListRate: (listRate: IRate[] | []) => void,

    setListRateTemp: (listRateTemp: IRate[]) => void,

}

interface PhotoNode {
    uri: string;
    width: number;
    height: number;
    creationTime: number;
    modificationTime: number;
    mediaType: 'photo';
    id: string;
}
interface PhotosResponse {
    assets: {
        edges: PhotoNode[];
    };
}
export default function FormRateHotel(props: IProps) {
    const [notifyCate, setNotifyCate] = useState<'successfully' | 'error' | 'warning'>('successfully');
    const [notifyState, setNotifyState] = useState<boolean>(false);
    const [notifyMessage, setNotifyMessage] = useState<string>('');
    const { rateStar, setRateStar, rateConvenient, setRateConvenient, rateService, setRateService,
        rateClearnUp, setRateClearnUp, hotelId, listRate, setListRate, setListRateTemp } = props;

    const [description, setDescription] = useState<string>("");

    // const [files, setFiles] = useState<FileList | null>(null);
    //const [files, setFiles] = useState<File | null>(null);

    const onSubmitForm = () => {
        // if (description != '') {
        //     const response = addNewRate(files, GenerateId('ratehotel'),
        //         hotelId, 'G20240429111501', rateStar, description, rateClearnUp,
        //         rateConvenient, rateService);
        //     response.then(data => {
        //         if (data.status == 'successfully') {
        //             setNotifyCate(data.status);
        //             const rateResut = data.result;
        //             if (rateResut != undefined) {
        //                 listRate?.push(rateResut);
        //                 setListRate(listRate);
        //                 setListRateTemp(listRate);
        //             }
        //             setRateStar(0);
        //             setRateConvenient(0);
        //             setRateService(0);
        //             setRateClearnUp(0);
        //             setDescription("");
        //             setFiles(null);
        //         }
        //         else if (data.status == 'error') { setNotifyCate(data.status) }
        //         else if (data.status == 'warning') { setNotifyCate(data.status) }
        //         setNotifyMessage(data.message);
        //         setNotifyState(true);
        //         setTimeout(() => {
        //             setNotifyState(false);
        //         }, 5000);
        //     });
        // }
        // else {
        //     setNotifyCate('error')
        //     setNotifyMessage('Vui lòng nhập đánh giá của bạn.');
        //     setNotifyState(true);
        //     setTimeout(() => {
        //         setNotifyState(false);
        //     }, 5000);
        // }


    }

    // const [photos, setPhotos] = useState<PhotoNode[]>([]);
    // const [selectedPhotos, setSelectedPhotos] = useState<PhotoNode[]>([]);
    const [selectedImage, setSelectedImage] = useState<string[]>([]);
    const openImagePicker = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            selectionLimit: 0,

        };

        launchImageLibrary(options, handleResponse);
    };

    // const handleCameraLaunch = () => {
    //     const options: CameraOptions = {
    //         mediaType: 'photo',
    //         includeBase64: false,
    //         maxHeight: 2000,
    //         maxWidth: 2000,
    //     };

    //     launchCamera(options, handleResponse);
    // };

    const handleResponse = (response: any) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('Image picker error: ', response.error);
        } else {
            const selectedImages = response.assets.map((asset: any) => asset.uri);
            console.log('Selected images:', selectedImages);
            setSelectedImage(selectedImages);
        }
    };
    const ratingCompleted = (rating: number) => {
        console.log('Rating is: ' + rating);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Nhập đánh giá của bạn</Text>
            <TextInput
                style={{ borderColor: AppColor.BlueDark, borderRadius: 5, borderWidth: 1, backgroundColor: AppColor.white }}
                onChangeText={(value: string) => setDescription(value)}
                multiline
                value={description}
            />

            <View style={{
                padding: 5, borderWidth: 1, borderColor: AppColor.Blue1, borderRadius: 5, marginVertical: 10,
                shadowColor: AppColor.Blue1,
                shadowOffset: {
                    width: 1,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 1,
            }}>
                <View style={{ paddingHorizontal: 35, }}><Text style={{ fontSize: 18, flex: 1 }}>Đánh giá của bạn</Text>
                    <RateStar rateStar={rateStar} setRateStar={setRateStar} /></View>

                <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', marginVertical: 5, flex: 5, justifyContent: 'flex-start' }}><Text style={{ fontSize: 18, flex: 2 }}>Mức độ sạch sẽ:</Text><RateClearnUp rateClearnUp={rateClearnUp} setRateClearnUp={setRateClearnUp} /></View>
                <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', marginVertical: 5, flex: 5, justifyContent: 'flex-start' }}><Text style={{ fontSize: 18, flex: 2 }}>Mức độ dịch vụ:</Text><RateStarService rateService={rateService} setRateService={setRateService} /></View>
                <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', marginVertical: 5, flex: 5, justifyContent: 'flex-start' }}><Text style={{ fontSize: 18, flex: 2 }}>Mức độ thoải mái:</Text><RateStarConvenient rateConvenient={rateConvenient} setRateConvenient={setRateConvenient} /></View>
            </View>
            {selectedImage && (
                <ScrollView horizontal>
                    {selectedImage.map((item, index) => (
                        <View key={index} style={{
                            width: Dimensions.get('window').width - 90,
                            backgroundColor: AppColor.CyanLight, marginHorizontal: 2.5
                        }}>
                            <Image
                                source={{ uri: item }}
                                style={{ width: '100%', height: 220, borderRadius: 5 }}
                                resizeMode="cover"
                            />
                            <CloseSquare size="32" color="#f47373" variant="Bold" style={{
                                position: 'absolute',
                                top: 10, right: 10
                            }} onPress={() => {
                                setSelectedImage(selectedImage.filter(fitem => { return fitem != item }))
                            }} />
                        </View>
                    ))}
                </ScrollView>

            )}
            <View style={{ marginTop: 20 }}>
                <Button title="Chọn ảnh" onPress={openImagePicker} />
            </View>
            {/* <View style={{ marginTop: 20, marginBottom: 50 }}>
                <Button title="Open Camera" onPress={handleCameraLaunch} />
            </View> */}
        </View>
    );
};
