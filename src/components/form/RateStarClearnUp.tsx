import { useState } from "react";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
interface IProps {
    // star: number;
    // color: string; //class name taillwing
    // size: string; //don vi px

    // rateClearnUp: number,
    // setRateClearnUp: (rateClearnUp: number) => void

    // rateConvenient: number,
    // setRateConvenient: (rateConvenient: number) => void,

    // rateService: number,
    // setRateService: (rateService: number) => void,

    rateClearnUp: number,
    setRateClearnUp: (rateClearnUp: number) => void,

    // typeRate: string rateClearnUp, setRateClearnUp, rateConvenient, setRateConvenient,
    // rateService, setRateService,
}
export default function RateClearnUp(props: IProps) {
    const { rateClearnUp, setRateClearnUp } = props;

    return (
        <View style={{ flexDirection: 'row', gap: 2 }}>
            <Icon name={rateClearnUp < 1 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateClearnUp(1) }} />
            <Icon name={rateClearnUp < 2 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateClearnUp(2) }} />
            <Icon name={rateClearnUp < 3 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateClearnUp(3) }} />
            <Icon name={rateClearnUp < 4 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateClearnUp(4) }} />
            <Icon name={rateClearnUp < 5 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateClearnUp(5) }} />
            {/* <Icon name={rateClearnUp < 6 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateClearnUp(6) }} />
            <Icon name={rateClearnUp < 7 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateClearnUp(7) }} />
            <Icon name={rateClearnUp < 8 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateClearnUp(8) }} />
            <Icon name={rateClearnUp < 9 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateClearnUp(9) }} />
            <Icon name={rateClearnUp < 10 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateClearnUp(10) }} /> */}
        </View>

    );
}