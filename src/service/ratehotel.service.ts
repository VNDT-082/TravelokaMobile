
import axios from "axios";
import URL_Enum from "../axios/URL_Enum";


export const addNewRate = async (selectedImages: string[] | null,
    id: string,
    HotelId: string,
    GuestId: string,
    Rating: number,
    Description: string,
    Sach_Se: number,
    Thoai_Mai: number,
    Dich_Vu: number,
): Promise<any | boolean> => {
    try {
        // Tạo FormData chứa dữ liệu cần uploadid_hotel
        const formData = new FormData();
        formData.append('id', id);
        formData.append('HotelId', HotelId);
        formData.append('GuestId', GuestId);
        formData.append('Rating', Rating.toString());
        formData.append('Description', Description);
        formData.append('Sach_Se', Sach_Se.toString());
        formData.append('Thoai_Mai', Thoai_Mai.toString());
        formData.append('Dich_Vu', Dich_Vu.toString());

        if (selectedImages != null) {
            formData.append('imageCount', selectedImages.length.toString());
            selectedImages?.forEach((imageUri, index) => {
                const fileExtension = imageUri.split('.').pop();
                const fileName = `image_${Date.now()}.${fileExtension}`;

                formData.append('image' + index, {
                    uri: imageUri,
                    type: fileExtension === 'jpg' ? 'image/jpeg' : 'image/png',
                    name: fileName,
                });
            });
        }
        else { formData.append('imageCount', "0"); }


        console.log('data', formData);
        const response = await axios.post<boolean | string>
            (URL_Enum.BaseURL_Host + 'rate-hotel/add-new-rate', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true',
                    },
                })
        if (response.status === 200) {
            return response.data;
        }
        return false;
    } catch (error: any) {
        return false;
    }
}