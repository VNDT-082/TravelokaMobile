import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderMenu from '../../components/HeaderMenu';
import { AppColor } from '../../assets/AppColor';
import axios from 'axios';
import URL_Enum from '../../axios/URL_Enum';
import { TextInput } from 'react-native-paper';
import { CalendarSearch, Location, UserTag } from 'iconsax-react-native';
import CelandarModal from '../../components/CelandarModal';
import { GetListProvinceDefault } from '../../service/province.service';
import ListProvinceModal from '../../components/ListProvinceModal';
import MemberModal from '../../components/MemberModal';
import Star from '../../components/Star';

const HomeScreen = () => {
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
    const [onImageErr, setOnImageErr] = useState<boolean>(false);
    const currentDate = new Date();
    const [searchDate, setSearchDate] = useState<Date>(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
    const [searchProvince, setSearchProvince] = useState<IProvince>();
    const [provinceCurrentSelected, setProvinceCurrentSelected] = useState<string | undefined>();

    const [selectedProvinceOption, setSelectedProvinceOption] = useState<string>('');

    // Trạng thái lưu giữ giá trị radio button dia danh được chọn
    useEffect(() => {
        setIsLoading(true);
        GetListProvinceDefault().then((response) => {
            if (response != false && response != undefined) {
                setListProvince(response);
                setSelectedProvinceOption(response[0].id);
                setProvinceCurrentSelected(response[0].id);
            }
        }).catch((error) => { console.log(error) })
            .finally(() => { setIsLoading(false) });
    }, []);
    const handleProvinceOptionChange = (id_province: string): void => {
        setSelectedProvinceOption(id_province); // Cập nhật giá trị của radio button được chọn
    };

    return (
        isLoading ? <View style={{
            width: '100%', height: '100%', flex: 1, justifyContent: 'center',
            alignItems: 'center', display: 'flex'
        }}><ActivityIndicator /></View> :
            <>
                <View style={{ backgroundColor: AppColor.Snow1, height: '100%' }}>
                    <HeaderMenu />
                    <ScrollView style={{ marginTop: 50 }}>
                        <View style={{
                            marginTop: 5,
                            width: '95%', margin: 'auto', padding: 5, borderBlockColor: AppColor.Gray31, borderWidth: 1,
                            borderStyle: 'solid', borderRadius: 10,
                            backgroundColor: AppColor.Snow1, shadowColor: AppColor.Gray31, shadowOffset: { width: 4, height: 4 },
                            shadowOpacity: 0.5, shadowRadius: 5
                        }}>
                            <View style={{
                                flex: 1, flexDirection: 'row', justifyContent: 'flex-start',
                                alignItems: 'center', marginTop: 2, marginBottom: 2
                            }}>
                                <Location size="32" color="#FF8A65" />
                                <TextInput placeholder='Khách sạn gần tôi' style={{
                                    borderRadius: 5,
                                    backgroundColor: AppColor.Snow1, width: '90%', height: 45
                                }}
                                    value={searchProvince != undefined ? searchProvince.DisplayName : ''}
                                    onPress={() => { setListProvinceModalState(true) }} /></View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <CalendarSearch size="32" color="#FF8A65" />
                                <TextInput placeholder='Khách sạn gần tôi' style={{
                                    borderRadius: 5,
                                    backgroundColor: AppColor.Snow1, width: '90%', height: 45
                                }}
                                    value={searchDate.toLocaleDateString()}
                                    onPress={() => { setCelandarModalState(true) }} /></View>

                            <View style={{
                                flex: 1, flexDirection: 'row', justifyContent: 'flex-start',
                                alignItems: 'center', marginBottom: 2, marginTop: 2
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
                                    }}>Tìm kiếm</Text>
                                </TouchableOpacity>
                            </View></View>

                        {/* Khu vuc pho bien */}
                        <View style={{ marginBottom: 5, marginTop: 15 }}>
                            <Text style={{
                                fontSize: 20, fontWeight: 'bold', color: AppColor.TextLight
                                , marginLeft: 5
                            }}>Khu vực phổ biến rong nước</Text>
                            <ScrollView horizontal={true}>
                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    {listProvince != undefined ? listProvince.map((item, index) => (
                                        <View style={{ width: 200, padding: 5 }}>
                                            <Image style={{ width: '100%', height: 240, borderRadius: 5 }}
                                                source={{ uri: URL_Enum.BaseURL_ImageProvince + item.Image }}
                                                key={index} />
                                        </View>
                                    )) : null}
                                </View>
                            </ScrollView>
                        </View>

                        {/* khach san pho bien */}
                        <View style={{ marginBottom: 5, marginTop: 15 }}>
                            <Text style={{
                                fontSize: 20, fontWeight: 'bold', color: AppColor.TextLight
                                , marginLeft: 5
                            }}>Khách sạn trong nước</Text>
                            <ScrollView horizontal={true}>
                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    {listProvince != undefined ? listProvince.map((item, index) => (
                                        <TouchableOpacity style={{
                                            backgroundColor: provinceCurrentSelected == item.id ? AppColor.Blue1 : AppColor.Gray01,
                                            padding: 5,
                                            borderRadius: 5,
                                            marginLeft: 5,
                                            marginRight: 5
                                        }}
                                            onPress={() => {
                                                setProvinceCurrentSelected(item.id)
                                                handleProvinceOptionChange(item.id)
                                            }}
                                            key={index}>
                                            <Text style={{
                                                color: provinceCurrentSelected == item.id ? 'white' : AppColor.Blue1,
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                            }}>{item.DisplayName}</Text>
                                        </TouchableOpacity>
                                    )) : null}
                                </View>
                            </ScrollView>
                            <ScrollView horizontal={true}>
                                <View style={{ flexDirection: 'row', width: '100%', backgroundColor: AppColor.Snow1 }}>
                                    {listProvince != undefined ? listProvince.filter((fitem) => {
                                        return fitem.id == selectedProvinceOption
                                    }).map((item) => (
                                        item.hotels?.map((hitem) => (
                                            <View style={{
                                                width: 200, padding: 5, position: 'relative',
                                                shadowColor: '#000',
                                                shadowOffset: {
                                                    width: 1,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.23,
                                                shadowRadius: 2.62,
                                                elevation: 4,
                                            }}
                                                key={hitem.id}>
                                                <Image style={{ width: '100%', height: 140, borderRadius: 5 }}
                                                    source={{ uri: URL_Enum.BaseURL_Image + hitem.images[0].FileName }}
                                                />
                                                <View style={{ backgroundColor: AppColor.Blue1 }}>
                                                    <Text>{hitem.Name}</Text>
                                                    <Star size={18} star={hitem.StarRate} />
                                                </View>

                                            </View>
                                        ))

                                    )) : null}
                                </View>
                            </ScrollView>
                        </View>

                        <View>
                            <ScrollView>
                                <Text style={{
                                    fontSize: 20, fontWeight: 'bold', color: AppColor.TextLight
                                    , marginLeft: 5
                                }}>Lý do bạn nên chọn chúng tôi</Text>
                                {/* <ScrollView horizontal={true}>
                                        <View style={{ flexDirection: 'row', width: '100%' }}>
                                            <View style={{ width: 200, padding: 5, position: 'relative' }}>
                                                <Image style={{ width: '100%', height: 240, borderRadius: 5 }}
                                                    source={{ uri: require('../../assets/policy/TagPolicy.webp') }} />
                                            </View>
                                        </View>
                                    </ScrollView> */}
                            </ScrollView>
                        </View>


                        <View style={{ height: 90 }}></View>
                    </ScrollView>

                </View>
                <View>
                    <CelandarModal searchDate={searchDate} setCelandarModalState={setCelandarModalState}
                        celandarModalState={celandarModalState} setSearchDate={setSearchDate} />
                    <ListProvinceModal listProvince={listProvince} listProvinceModalState={listProvinceModalState}
                        setListProvinceModalState={setListProvinceModalState} searchProvince={searchProvince}
                        setSearchProvince={setSearchProvince} />
                    <MemberModal valueSoNguoiLon={valueSoNguoiLon} setValueSoNguoiLon={setValueSoNguoiLon}
                        valueSoTreEm={valueSoTreEm}
                        setValueSoTreEm={setValueSoTreEm} valueSoPhong={valueSoPhong}
                        setValueSoPhong={setValueSoPhong} valueNguoiLonTreEmPhong={valueNguoiLonTreEmPhong}
                        setValueNguoiLonTreEmPhong={setValueNguoiLonTreEmPhong}
                        setMemberModalState={setMemberModalState} memberModalState={memberModalState} />
                </View>

            </>

    )
}

export default HomeScreen;