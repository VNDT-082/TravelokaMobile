import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderMenu from '../../components/HeaderMenu';
import { AppColor } from '../../assets/AppColor';
import axios from 'axios';

const TravelScreen = () => {
    const [listProvince, setListProvince] = useState<IProvince[]>([]);
    useEffect(() => {
        const fetchProvince = (url: string) => {
            axios.get(url).then((response) => {
                setListProvince(response.result.data);
                console.log('listProvince', response);
            }).catch((error) => {
                console.log(error);
            }).finally();
        }
        fetchProvince('http://127.0.0.1:8000/api/province/get-page?page=1');
    }, []);
    console.log('listProvince', listProvince);
    return (
        <View style={{ backgroundColor: AppColor.Snow1, height: '100%' }}>
            <HeaderMenu />
            <ScrollView>
                <View>
                    {/* {listProvince.map((item) => (
                        <Text style={{ color: AppColor.TextLight }}>{item.DisplayName}</Text>))} */}
                    <Text style={{ color: AppColor.TextLight }}>aaaaa</Text>
                </View>
                <View>

                </View>
            </ScrollView>

        </View>

    )
}

export default TravelScreen;