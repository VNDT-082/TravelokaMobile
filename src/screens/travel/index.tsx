import { Image, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import HeaderMenu from "../../components/HeaderMenu";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { AppColor } from "../../assets/AppColor";
import { Route, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScreenProps } from "react-native-screens";
import { getTop10New } from "../../service/hotel.service";
import URL_Enum from "../../axios/URL_Enum";
import ToDoAVGFromArray from "../../service/ToDoAVGFromArray";
import { DiscountShape, Location } from "iconsax-react-native";
import GetMinDiscountByListTyperoom from "../../service/GetMinDiscountByListTyperoom";
import Star from "../../components/Star";
import checkHaveCancleOrChangeTimeRevice from "../../service/checkHaveCancleOrChangeTimeRevice";
import HinhThucThanhToan_Enum from "../../axios/HinhThucThanhToan";

interface NativeScrollEvent {
    contentOffset: {
        x: number;
        y: number;
    };
    contentSize: {
        height: number;
        width: number;
    };
    layoutMeasurement: {
        height: number;
        width: number;
    };
    zoomScale: number;
}


type ScreenRouteProp = RouteProp<RootStackParamList, 'TravelScreen'>;
const TravelScreen: React.FC<ScreenProps> = () => {
    const navigation = useNavigation();
    const route = useRoute<ScreenRouteProp>();
    const [listHotel, setListHotel] = useState<IHotel[]>([]);
    const [listHotelShort, setListHotelShort] = useState<IHotel[]>(listHotel);
    const {
        valueTinh,
        valueSoDem,
        valueSoNguoiLon,
        valueSoTreEm,
        startDate,
        valueSoPhong,
        valueProvinceid, } = route.params
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        if (valueTinh == null &&
            valueSoDem == null &&
            valueSoNguoiLon == null &&
            valueSoTreEm == null &&
            startDate == null &&
            valueSoPhong == null &&
            valueProvinceid == null) {
            setIsLoading(true);
            getTop10New().then((response) => {
                console.log('resonse__', response);
                if (response != false) {
                    setListHotel(response);
                    setListHotelShort(response);
                }

            }).catch(err => { console.log(err) }).finally(() => {
                setIsLoading(false);
            })
        }
    }, []);

    // const { height: windowHeight } = useWindowDimensions();
    // const [isScrolledToTop, setIsScrolledToTop] = useState(true);

    // const handleScroll = (event: { nativeEvent: NativeScrollEvent }) => {
    //     const { contentOffset } = event.nativeEvent;
    //     setIsScrolledToTop(contentOffset.y === 0);
    // };
    const [arrConvenientSelected, setArrConvenientSelected] = useState<ConvenienceIcon[]>([]);
    const [arrStarSelected, setArrStarSelected] = useState<number[]>([1]);
    const [priceDistance, setpriceDistance] = useState<number>(50000000);
    const [listHotelSearch, setListHotelSearch] = useState<IHotel[]>([]);

    // useEffect(() => {
    //     if (isScrolledToTop) {
    //         console.log('Màn hình đang ở đầu trang');
    //     } else {
    //         console.log('Màn hình không ở đầu trang');
    //     }
    // }, [isScrolledToTop]);
    const handleClickHotel = (id: string) => {
        //navigation.navigate('Login')
        navigation.navigate('DetailHotel', { idHotel: id })
    }

    return (
        isLoading ? <View style={{
            width: '100%', height: '100%', flex: 1, justifyContent: 'center',
            alignItems: 'center', display: 'flex'
        }}><ActivityIndicator /></View> :
            listHotelShort ?
                <View style={{ flexDirection: 'column' }}>
                    <HeaderMenu arrConvenientSelected={arrConvenientSelected} arrStarSelected={arrStarSelected}
                        listHotel={listHotel} listHotelShort={listHotelShort} priceDistance={priceDistance}
                        setArrConvenientSelected={setArrConvenientSelected} setArrStarSelected={setArrStarSelected}
                        setListHotel={setListHotel} setListHotelShort={setListHotelShort} setpriceDistance={setpriceDistance}
                        key={'HeaderMenu'} />

                    {/* onScroll={(event) => { handleScroll(event) }} */}
                    <ScrollView style={{ marginTop: 100, marginBottom: 80 }} >
                        <View style={{ backgroundColor: AppColor.Blue1 }}>
                            <View style={{
                                flexDirection: 'row', backgroundColor: AppColor.BlueDark,
                                borderTopEndRadius: 20, borderTopStartRadius: 20,
                                padding: 15
                            }}>
                                <Image style={{ width: 40, height: 40, borderRadius: 5 }}
                                    source={require('../../assets/icon/spin.webp')} />
                                <Text style={{
                                    fontSize: 15, fontWeight: 'semibold', color: AppColor.white
                                    , paddingRight: 30
                                }}>Yên tâm đặt phòng với giá trung thực trên app Finder - Giá bạn thấy
                                    là giá cuối cùng, không phí ẩn.
                                </Text>
                            </View>
                        </View>

                        {/* Khach san */}
                        <View style={{ padding: 10 }}>
                            {(listHotelShort != undefined && listHotelShort != null && listHotelShort.length > 0)
                                ? listHotelShort.map((item, index) => (
                                    <TouchableOpacity onPress={() => { handleClickHotel(item.id) }}
                                        key={item.id}>
                                        <View style={{
                                            width: '100%', position: 'relative',
                                            shadowColor: '#000',
                                            shadowOffset: {
                                                width: 1,
                                                height: 2,
                                            },
                                            elevation: 4,
                                            shadowOpacity: 0.23,
                                            shadowRadius: 2.62,
                                            borderRadius: 10,
                                            backgroundColor: AppColor.Snow1,
                                            padding: 10, marginVertical: 10,
                                        }}>
                                            <View>
                                                <View>
                                                    <ScrollView horizontal>
                                                        {item.images.map((hitem, hindex) => (
                                                            <View key={hindex} style={{ width: 360, height: 220, borderTopLeftRadius: 5, borderTopRightRadius: 5, marginLeft: 10 }}>
                                                                <Image style={{
                                                                    width: '100%', height: 220, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                    , padding: 10
                                                                }}
                                                                    source={{
                                                                        uri: URL_Enum.BaseURL_Image + (hitem?.FileName != null ? hitem?.FileName : 'error-img.png')
                                                                    }}
                                                                    resizeMode="stretch"
                                                                    key={hindex} />
                                                            </View>
                                                        ))}
                                                    </ScrollView>
                                                    {item.type_rooms != undefined ? GetMinDiscountByListTyperoom(item.type_rooms).maxDiscount > 0 ?
                                                        <Image style={{
                                                            width: 50, height: 50, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                            , padding: 10, position: 'absolute', left: 0, top: -5
                                                        }}
                                                            source={require('../../assets/icon/bestprice.png')}
                                                            resizeMode="stretch" /> : null : null}
                                                </View>
                                                <View style={{ flex: 7, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                                                    <Text style={{ flex: 4, fontSize: 18, color: AppColor.Gray31, padding: 10 }}>{item.Name}</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image style={{
                                                            width: 24, height: 24, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                            , padding: 10
                                                        }}
                                                            source={require('../../assets/icon/5285ed4483dbe0a200497d4c3de31128.webp')}
                                                            resizeMode="stretch" />
                                                        {item.rates != undefined && item.rates != null ?
                                                            <Text style={{ fontSize: 18, color: AppColor.Gray31, padding: 10 }}>{ToDoAVGFromArray(item.rates)}/10</Text>
                                                            : null}
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                                    <View style={{
                                                        flexDirection: 'row', backgroundColor: AppColor.CyanLight, borderRadius: 12, padding: 5
                                                        , justifyContent: 'flex-start', alignItems: 'center',
                                                    }}>
                                                        <Image style={{
                                                            width: 24, height: 24, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                            , padding: 10
                                                        }}
                                                            source={require('../../assets/icon/hotel_icon.webp')}
                                                            resizeMode="stretch" />
                                                        <Text>{item.Type != 'Khác' ? item.Type : ''}</Text>
                                                    </View>
                                                    <Star size={18} star={item.StarRate} />
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row', borderRadius: 12, padding: 10
                                                    , justifyContent: 'flex-start', alignItems: 'flex-start'
                                                }}>
                                                    <Location size="18" color={AppColor.Gray31} />
                                                    <Text>{item.Address}</Text>
                                                </View>
                                                <View style={{
                                                    padding: 10, borderBottomColor: AppColor.Gray01,
                                                    borderBottomWidth: 1.5, borderStyle: 'dotted'
                                                }}>
                                                    <ScrollView horizontal >
                                                        {item.convenients?.map((citem, cindex) => (
                                                            <View key={citem.id} style={{
                                                                borderRadius: 100, paddingVertical: 2, paddingHorizontal: 5,
                                                                marginRight: 5
                                                            }}><Text style={{
                                                                backgroundColor: AppColor.Gray01, color: AppColor.Gray31,
                                                                borderRadius: 100, paddingVertical: 2, paddingHorizontal: 5,
                                                                marginRight: 5
                                                            }}>{citem.Title}</Text></View>
                                                        ))}
                                                    </ScrollView>

                                                </View>
                                                {item.type_rooms != undefined ? checkHaveCancleOrChangeTimeRevice(item.type_rooms).nonePolicy ?
                                                    <View>
                                                        {checkHaveCancleOrChangeTimeRevice(item.type_rooms).typePay == HinhThucThanhToan_Enum.ThanhToanTrucTiep ?
                                                            <Text style={{ color: AppColor.Green31 }}>Có {HinhThucThanhToan_Enum.ThanhToanTrucTiep}</Text> : null}
                                                        {checkHaveCancleOrChangeTimeRevice(item.type_rooms).haveCancle ? <Text style={{ color: AppColor.Green31 }}>Có thể hủy phòng</Text> : null}
                                                        {checkHaveCancleOrChangeTimeRevice(item.type_rooms).haveChangeTimeRevice ? <Text style={{ color: AppColor.Green31 }}>Có thể đổi lịch</Text> : null}
                                                    </View> : null : null}

                                                <View style={{ backgroundColor: AppColor.Snow1, padding: 5 }}>
                                                    {item.type_rooms != undefined ? GetMinDiscountByListTyperoom(item.type_rooms).maxDiscount > 0 ?
                                                        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                                                <DiscountShape size="32" color="#FF8A65" />
                                                                <Text style={{
                                                                    fontSize: 18, fontWeight: 'semibold',
                                                                    color: '#FF8A65'
                                                                }}>giảm {GetMinDiscountByListTyperoom(item.type_rooms).maxDiscount}%</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                                                <Text style={{
                                                                    color: AppColor.Gray31,
                                                                    fontSize: 10,
                                                                    textDecorationLine: 'line-through',
                                                                    marginRight: 5
                                                                }}>{item.type_rooms[0].Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                                                <Text
                                                                    style={{ color: 'red', fontWeight: 'semibold', }}>
                                                                    {(GetMinDiscountByListTyperoom(item.type_rooms).acturPrice - GetMinDiscountByListTyperoom(item.type_rooms).acturPrice * GetMinDiscountByListTyperoom(item.type_rooms).maxDiscount / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </Text>
                                                            </View>

                                                        </View> :
                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                                            <Text
                                                                style={{ color: 'red', fontWeight: 'semibold', }}>
                                                                {item.type_rooms[0].Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </Text>
                                                        </View>
                                                        : null}
                                                </View>


                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )) : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ width: 100, height: 100, borderRadius: 5 }}
                                        source={require('../../assets/loading.png')} />
                                </View>}
                        </View>
                    </ScrollView>
                </View>
                : null
    )
}

export default TravelScreen;