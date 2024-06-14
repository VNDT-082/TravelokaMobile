import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { ScreenProps } from "react-native-screens";
import HeaderMenuTitlePage from "../../components/HeaderMenuTitlePage";

type ScreenDetailHotelProp = RouteProp<RootStackParamList, 'DetailHotel'>;
const DetailHotel: React.FC<ScreenProps> = () => {
    const route = useRoute<ScreenDetailHotelProp>();
    const { idHotel } = route.params;
    console.log('idHotel', idHotel)
    const [listHotel, setListHotel] = useState<IHotel[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <View>
            <HeaderMenuTitlePage title="Chi tiết khách sạn" />
        </View>
    )
}
export default DetailHotel;