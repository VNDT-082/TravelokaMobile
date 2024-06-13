import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderMenu from '../../components/HeaderMenu';
import { AppColor } from '../../assets/AppColor';
import URL_Enum from '../../axios/URL_Enum';
import { TextInput } from 'react-native-paper';
import { CalendarSearch, Location, UserTag } from 'iconsax-react-native';
import CelandarModal from '../../components/CelandarModal';
import { GetListProvinceDefault } from '../../service/province.service';
import ListProvinceModal from '../../components/ListProvinceModal';
import MemberModal from '../../components/MemberModal';
import Star from '../../components/Star';
import ToDoAVGFromArray from '../../service/ToDoAVGFromArray';
import GetMinDiscountByListTyperoom from '../../service/GetMinDiscountByListTyperoom';
import { getAllHaveGitCode } from '../../service/poster.service';
import Clipboard from '@react-native-clipboard/clipboard';
import NotifyModal from '../../components/NotifyModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import OverView from '../../components/OverView';
import SearchComponent from '../../components/SearchComponent';
import LocalStoreEnum from '../../axios/LocalStoreEnum';
import getLocalStorageItem from '../../service/getLocalStorageItem';
import setLocalStorageItem from '../../service/setLocalStorageItem';


const HomeScreen = () => {
    const [notifyValue, setNotifyValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listProvince, setListProvince] = useState<IProvince[]>([]);
    const [onImageErr, setOnImageErr] = useState<boolean>(false);
    const [provinceCurrentSelected, setProvinceCurrentSelected] = useState<string | undefined>();

    const [selectedProvinceOption, setSelectedProvinceOption] = useState<string>('');
    const [listPoster, setListPoster] = useState<IPoster[]>([]);
    const [notifyModalState, setNotifyModalState] = useState<boolean>(false);
    let provinceSearch = getLocalStorageItem(LocalStoreEnum.CURRENT_PROVINCE_SEARCH);
    if (provinceSearch != null) {
        console.log('provinceSearch', provinceSearch)
    }
    useEffect(() => {
        setIsLoading(true);
        getAllHaveGitCode().then((response) => {
            if (response != false && response != undefined) {
                setListPoster(response);
                setSelectedProvinceOption(response[0].id);
                setProvinceCurrentSelected(response[0].id);
            }
        }).catch((error) => { console.log(error) })
            .finally(() => { setIsLoading(false) });
    }, []);

    // Trạng thái lưu giữ giá trị radio button dia danh được chọn
    useEffect(() => {
        setIsLoading(true);
        GetListProvinceDefault().then((response) => {
            if (response != false && response != undefined) {
                console.log('response_s0', response)
                setListProvince(response);
                setSelectedProvinceOption(response[0].id);
                setProvinceCurrentSelected(response[0].id);

                if (provinceSearch == null) {
                    let value = JSON.stringify(listProvince[0])
                    setLocalStorageItem(LocalStoreEnum.CURRENT_PROVINCE_SEARCH, value);
                }
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
                        <SearchComponent />

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
                                <View style={{ flexDirection: 'row', width: '100%', marginBottom: 10 }}>
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
                                <View style={{
                                    flexDirection: 'row', width: '100%', backgroundColor: AppColor.Snow1,
                                    marginBottom: 10
                                }}>
                                    {listProvince != undefined ? listProvince.filter((fitem) => {
                                        return fitem.id == selectedProvinceOption
                                    }).map((item) => (
                                        item.hotels?.map((hitem) => (
                                            <TouchableOpacity style={{ marginLeft: 10 }}
                                                onPress={() => {
                                                }}>
                                                <View style={{
                                                    width: 200, position: 'relative',
                                                    shadowColor: '#000',
                                                    shadowOffset: {
                                                        width: 1,
                                                        height: 2,
                                                    },
                                                    shadowOpacity: 0.23,
                                                    shadowRadius: 2.62,
                                                    elevation: 4,
                                                    borderRadius: 10,
                                                    backgroundColor: AppColor.Snow1,
                                                    marginLeft: 10
                                                }}
                                                    key={hitem.id}>
                                                    <View style={{ position: 'relative' }}>
                                                        <Image style={{ width: '100%', height: 140, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                                                            source={{ uri: URL_Enum.BaseURL_Image + hitem.images[0].FileName }}
                                                        />
                                                        <Text style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            backgroundColor: AppColor.Blue1,
                                                            color: 'white',
                                                            fontWeight: 'semibold',
                                                            borderBottomRightRadius: 5,
                                                            borderTopLeftRadius: 5,
                                                            paddingLeft: 5,
                                                            paddingBottom: 5,
                                                            paddingTop: 5,
                                                            paddingRight: 5
                                                        }}>{hitem.Address.split(',')[hitem.Address.split(',').length - 2]}</Text>
                                                        {hitem.type_rooms != undefined ? GetMinDiscountByListTyperoom(hitem.type_rooms).maxDiscount > 0 ?
                                                            <View style={{
                                                                position: 'absolute',
                                                                bottom: 0,
                                                                right: 0,
                                                                paddingLeft: 15,
                                                                paddingBottom: 0,
                                                                paddingTop: 1,
                                                                paddingRight: 0,
                                                                justifyContent: 'center',
                                                                alignItems: 'flex-end'
                                                            }} >
                                                                <Image
                                                                    resizeMode="cover"
                                                                    style={{ width: 140, height: 30 }}
                                                                    source={require('../../assets/home/labelbg01.png')}
                                                                />
                                                                <Text style={{
                                                                    position: 'absolute',
                                                                    fontWeight: 'semibold',
                                                                    color: 'white',
                                                                    textAlign: 'center',
                                                                    paddingEnd: 10
                                                                }}>Tiết kiệm {GetMinDiscountByListTyperoom(hitem.type_rooms).maxDiscount.toFixed(0)}%</Text>
                                                            </View>
                                                            : null : null
                                                        }
                                                    </View>

                                                    <View style={{ backgroundColor: AppColor.Snow1, padding: 5 }}>
                                                        <Star size={18} star={hitem.StarRate} />
                                                        <Text style={{ height: 45 }}>{hitem.Name.length > 50 ? hitem.Name.slice(0, 48) + '...' : hitem.Name}</Text>
                                                        {hitem.rates != undefined ?
                                                            <Text> {ToDoAVGFromArray(hitem.rates)}</Text> : null}
                                                        {hitem.type_rooms != undefined ? GetMinDiscountByListTyperoom(hitem.type_rooms).maxDiscount > 0 ?
                                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                                                <Text style={{
                                                                    color: AppColor.Gray31,
                                                                    fontSize: 10,
                                                                    textDecorationLine: 'line-through',
                                                                    marginRight: 5
                                                                }}>{hitem.type_rooms[0].Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                                                <Text
                                                                    style={{ color: 'red', fontWeight: 'semibold', }}>
                                                                    {(GetMinDiscountByListTyperoom(hitem.type_rooms).acturPrice - GetMinDiscountByListTyperoom(hitem.type_rooms).acturPrice * GetMinDiscountByListTyperoom(hitem.type_rooms).maxDiscount / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </Text>
                                                            </View> :
                                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                                                <Text
                                                                    style={{ color: 'red', fontWeight: 'semibold', }}>
                                                                    {hitem.type_rooms[0].Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </Text>
                                                            </View>
                                                            : null}
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        ))

                                    )) : null}
                                </View>
                            </ScrollView>
                        </View>

                        <View>
                            <Text style={{
                                fontSize: 20, fontWeight: 'bold', color: AppColor.TextLight
                                , marginLeft: 5
                            }}>Mã giảm giá</Text>
                            <ScrollView horizontal={true} style={{ padding: 10 }}>
                                {listPoster.map(item => (
                                    <TouchableOpacity style={{ marginLeft: 10 }}
                                        onPress={() => {

                                        }}>
                                        <View style={{
                                            justifyContent: 'center', alignItems: 'center', backgroundColor: 'white',
                                            shadowColor: '#000',
                                            shadowOffset: {
                                                width: 1,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.23,
                                            shadowRadius: 2.62,
                                            elevation: 4,
                                            borderRadius: 10,
                                        }}>
                                            <Image style={{ width: 220, height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                                source={{ uri: URL_Enum.BaseURL_Poster + item.FileName }}
                                                resizeMode='stretch'
                                            />
                                            <Text onPress={() => {
                                                Clipboard.setString(item.GiftCode);
                                                setNotifyValue('Vừa sao chép mà giảm giảm giá: ' + item.GiftCode)
                                                setNotifyModalState(true)
                                            }}
                                                style={{
                                                    justifyContent: 'center', alignItems: 'center'
                                                }}>Code: {item.GiftCode}
                                                <Icon name='copy' size={12} color={AppColor.Gray31} />
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View>
                            <Text style={{
                                fontSize: 20, fontWeight: 'bold', color: AppColor.TextLight
                                , marginLeft: 5
                            }}>Lý do bạn nên chọn chúng tôi</Text>
                            <ScrollView horizontal={true}>
                                <TouchableOpacity style={{ marginLeft: 10 }}
                                    onPress={() => {
                                    }}>
                                    <View >
                                        <Image
                                            resizeMode="cover"
                                            style={{ width: 120, height: 90, borderRadius: 10 }}
                                            source={require('../../assets/policy/DeDangDoiLich.jpg')}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: 10 }}
                                    onPress={() => {
                                    }}>
                                    <Image
                                        resizeMode="cover"
                                        style={{ width: 120, height: 90, borderRadius: 10 }}
                                        source={require('../../assets/policy/HoTro24Tren7.jpg')}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: 10 }}
                                    onPress={() => {
                                    }}>
                                    <Image
                                        resizeMode="cover"
                                        style={{ width: 120, height: 90, borderRadius: 10 }}
                                        source={require('../../assets/policy/MienHuyPhong.jpg')}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: 10 }}
                                    onPress={() => {
                                    }}>
                                    <Image
                                        resizeMode="cover"
                                        style={{ width: 120, height: 90, borderRadius: 10 }}
                                        source={require('../../assets/policy/ReviewChanThuc.jpg')}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: 10 }}
                                    onPress={() => {
                                    }}>
                                    <Image
                                        resizeMode="cover"
                                        style={{ width: 120, height: 90, borderRadius: 10 }}
                                        source={require('../../assets/policy/ThanhToanTaiKhachSan.jpg')}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: 10 }}
                                    onPress={() => {
                                    }}>
                                    <Image
                                        resizeMode="cover"
                                        style={{ width: 120, height: 90, borderRadius: 10 }}
                                        source={require('../../assets/policy/TichXuTraveloka.jpg')}
                                    />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        <OverView />

                        <View style={{ height: 90 }}></View>
                    </ScrollView>


                </View>
                <View>
                    <NotifyModal notifyModalState={notifyModalState} setNotifyModalState={setNotifyModalState} notifyValue={notifyValue} />
                </View>

            </>

    )
}

export default HomeScreen;