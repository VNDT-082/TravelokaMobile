
import axios from "axios";
import { EMAIL, PHONE, SUCCESS } from "../axios/constant";
import http from "../axios/http";
import URL_Enum from "../axios/URL_Enum";
import { getUserByEmail } from "./guest.service";
import setLocalStorageItem from "./setLocalStorageItem";
import LocalStoreEnum from "../axios/LocalStoreEnum";
import getLocalStorageItem from "./getLocalStorageItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RegisterResult = {
    success: boolean,
    message: string,
}

type LoginResult = {
    user: IUser | null,
    success: boolean,
    message: string,
}
type LoginAdminResult = {
    user: IAdministratorHotel | null,
    success: boolean,
    message: string,
}


export const login = async (
    loginEmail?: string,
    loginPass?: string
): Promise<any> => {
    try {
        if (loginEmail) {
            const formdata = new FormData();
            formdata.append('email', loginEmail);
            formdata.append('password', loginPass);
            const response = await axios.post<boolean | string>
                (URL_Enum.BaseURL_Host + 'login-email', formdata,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'X-Requested-With': 'XMLHttpRequest',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': 'true',
                        },
                    })
            if (response.status === 200) {
                const responseGuest = await getUserByEmail(loginEmail);
                const IGusetStorage = getLocalStorageItem(LocalStoreEnum.IGUEST)
                if (IGusetStorage != null && IGusetStorage != undefined) {
                    await AsyncStorage.removeItem(LocalStoreEnum.IGUEST);
                }
                setLocalStorageItem(LocalStoreEnum.IGUEST, JSON.stringify(responseGuest));
                // localStorage.setItem('IGuest', JSON.stringify(responseGuest))
                // sessionStorage.setItem('IGuest', JSON.stringify(responseGuest))

                return {
                    user: response.data,
                    success: true,
                    message: "Đăng nhập thành công"
                };
            }
            else if (response.status = EMAIL) {
                return {
                    user: null,
                    success: false,
                    message: "Email không tồn tại, bạn cần đăng ký"
                };
            }
            else if (response.status == PHONE) {
                return {
                    user: null,
                    success: false,
                    message: "Mật khẩu không đúng, vui lòng nhập lại"
                };
            }
            else {
                return {
                    user: null,
                    success: false,
                    message: "Lỗi sever vui lòng kiểm tra kết nối"
                };
            }
        }


    } catch (error) {
        console.log(error);
    }
};

export const register = async (
    dataForm: IRegister
): Promise<RegisterResult | undefined> => {
    try {
        const data = await http.post<string>(`register`, dataForm,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                },
            },);
        console.log('ketquadangky', data);
        if (data.status === SUCCESS) {
            return {
                success: true,
                message: "Đăng ký thành công"
            };
        }
        if (data.status === PHONE) {
            return {
                success: false,
                message: "Số điện thoại đã được đăng ký"
            };
        }
        if (data.status === EMAIL) {
            return {
                success: false,
                message: "Email đã được đăng ký"
            };
        }
    } catch (error: any) {
        return error;
    }
};

export const updateUserInfo = async (body: any) => {
    try {
        const data = await http.post(`/update-user-info`, body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                },
            },);
        if (data.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};
