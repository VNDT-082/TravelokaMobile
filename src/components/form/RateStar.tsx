import { useState } from "react";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
    // star: number;
    // color: string; //class name taillwing
    // size: string; //don vi px

    // rateStar: number,
    // setRateStar: (rateStar: number) => void

    // rateConvenient: number,
    // setRateConvenient: (rateConvenient: number) => void,

    // rateService: number,
    // setRateService: (rateService: number) => void,

    rateStar: number,
    setRateStar: (rateStar: number) => void,

    // typeRate: string rateStar, setRateStar, rateConvenient, setRateConvenient,
    // rateService, setRateService,
}
export default function RateStar(props: IProps) {
    const { rateStar, setRateStar } = props;

    return (
        <View style={{ flexDirection: 'row', gap: 2 }}>
            <Icon name={rateStar < 1 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateStar(1) }} />
            <Icon name={rateStar < 2 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateStar(2) }} />
            <Icon name={rateStar < 3 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateStar(3) }} />
            <Icon name={rateStar < 4 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateStar(4) }} />
            <Icon name={rateStar < 5 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateStar(5) }} />
            <Icon name={rateStar < 6 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateStar(6) }} />
            <Icon name={rateStar < 7 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateStar(7) }} />
            <Icon name={rateStar < 8 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateStar(8) }} />
            <Icon name={rateStar < 9 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateStar(9) }} />
            <Icon name={rateStar < 10 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateStar(10) }} />
        </View>

    );
}