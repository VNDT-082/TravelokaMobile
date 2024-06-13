import { Image, ScrollView, Text, View, useWindowDimensions } from "react-native";
import HeaderMenu from "../../components/HeaderMenu";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { AppColor } from "../../assets/AppColor";
import { Route, RouteProp, useRoute } from "@react-navigation/native";
import { ScreenProps } from "react-native-screens";
import { getTop10New } from "../../service/hotel.service";
import URL_Enum from "../../axios/URL_Enum";
import ToDoAVGFromArray from "../../service/ToDoAVGFromArray";
import { Location, Windows } from "iconsax-react-native";

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
    const route = useRoute<ScreenRouteProp>();
    const [listHotel, setListHotel] = useState<IHotel[]>([]);
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
                setListHotel(response)
            }).catch(err => { console.log(err) }).finally(() => { setIsLoading(false) })
        }
    }, []);

    const { height: windowHeight } = useWindowDimensions();
    const [isScrolledToTop, setIsScrolledToTop] = useState(true);

    const handleScroll = (event: { nativeEvent: NativeScrollEvent }) => {
        const { contentOffset } = event.nativeEvent;
        setIsScrolledToTop(contentOffset.y === 0);
    };

    useEffect(() => {
        if (isScrolledToTop) {
            console.log('Màn hình đang ở đầu trangcccc');
        } else {
            console.log('Màn hình không ở đầu trang');
        }
    }, [isScrolledToTop]);

    return (
        isLoading ? <View style={{
            width: '100%', height: '100%', flex: 1, justifyContent: 'center',
            alignItems: 'center', display: 'flex'
        }}><ActivityIndicator /></View> :
            <View style={{ flexDirection: 'column' }}>
                <HeaderMenu />
                <ScrollView style={{ marginTop: 100, marginBottom: 80 }} onScroll={(event) => { handleScroll(event) }}>
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
                    <View>
                        {valueTinh == null &&
                            valueSoDem == null &&
                            valueSoNguoiLon == null &&
                            valueSoTreEm == null &&
                            startDate == null &&
                            valueSoPhong == null &&
                            valueProvinceid == null ? <Text>Param all null</Text> : <Text>Param all not null</Text>}
                    </View>

                    <View style={{ padding: 10 }}>
                        {listHotel != undefined && listHotel != null ? listHotel.map((item, index) => (
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
                                    <ScrollView horizontal>
                                        {item.images.map(hitem => (
                                            <View style={{ width: 360, height: 220, borderTopLeftRadius: 5, borderTopRightRadius: 5, marginLeft: 10 }}>
                                                <Image style={{
                                                    width: '100%', height: 220, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                    , padding: 10
                                                }}
                                                    source={{
                                                        uri: URL_Enum.BaseURL_Image + hitem.FileName
                                                    }}
                                                    resizeMode="stretch"
                                                    key={hitem.id} />
                                                <Text>{URL_Enum.BaseURL_Image + hitem.FileName}</Text></View>
                                        ))}
                                    </ScrollView>
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
                                    <View style={{
                                        flexDirection: 'row', backgroundColor: AppColor.CyanLight, borderRadius: 12, padding: 5
                                        , width: 110, justifyContent: 'flex-start', alignItems: 'center'
                                    }}>
                                        <Image style={{
                                            width: 24, height: 24, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                            , padding: 10
                                        }}
                                            source={require('../../assets/icon/hotel_icon.webp')}
                                            resizeMode="stretch" />
                                        <Text>{item.Type}</Text>
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
                                            {item.convenients?.map(citem => (
                                                <View style={{
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


                                </View>
                            </View>
                        )) : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 100, height: 100, borderRadius: 5 }}
                                source={require('../../assets/loading.png')} />
                        </View>}
                    </View>
                </ScrollView>
            </View>
    )
}

export default TravelScreen;