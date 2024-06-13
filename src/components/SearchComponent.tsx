import { CalendarSearch, Location, UserTag } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { TextInput, View } from "react-native";
import { GetListProvinceDefault } from "../service/province.service";
import { AppColor } from "../assets/AppColor";
import CelandarModal from "./CelandarModal";
import ListProvinceModal from "./ListProvinceModal";
import MemberModal from "./MemberModal";

export default function SearchComponent() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [celandarModalState, setCelandarModalState] = useState<boolean>(false);
    const [listProvinceModalState, setListProvinceModalState] = useState<boolean>(false);
    const [memberModalState, setMemberModalState] = useState<boolean>(false);
    const [valueSoNguoiLon, setValueSoNguoiLon] = useState<number>(2);
    const [valueSoTreEm, setValueSoTreEm] = useState<number>(0);
    const [valueSoPhong, setValueSoPhong] = useState<number>(1);
    const [valueNguoiLonTreEmPhong, setValueNguoiLonTreEmPhong] = useState<string>(
        valueSoNguoiLon + ' Người lớn' + valueSoTreEm + ' Trẻ em' + valueSoPhong + ' Phòng');
    const [listProvince, setListProvince] = useState<IProvince[]>([]);

    const currentDate = new Date();
    const [searchDate, setSearchDate] = useState<Date>(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
    const [searchProvinceComponent, setSearchProvinceComponent] = useState<IProvince>();
    // Trạng thái lưu giữ giá trị radio button dia danh được chọn
    useEffect(() => {
        setIsLoading(true);
        GetListProvinceDefault().then((response) => {
            if (response != false && response != undefined) {
                setListProvince(response);
                console.log('response_s1', response)
            }
        }).catch((error) => { console.log(error) })
            .finally(() => { setIsLoading(false) });
    }, []);

    const handleSearch = () => {

    }


    return (
        <>
            <View style={{
                marginTop: 5,
                width: '95%', margin: 'auto', padding: 5,
                borderStyle: 'solid', borderRadius: 10,
                backgroundColor: AppColor.Snow1,
                shadowColor: '#000',
                shadowOffset: {
                    width: 1,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
            }}>
                <View style={{
                    flex: 1, flexDirection: 'row', justifyContent: 'flex-start',
                    alignItems: 'center', marginTop: 2, marginBottom: 2,
                    borderColor: AppColor.Gray01, borderWidth: 1, borderRadius: 10
                }}>
                    <Location size="32" color="#FF8A65" />
                    <TextInput placeholder='Khách sạn gần tôi' style={{
                        borderRadius: 5,
                        backgroundColor: AppColor.Snow1, width: '90%', height: 45
                    }}
                        value={searchProvinceComponent != undefined ? searchProvinceComponent.DisplayName : ''}
                        onPress={() => { setListProvinceModalState(true) }} /></View>

                <View style={{
                    flex: 1, flexDirection: 'row', justifyContent: 'flex-start',
                    alignItems: 'center', borderColor: AppColor.Gray01, borderWidth: 1, borderRadius: 10
                }}>
                    <CalendarSearch size="32" color="#FF8A65" />
                    <TextInput placeholder='Khách sạn gần tôi' style={{
                        borderRadius: 5,
                        backgroundColor: AppColor.Snow1, width: '90%', height: 45
                    }}
                        value={searchDate.toLocaleDateString()}
                        onPress={() => { setCelandarModalState(true) }} /></View>

                <View style={{
                    flex: 1, flexDirection: 'row', justifyContent: 'flex-start',
                    alignItems: 'center', marginBottom: 2, marginTop: 2,
                    borderColor: AppColor.Gray01, borderWidth: 1, borderRadius: 10
                }}>
                    <UserTag size="32" color="#FF8A65" />
                    <TextInput placeholder='Khách sạn gần tôi' style={{
                        borderRadius: 5,
                        backgroundColor: AppColor.Snow1, width: '90%', height: 45
                    }}
                        onPress={() => setMemberModalState(true)}
                        value={valueNguoiLonTreEmPhong} /></View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity style={{
                        backgroundColor: 'orange',
                        padding: 10,
                        borderRadius: 5,
                        width: '100%',
                        marginTop: 5
                    }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                            onPress={() => { handleSearch() }}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CelandarModal searchDate={searchDate} setCelandarModalState={setCelandarModalState}
                celandarModalState={celandarModalState} setSearchDate={setSearchDate} />
            <ListProvinceModal listProvince={listProvince} listProvinceModalState={listProvinceModalState}
                setListProvinceModalState={setListProvinceModalState} searchProvince={searchProvinceComponent}
                setSearchProvince={setSearchProvinceComponent} />
            <MemberModal valueSoNguoiLon={valueSoNguoiLon} setValueSoNguoiLon={setValueSoNguoiLon}
                valueSoTreEm={valueSoTreEm}
                setValueSoTreEm={setValueSoTreEm} valueSoPhong={valueSoPhong}
                setValueSoPhong={setValueSoPhong} valueNguoiLonTreEmPhong={valueNguoiLonTreEmPhong}
                setValueNguoiLonTreEmPhong={setValueNguoiLonTreEmPhong}
                setMemberModalState={setMemberModalState} memberModalState={memberModalState} />
        </>

    );
}