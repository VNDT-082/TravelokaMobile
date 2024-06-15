
import { View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
    // star: number;
    // color: string; //class name taillwing
    // size: string; //don vi px

    rateConvenient: number,
    setRateConvenient: (rateConvenient: number) => void,

    // typeRate: string rateStar, setRateStar, rateConvenient, setRateConvenient,
    // rateService, setRateConvenient,
}
export default function RateStarConvenient(props: IProps) {
    const { rateConvenient, setRateConvenient } = props;

    return (
        <View style={{ flexDirection: 'row', gap: 2 }}>
            <Icon name={rateConvenient < 1 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateConvenient(1) }} />
            <Icon name={rateConvenient < 2 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateConvenient(2) }} />
            <Icon name={rateConvenient < 3 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateConvenient(3) }} />
            <Icon name={rateConvenient < 4 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateConvenient(4) }} />
            <Icon name={rateConvenient < 5 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateConvenient(5) }} />
            {/* <Icon name={rateConvenient < 6 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateConvenient(6) }} />
        <Icon name={rateConvenient < 7 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateConvenient(7) }} />
        <Icon name={rateConvenient < 8 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateConvenient(8) }} />
        <Icon name={rateConvenient < 9 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateConvenient(9) }} />
        <Icon name={rateConvenient < 10 ? 'star-o' : 'star'} size={32} color="#FFCC00" onPress={() => { setRateConvenient(10) }} /> */}
        </View>
    );
}