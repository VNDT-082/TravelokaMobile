import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ScreenProps } from "react-native-screens";
import HeaderMenuTitlePage from "../../components/HeaderMenuTitlePage";
import { getOneHotelByID } from "../../service/hotel.service";
import ErrorModal from "../../components/ErrorModal";
import { AppColor } from "../../assets/AppColor";
import { ArrowUp2, Clock, Location, Warning2 } from "iconsax-react-native";
import URL_Enum from "../../axios/URL_Enum";
import Star from "../../components/Star";
import Icon from 'react-native-vector-icons/FontAwesome';
import { getListDiaDiemLanCanByHotelID } from "../../service/diadiemlancan.service";
import DescrionAndPolicyModal from "../../components/DescrionAndPolicyModal";
import ListImageModal from "../../components/ListImageModal";
import { Path, Svg } from "react-native-svg";
import IconFloorArea from "../../components/iconfromsvg/IconFloorArea";
import IconGiuong from "../../components/iconfromsvg/IconGiuong";

type ScreenDetailHotelProp = RouteProp<RootStackParamList, 'DetailHotel'>;
const DetailHotel: React.FC<ScreenProps> = () => {
    const route = useRoute<ScreenDetailHotelProp>();
    const arrTilte: string[] = ['TongQuan', 'Phong', 'ViTri', 'TienIch', 'ChinhSach', 'DanhGia'];
    const arrTypeLocation: string[] = ['DiaDiemLanCan', 'DiaDiemPhoBien'];
    const [typeLocationState, setTypeLocationState] = useState<'DiaDiemLanCan' | 'DiaDiemPhoBien'>('DiaDiemLanCan');
    const [titleState, setTitleState] = useState<'TongQuan' | 'Phong' | 'ViTri' | 'TienIch' | 'ChinhSach' | 'DanhGia'>('TongQuan');
    const { idHotel } = route.params;
    console.log('idHotel', idHotel)
    const [hotel, setHotel] = useState<IHotel>();
    const [listDiaDiemLanCan, setListDiaDiemLanCan] = useState<IDiaDiemLanCan[]>([])
    const [errorModalState, setErrorModalState] = useState<boolean>(false);
    const [listImageModalState, setListImageModalState] = useState<boolean>(false);
    const [descrionAndPolicyModalState, setDescrionAndPolicyModalState] = useState<boolean>(false);
    const [listImage, setListImage] = useState<IHotelImage[]>([]);
    const arrTypeOpenState: string[] = ['MoTa', 'ChinhSach'];
    const [typeOpenState, setTypeOpenState] = useState<'MoTa' | 'ChinhSach'>('MoTa');
    const [errorDes, setErrorDes] = useState<string>('')
    const [typeNotify, setTypeNotify] = useState<'Error' | 'Sucsess' | 'Warning'>('Sucsess')

    const [isLoading, setIsLoading] = useState<boolean>(false);
    if (idHotel == undefined && idHotel == null) {

    }
    useEffect(() => {
        setIsLoading(true);
        getOneHotelByID(idHotel).then(response => {
            setHotel(response);
            setListImage(response.images);
        }).catch((err) => {
            setErrorDes('Lỗi kết nối');
            setTypeNotify('Error')
            setErrorModalState(true);
        }).finally(() => { setIsLoading(false) })
    }, [])
    useEffect(() => {
        setIsLoading(true);
        getListDiaDiemLanCanByHotelID(idHotel).then(response => {
            setListDiaDiemLanCan(response);
        }).catch((err) => {
            setErrorDes('Lỗi kết nối');
            setTypeNotify('Error')
            setErrorModalState(true);
        }).finally(() => { setIsLoading(false) })
    }, [])

    const handleChangTitle = (titel: 'TongQuan' | 'Phong' | 'ViTri' | 'TienIch' | 'ChinhSach' | 'DanhGia') => {
        setTitleState(titel);
    }
    const handleChangTypeLocation = (titel: 'DiaDiemLanCan' | 'DiaDiemPhoBien') => {
        setTypeLocationState(titel);
    }
    return (
        isLoading ? <View style={{
            width: '100%', height: '100%', flex: 1, justifyContent: 'center',
            alignItems: 'center', display: 'flex'
        }}><ActivityIndicator /></View> :
            <View style={{ flexDirection: 'column' }}>
                <HeaderMenuTitlePage title="Chi tiết khách sạn" />
                <View style={{
                    marginTop: 50,
                    width: Dimensions.get('window').width,
                    height: 50,
                    shadowColor: AppColor.Gray31,
                    shadowOffset: {
                        width: 1,
                        height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,

                }}>
                    <ScrollView horizontal style={{
                        height: 50,
                        shadowColor: AppColor.Gray31,
                        shadowOffset: {
                            width: 1,
                            height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                    }}>
                        <Text style={{
                            paddingTop: 10, marginHorizontal: 10, textAlign: 'center',
                            borderBottomColor: titleState == 'TongQuan' ? AppColor.Blue1 : 'transparent',
                            borderBottomWidth: titleState == 'TongQuan' ? 1 : 0,
                            fontWeight: titleState == 'TongQuan' ? 'bold' : 'normal',
                        }} onPress={() => { handleChangTitle('TongQuan') }}>Tổng quan</Text>

                        <Text style={{
                            paddingTop: 10, marginHorizontal: 10, textAlign: 'center',
                            borderBottomColor: titleState == 'Phong' ? AppColor.Blue1 : 'transparent',
                            borderBottomWidth: titleState == 'Phong' ? 1 : 0,
                            fontWeight: titleState == 'Phong' ? 'bold' : 'normal'
                        }} onPress={() => handleChangTitle('Phong')}>Phòng</Text>

                        <Text style={{
                            paddingTop: 10, marginHorizontal: 10, textAlign: 'center',
                            borderBottomColor: titleState == 'ViTri' ? AppColor.Blue1 : 'transparent',
                            borderBottomWidth: titleState == 'ViTri' ? 1 : 0,
                            fontWeight: titleState == 'ViTri' ? 'bold' : 'normal'
                        }} onPress={() => { handleChangTitle('ViTri') }}>Vị trí</Text>

                        <Text style={{
                            paddingTop: 10, marginHorizontal: 10, textAlign: 'center',
                            borderBottomColor: titleState == 'TienIch' ? AppColor.Blue1 : 'transparent',
                            borderBottomWidth: titleState == 'TienIch' ? 1 : 0,
                            fontWeight: titleState == 'TienIch' ? 'bold' : 'normal'
                        }} onPress={() => { handleChangTitle('TienIch') }}>Tiện ích</Text>

                        <Text style={{
                            paddingTop: 10, marginHorizontal: 10, textAlign: 'center',
                            borderBottomColor: titleState == 'ChinhSach' ? AppColor.Blue1 : 'transparent',
                            borderBottomWidth: titleState == 'ChinhSach' ? 1 : 0,
                            fontWeight: titleState == 'ChinhSach' ? 'bold' : 'normal'
                        }} onPress={() => { handleChangTitle('ChinhSach') }}>Chính sách</Text>

                        <Text style={{
                            paddingTop: 10, marginHorizontal: 10, textAlign: 'center',
                            borderBottomColor: titleState == 'DanhGia' ? AppColor.Blue1 : 'transparent',
                            borderBottomWidth: titleState == 'DanhGia' ? 1 : 0,
                            fontWeight: titleState == 'DanhGia' ? 'bold' : 'normal'
                        }} onPress={() => { handleChangTitle('DanhGia') }}>Đánh giá</Text>

                        <Text style={{
                            color: AppColor.Cyan, paddingTop: 7,
                            marginHorizontal: 10, textAlign: 'center',
                            borderBottomColor: AppColor.Cyan,
                            borderBottomWidth: 1,
                            fontWeight: 'bold', justifyContent: 'center', alignItems: 'center'
                        }}>Đầu trang
                            <ArrowUp2 size="18" color={AppColor.Cyan} /></Text>
                    </ScrollView>

                </View>
                <ScrollView>
                    <View>
                        {hotel?.images != undefined && hotel.images != null ?
                            <View style={{ width: '100%', backgroundColor: AppColor.Gray01 }}>
                                {hotel?.images.find((item) => { return item.TypeRoom == 'None;Ảnh bìa' }) != undefined ?
                                    <TouchableOpacity onPress={() => {
                                        setListImage(hotel.images);
                                        setListImageModalState(true);
                                    }}>
                                        <Image style={{ width: '100%', height: 220 }}
                                            source={{ uri: URL_Enum.BaseURL_Image + hotel?.images.find((item) => { return item.TypeRoom == 'None;Ảnh bìa' })?.FileName }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => {
                                        setListImage(hotel.images);
                                        setListImageModalState(true);
                                    }}>
                                        <Image source={{ uri: URL_Enum.BaseURL_Image + hotel?.images[0].FileName }} />
                                    </TouchableOpacity>

                                }
                                <ScrollView horizontal style={{ padding: 5, backgroundColor: AppColor.CyanLight }}>
                                    {hotel.images.filter((fitem) => { return fitem.TypeRoom != 'None;Ảnh bìa' })
                                        .map((item, index) => (
                                            <TouchableOpacity key={index} onPress={() => {
                                                setListImage(hotel.images);
                                                setListImageModalState(true);
                                            }}>
                                                <Image style={{ width: 120, height: 80, marginHorizontal: 2.5 }}
                                                    resizeMode="stretch"
                                                    source={{ uri: URL_Enum.BaseURL_Image + item.FileName }} />
                                            </TouchableOpacity>

                                        ))}
                                </ScrollView>
                            </View> : null}
                    </View>
                    {/* Tong quan */}
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 18, color: AppColor.Gray31 }}>{hotel?.Name}</Text>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <View style={{
                                flexDirection: 'row', backgroundColor: AppColor.CyanLight, borderRadius: 12, padding: 5
                                , justifyContent: 'flex-start', alignItems: 'center',
                            }}>
                                <Image style={{
                                    width: 24, height: 24, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                    , padding: 5
                                }}
                                    source={require('../../assets/icon/hotel_icon.webp')}
                                    resizeMode="stretch" />
                                <Text>{hotel?.Type != 'Khác' ? hotel?.Type : ''}</Text>
                            </View>
                            {hotel?.StarRate != undefined ? <Star size={18} star={hotel?.StarRate} /> : null}
                        </View>
                        <View style={{
                            flexDirection: 'row', borderRadius: 12, padding: 5
                            , justifyContent: 'flex-start', alignItems: 'center',
                        }}>
                            <Location size="18" color={AppColor.Gray31} />
                            <Text>{hotel?.Address}</Text>
                        </View>
                    </View>

                    {/* Vi tri */}
                    <View style={{ padding: 10, }}>
                        <Text style={{ fontSize: 18, color: AppColor.Gray31 }}>Vị trí</Text>
                        <Image style={{
                            width: Dimensions.get('window').width - 20, height: 120, padding: 10, borderRadius: 10
                        }}
                            source={require('../../assets/dang-ky-google-maps.png')}
                            resizeMode="cover" />
                        <View style={{
                            flexDirection: 'row', borderRadius: 12, padding: 5
                            , justifyContent: 'flex-start', alignItems: 'center',
                        }}>
                            <Location size="18" color={AppColor.Gray31} />
                            <Text>{hotel?.Address}</Text>
                        </View>
                        <Text>{hotel?.LocationDetail}</Text>

                        <View style={{ paddingVertical: 10, borderBottomColor: AppColor.Gray31, borderBottomWidth: 0.5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text style={{
                                    color: AppColor.Blue1, fontWeight: 'bold', textAlign: 'center',
                                    borderBottomColor: typeLocationState == 'DiaDiemLanCan' ? AppColor.Blue1 : 'transparent',
                                    borderBottomWidth: typeLocationState == 'DiaDiemLanCan' ? 1 : 0,
                                }} onPress={() => { setTypeLocationState('DiaDiemLanCan') }}>
                                    <Location size="18" color={AppColor.Blue1} variant="Bold" /> Địa điểm lân cận</Text>
                                <Text style={{
                                    color: AppColor.Blue1, fontWeight: 'bold',
                                    borderBottomColor: typeLocationState == 'DiaDiemPhoBien' ? AppColor.Blue1 : 'transparent',
                                    borderBottomWidth: typeLocationState == 'DiaDiemPhoBien' ? 1 : 0,
                                }} onPress={() => { setTypeLocationState('DiaDiemPhoBien') }}>
                                    <Icon name='star' size={18} color={AppColor.Blue1} /> Phổ biến trong khu vực</Text>
                            </View>
                            <View style={{ width: '100%', padding: 10 }}>
                                {listDiaDiemLanCan.filter((fitem) => {
                                    return typeLocationState == 'DiaDiemLanCan' ? fitem.IsPopular == false : fitem.IsPopular == true;
                                }).map((item, index) => (
                                    <View key={index} style={{ flex: 8, flexDirection: 'row', gap: 10, paddingVertical: 10 }}>
                                        <Image style={{
                                            width: 18, height: 18, padding: 10, borderRadius: 10,
                                        }}
                                            source={{ uri: URL_Enum.BaseURL_Image_Icon + item.ImageIcon }}
                                            resizeMode="cover" />
                                        <View style={{ flex: 5 }}>
                                            <Text>{item.Name}</Text>
                                            <Text style={{ fontSize: 12 }}>{item.Category}</Text>
                                        </View>
                                        <Text style={{ flex: 2, textAlign: "right" }}>{item.Distance}</Text>
                                    </View>

                                ))}</View>
                            <Text>Khoảng cách hiển thị dựa trên đường chim bay. Khoảng cách di chuyển thực tế có thể khác.</Text>
                        </View>
                    </View>

                    {/* Mo ta */}
                    <View style={{ padding: 10, }}>
                        <Text style={{ fontSize: 18, color: AppColor.Gray31 }}>Mô tả</Text>
                        <Text>{hotel?.Description.slice(0, 400)}...</Text>
                        <Text style={{
                            borderBottomColor: AppColor.Gray31, borderBottomWidth: 0.5,
                            fontSize: 16, fontWeight: 'bold', color: AppColor.Blue1, textAlign: 'center',
                            textDecorationColor: 'undefined'
                        }} onPress={() => {
                            setTypeOpenState("MoTa")
                            setDescrionAndPolicyModalState(true)
                        }}>Xem chi tiết</Text>
                    </View>

                    {/* Chinh sach luu tru */}
                    {hotel?.policies != undefined ?
                        <View style={{ padding: 10, borderBottomColor: AppColor.Gray31, borderBottomWidth: 0.5 }}>
                            <Text style={{ fontSize: 18, color: AppColor.Gray31 }}>Chính sách lưu trú</Text>

                            <View style={{
                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                padding: 10, backgroundColor: AppColor.Yellow01, margin: 5, borderRadius: 10
                            }}>
                                <Warning2 size="32" color="#FF8A65" variant="Broken" />
                                <Text style={{ width: '95%' }}>
                                    Vui lòng đảm bảo rằng bạn đã nắm rõ thời gian nhận phòng và trả phòng như sau.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Clock size="24" color={AppColor.Gray31} variant="Broken" />
                                <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>Giờ nhận phòng/ trả phòng</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Giờ nhận phòng</Text>
                                <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Từ {hotel?.TimeCheckIn}</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Giờ trả phòng</Text>
                                <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Trước {hotel?.TimeCheckOut}</Text>
                            </View>

                            {hotel?.policies.slice(0, 3).map((item, index) => (
                                <View key={index} style={{ marginVertical: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={{
                                            width: 18, height: 18, padding: 5, borderRadius: 10,
                                        }}
                                            source={{ uri: URL_Enum.BaseURL_Image_Icon + item.ImageIcon }}
                                            resizeMode="cover" />
                                        <Text style={{ fontSize: 18, fontWeight: "semibold", marginLeft: 10 }}>{item.Name}</Text>
                                    </View>
                                    <Text style={{ paddingLeft: 20, paddingRight: 5 }}>{item.Description}</Text>
                                </View>
                            ))}


                            <Text style={{
                                fontSize: 16, fontWeight: 'bold', color: AppColor.Blue1, textAlign: 'center',
                                textDecorationColor: 'undefined'
                            }} onPress={() => {
                                setTypeOpenState("ChinhSach")
                                setDescrionAndPolicyModalState(true)
                            }}>Xem chi tiết</Text>
                        </View>
                        : <Text>Chính sách của khách sạn không có sẵn</Text>}


                    {/* phong*/}
                    <View style={{ padding: 10 }}>
                        <View style={{
                            flex: 5, width: '100%', borderRadius: 10,
                            backgroundColor: AppColor.Blue1, flexDirection: 'row',
                            justifyContent: 'center', alignItems: 'center', padding: 10
                        }}>
                            <Image source={require('../../assets/icon/TagPolicy.webp')}
                                style={{ width: 24, height: 24 }} />
                            <Text style={{ flex: 4, color: AppColor.white, marginLeft: 10 }}>Phải đặt phòng trong thời điểm không chắc chắn này? Hãy chọn phòng có thể hủy miễn phí!</Text>
                        </View>
                        {hotel?.type_rooms != undefined ?
                            <View style={{ backgroundColor: AppColor.Gray01 }}>
                                {hotel.type_rooms.map((item, index) => (
                                    <View key={index} style={{
                                        backgroundColor: AppColor.white,
                                        padding: 10, marginVertical: 10,
                                        shadowColor: '#000',
                                        shadowOffset: {
                                            width: 1,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.23,
                                        shadowRadius: 2.62,
                                        elevation: 4,
                                        borderRadius: 10
                                    }}>
                                        <ScrollView horizontal>
                                            {hotel.images.filter(fitem => {
                                                return fitem.TypeRoom.split(';')[0] == item.id;
                                            }).map((item, hindex) => (
                                                <View style={{ width: Dimensions.get('window').width - 100, marginHorizontal: 5, borderRadius: 10 }} key={hindex}>
                                                    <Image style={{ width: '100%', height: 220, borderRadius: 10 }}
                                                        source={{ uri: URL_Enum.BaseURL_Image + item.FileName }} />
                                                </View>
                                            ))}
                                        </ScrollView>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Name}</Text>
                                        <ScrollView horizontal>
                                            <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <IconFloorArea height="24" width="24" />
                                                <Text style={{ fontSize: 16, }}>{item.FloorArea} m²</Text>
                                            </View>

                                            <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                    source={require('../../assets/icon/TreEmVaThuCung.webp')} />
                                                <Text style={{ fontSize: 16, }}>{item.MaxQuantityMember} người</Text>
                                            </View>

                                            <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                    source={require('../../assets/icon/giuong.webp')} />
                                                <Text style={{ fontSize: 16, }}>{item.SoLuongGiuong + ' ' + item.TenLoaiGiuong}</Text>
                                            </View>
                                            {item.Voi_Tam_Dung ? <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                    source={require('../../assets/icon/voisen.webp')} />
                                                <Text style={{ fontSize: 16, }}>Vòi tắm đứng</Text>
                                            </View> : null}

                                            {item.Ban_Cong_San_Hien ? <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                    source={require('../../assets/icon/bancong.webp')} />
                                                <Text style={{ fontSize: 16, }}>Ban công sân hiên</Text>
                                            </View> : null}


                                            {item.Khu_Vuc_Cho ? <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                    source={require('../../assets/icon/khuvucho.webp')} />
                                                <Text style={{ fontSize: 16, }}>Ban công sân hiên</Text>
                                            </View> : null}

                                            {item.May_Lanh ? <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                    source={require('../../assets/icon/maylanh.webp')} />
                                                <Text style={{ fontSize: 16, }}>Máy lạnh</Text>
                                            </View> : null}

                                            {item.Nuoc_Nong ? <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                    source={require('../../assets/icon/nuocnong.webp')} />
                                                <Text style={{ fontSize: 16, }}>Nước nóng</Text>
                                            </View> : null}


                                            {item.Bon_Tam ? <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                    source={require('../../assets/icon/bontam.webp')} />
                                                <Text style={{ fontSize: 16, }}>Bồn tắm</Text>
                                            </View> : null}

                                            {item.Lo_Vi_Song ? <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                    source={require('../../assets/icon/lovisong.webp')} />
                                                <Text style={{ fontSize: 16, }}>Lò vi sóng</Text>
                                            </View> : null}


                                            {item.Tu_Lanh ? <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                    source={require('../../assets/icon/TienNghiPhong.webp')} />
                                                <Text style={{ fontSize: 16, }}>Tủ lạnh</Text>
                                            </View> : null}


                                            {item.May_Giat ? <View style={{
                                                flexDirection: 'row', borderColor: AppColor.Blue1,
                                                borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                                                marginHorizontal: 5
                                            }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                    source={require('../../assets/icon/maygiat.webp')} />
                                                <Text style={{ fontSize: 16, }}>Máy giặt</Text>
                                            </View> : null}

                                        </ScrollView>
                                        <View style={{
                                            borderStyle: 'solid', borderRadius: 10,
                                            backgroundColor: AppColor.Snow1,
                                            width: '100%',
                                            shadowColor: AppColor.Gray31,
                                            shadowOffset: {
                                                width: 1,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.23,
                                            shadowRadius: 2.62,
                                            elevation: 4,
                                        }}>
                                            <View style={{
                                                backgroundColor: AppColor.CyanLight, paddingVertical: 10, paddingHorizontal: 5
                                                , marginTop: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10
                                            }}>
                                                <Text style={{ color: AppColor.Blue1, fontWeight: 'bold' }}>{item.Name} Room</Text></View>
                                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                                <View style={{ flex: 1 }}>
                                                    {item.No_Moking ? <View style={{
                                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                                        marginHorizontal: 5
                                                    }}>
                                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                            source={require('../../assets/icon/NoSmoke.webp')} />
                                                        <Text style={{ fontSize: 16, color: AppColor.Red }}>Không hút thuốc</Text>
                                                    </View> : <View style={{
                                                        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                                                        marginHorizontal: 5
                                                    }}>
                                                        <Image style={{ width: 24, height: 24, borderRadius: 10 }}
                                                            source={require('../../assets/icon/NoSmoke.webp')} />
                                                        <Text style={{ fontSize: 16, }}>Được hút thuốc</Text>
                                                    </View>}

                                                </View>
                                                <View style={{ flex: 1 }}></View>
                                            </View>
                                        </View>

                                    </View>
                                ))}
                            </View>
                            : null}

                    </View>
                    {/* phong*/}
                    <View style={{ marginBottom: 100 }}>
                    </View>

                </ScrollView>

                <View>
                    <ErrorModal errorDes={errorDes} errorModalState={errorModalState}
                        setErrorModalState={setErrorModalState} typeNotify={typeNotify} />
                    <DescrionAndPolicyModal descrionAndPolicyModalState={descrionAndPolicyModalState}
                        setDescrionAndPolicyModalState={setDescrionAndPolicyModalState}
                        description={hotel?.Description != undefined ? hotel.Description : ""}
                        setTypeOpenState={setTypeOpenState} typeOpenState={typeOpenState}
                        listPolicy={hotel?.policies} timeCheckin={hotel?.TimeCheckIn} timeCheckout={hotel?.TimeCheckOut} />
                    <ListImageModal listImage={listImage} listImageModalState={listImageModalState}
                        setListImageModalState={setListImageModalState} />
                </View>
            </View>
    )
}
export default DetailHotel;