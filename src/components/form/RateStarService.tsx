import { useState } from "react";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
    // star: number;
    // color: string; //class name taillwing
    // size: string; //don vi px

    rateService: number,
    setRateService: (rateService: number) => void,
}
export default function RateStarService(props: IProps) {
    const { rateService, setRateService } = props;

    return (
        <View style={{ flexDirection: 'row', gap: 2 }}>
            <Icon name={rateService < 1 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateService(1) }} />
            <Icon name={rateService < 2 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateService(2) }} />
            <Icon name={rateService < 3 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateService(3) }} />
            <Icon name={rateService < 4 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateService(4) }} />
            <Icon name={rateService < 5 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateService(5) }} />
            {/* <Icon name={rateService < 6 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateService(6) }} />
            <Icon name={rateService < 7 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateService(7) }} />
            <Icon name={rateService < 8 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateService(8) }} />
            <Icon name={rateService < 9 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateService(9) }} />
            <Icon name={rateService < 10 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateService(10) }} /> */}
        </View>
    );
}