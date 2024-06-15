import http from "../axios/http";

export const getListDiaDiemLanCanByHotelID = async (id: string): Promise<any> => {
    try {
        const response = await http.get(`diadiemlancan/get-list-by-id?id=${id}`);
        if (response.status === 200) {
            return response.data.result;
        }
    }
    catch (error) {
        console.log('error', error);
        return false;
    }
}