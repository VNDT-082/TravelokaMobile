import http from "../axios/http";

export const getTop10New = async (): Promise<any> => {
    try {
        const response = await http.get(`hotel/get-top-ten-new`);
        if (response.status === 200) {
            return response.data.result;
        }
    }
    catch (error) {
        console.log('error', error);
        return false;
    }
}

export const getOneHotelByID = async (id: string): Promise<any> => {
    try {
        const response = await http.get(`hotel/get-one-by-id?id=${id}`);
        if (response.status === 200) {
            return response.data.result;
        }
    }
    catch (error) {
        console.log('error', error);
        return false;
    }
}