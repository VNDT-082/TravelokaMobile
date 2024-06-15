import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GenerateId from "../../service/generateId";
import { addNewRate } from "../../service/ratehotel.service";
// Import Document Picker
import DocumentPicker from 'react-native-document-picker';
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

    const [singleFile, setSingleFile] = useState<any>(null);

    const uploadImage = async () => {
        // Check if any file is selected or not
        if (singleFile != null) {
            // If file selected then create FormData
            const fileToUpload = singleFile;
            const data = new FormData();
            data.append('name', 'Image Upload');
            data.append('file_attachment', fileToUpload);
            // Please change file upload URL
            let res = await fetch(
                'http://localhost/upload.php',
                {
                    method: 'post',
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data; ',
                    },
                }
            );
            let responseJson = await res.json();
            if (responseJson.status == 1) {
                //('Upload Successful');
            }
        } else {
            // If no file selected the show alert
            //alert('Please Select File first');
        }
    };

    const selectFile = async () => {
        // Opening Document Picker to select one file
        try {
            const res = await DocumentPicker.pick({
                // Provide which type of file you want user to pick
                type: [DocumentPicker.types.allFiles],
                // There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            // Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            // Setting the state to show single file attributes
            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            // Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                // If user canceled the document selection
                console.log('Canceled');
            } else {
                // For Unknown Error
                console.log('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };


    return (
        <View style={styles.mainBody}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>
                    React Native File Upload Example
                </Text>
                <Text
                    style={{
                        fontSize: 25,
                        marginTop: 20,
                        marginBottom: 30,
                        textAlign: 'center',
                    }}>
                    www.aboutreact.com
                </Text>
            </View>
            {/*Showing the data of selected Single file*/}
            {singleFile != null ? (
                <Text style={styles.textStyle}>
                    File Name: {singleFile.name ? singleFile.name : ''}
                    {'\n'}
                    Type: {singleFile.type ? singleFile.type : ''}
                    {'\n'}
                    File Size: {singleFile.size ? singleFile.size : ''}
                    {'\n'}
                    URI: {singleFile.uri ? singleFile.uri : ''}
                    {'\n'}
                </Text>
            ) : null}
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={selectFile}>
                <Text style={styles.buttonTextStyle}>Select File</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={uploadImage}>
                <Text style={styles.buttonTextStyle}>Upload File</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    },
});
