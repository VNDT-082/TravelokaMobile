import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AppColor } from '../assets/AppColor'
import Icon from 'react-native-vector-icons/FontAwesome';
import getLocalStorageItem from '../service/getLocalStorageItem';
import LocalStoreEnum from '../axios/LocalStoreEnum';
import FormatDate from '../service/FormatDateString';
import { FilterSearch } from 'iconsax-react-native';
import FillterBottomModal from './FillterBottomModal';
import SearchComponentModal from './SearchComponentModal';

interface IPops {
    arrConvenientSelected: ConvenienceIcon[];
    setArrConvenientSelected: (arrConvenientSelected: ConvenienceIcon[]) => void;
    arrStarSelected: number[];
    setArrStarSelected: (arrStarSelected: number[]) => void;
    priceDistance: number;
    setpriceDistance: (priceDistance: number) => void;
    listHotel: IHotel[];
    setListHotel: (listHotel: IHotel[]) => void;
    listHotelShort: IHotel[];
    setListHotelShort: (listHotelShort: IHotel[]) => void;
}
const HeaderMenu = (props: IPops) => {
    const {
        arrConvenientSelected, setArrConvenientSelected,
        arrStarSelected, setArrStarSelected,
        priceDistance, setpriceDistance,
        listHotel, setListHotel,
        listHotelShort, setListHotelShort
    } = props
    const [fillterBottomModalState, setFillterBottomModalState] = useState<boolean>(false);
    const [searchComponentModalState, setSearchComponentModalState] = useState<boolean>(false);

    const [maxPriceSearch, setMaxPriceSearch] = useState<number>(0);
    const [showFillterStar, setShowFillterStar] = useState<boolean>(true);
    const [showFillterConvenient, setShowFillterConvenient] = useState<boolean>(true);
    const [showFillterHotelCate, setShowFillterHotelCate] = useState<boolean>(true);
    const [listHotelSearch, setListHotelSearch] = useState<IHotel[]>([]);
    const [typeHotelSelected, setTypeHotelSelected] = useState<string>('Tất cả');

    let provinceNameSearch = getLocalStorageItem(LocalStoreEnum.CURRENT_PROVINCE_NAME_SEARCH);
    let provinceIdSearch = getLocalStorageItem(LocalStoreEnum.CURRENT_PROVINCE_ID_SEARCH);
    let totalRoomSearch = getLocalStorageItem(LocalStoreEnum.TOTAL_ROOM);
    let startDateSearch = getLocalStorageItem(LocalStoreEnum.START_DATE);
    let totalDateSearch = getLocalStorageItem(LocalStoreEnum.TOTAL_DAY);
    const [startDateSearchString, setStartDateSearchString] = useState<string>('');
    const [totalRoomSearchString, setTotalRoomSearchString] = useState<number>(1);
    const [totalDateSearchString, setTotalDateSearchString] = useState<number>(1);
    const [provinceNameSearchString, setProvinceNameSearchString] = useState<string>('');
    if (provinceNameSearch != null) {
        provinceNameSearch.then(value => {
            setProvinceNameSearchString(value != null ? value : 'Vị trí của bạn');
        })
    }
    if (totalRoomSearch != null) {
        totalRoomSearch.then(value => {
            setTotalRoomSearchString(value != null ? Number.parseInt(value) : 1);
        })
    }

    if (startDateSearch != null) {
        startDateSearch.then(value => {
            if (value != null) {
                setStartDateSearchString(value);
            }
            else {
                let currentDate = new Date();
                let date = FormatDate(currentDate);
                setStartDateSearchString(date != null ? date.split(' ')[0] : '');
            }

        })
    }
    if (totalDateSearch != null) {
        totalDateSearch.then(value => {
            setTotalDateSearchString(value != null ? Number.parseInt(value) : 1);
        })
    }
    return (
        <View style={{
            flexDirection: 'column', height: 100, flex: 1, backgroundColor: AppColor.Blue1, width: '100%',
            maxHeight: 100, zIndex: 100, padding: 5, justifyContent: 'center', alignItems: 'center',
            marginBottom: 5, position: 'absolute',
        }}
            aria-disabled={listHotelShort == undefined && listHotelSearch == null ? true : false}>
            <View style={{
                height: 50, flexDirection: 'row', width: '100%',
                maxHeight: 50, zIndex: 100, padding: 5, justifyContent: 'center', alignItems: 'center',
                marginBottom: 5
            }}>
                <Icon name='angle-left' size={32} color="white" />
                <View style={{
                    width: '20%', flex: 5, flexDirection: 'row', height: 50, paddingLeft: 5,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <View style={{
                        flex: 4, flexDirection: 'column', height: 50, paddingLeft: 5,
                        justifyContent: 'center', alignItems: 'flex-start'
                    }}>
                        <Text style={{ color: AppColor.white }}>
                            {provinceNameSearchString}
                        </Text>
                        <Text style={{ color: AppColor.white }}>
                            {startDateSearchString},
                            {totalDateSearchString} đêm,
                            {totalRoomSearchString} phòng
                        </Text>
                    </View>

                    <Text style={{ flex: 1, fontSize: 15, fontWeight: 'semibold', color: 'white' }}
                        onPress={() => { setSearchComponentModalState(true) }}>Thay đổi</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', flex: 6, backgroundColor: AppColor.Blue1 }}>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                    <Icon name='sliders' size={32} color="white" style={{ marginLeft: 10, marginRight: 10 }}
                        onPress={() => setFillterBottomModalState(true)} />
                    <FilterSearch size="32" color={AppColor.white} style={{ marginLeft: 10, marginRight: 10 }} />
                </View>
                <View style={{ flex: 4 }}>
                    <ScrollView horizontal style={{ borderLeftColor: AppColor.white, borderLeftWidth: 2, paddingHorizontal: 5 }}>
                        <Text style={{
                            fontSize: 18, fontWeight: 'semibold', color: AppColor.white,
                            borderWidth: 1, borderColor: AppColor.white, borderRadius: 100, textAlign: 'center',
                            paddingHorizontal: 20, paddingVertical: 5
                        }}>{typeHotelSelected}</Text>
                        <Text style={{
                            fontSize: 18, fontWeight: 'semibold', color: AppColor.white,
                            borderWidth: 1, borderColor: AppColor.white, borderRadius: 100, textAlign: 'center',
                            paddingHorizontal: 20, paddingVertical: 5, marginHorizontal: 10
                        }}>{arrStarSelected != undefined && arrStarSelected[arrStarSelected.length - 1]}
                            <Icon name='star' size={18} color="#FFCC00" />
                        </Text>
                        {arrConvenientSelected != undefined && arrConvenientSelected.length > 0 ?
                            <Text style={{
                                fontSize: 18, fontWeight: 'semibold', color: AppColor.white,
                                borderWidth: 1, borderColor: AppColor.white, borderRadius: 100, textAlign: 'center',
                                paddingHorizontal: 20, paddingVertical: 5
                            }}>
                                {arrConvenientSelected[0].name + ' +' + arrConvenientSelected.length + 'tiện nghi khác'}
                            </Text> : null}
                    </ScrollView>
                </View>
            </View>

            <FillterBottomModal setFillterBottomModalState={setFillterBottomModalState}
                fillterBottomModalState={fillterBottomModalState}
                arrConvenientSelected={arrConvenientSelected} arrStarSelected={arrStarSelected}
                listHotel={listHotel} listHotelShort={listHotelShort} priceDistance={priceDistance}
                setArrConvenientSelected={setArrConvenientSelected} setArrStarSelected={setArrStarSelected}
                setListHotel={setListHotel} setListHotelShort={setListHotelShort} setpriceDistance={setpriceDistance}
                typeHotelSelected={typeHotelSelected} setTypeHotelSelected={setTypeHotelSelected} key={'FillterBottomModalHeader'} />
            <SearchComponentModal searchComponentModalState={searchComponentModalState}
                setSearchComponentModalState={setSearchComponentModalState} />
            {/* key={'SearchComponentModalHeader'} */}
        </View>

    )
}

export default HeaderMenu;