import { Path, Svg } from "react-native-svg";

interface IPops {
    width: string;
    height: string;
}
export default function IconFloorArea(props: IPops) {
    const { height, width } = props;
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none"
            data-id="IcHotelRoomMeasure">
            <Path d="M12 21H7L21 7V21H18M12 21V20M12 21H15M15 21V20M15 21H18M18 21V20M15 17H17V15" stroke="#0194F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></Path>
            <Path d="M8 8L9 9M8 8L5 11M8 8L11 5M5 11L6 12M5 11L2 14L5 17L17 5L14 2L11 5M11 5L12 6" stroke="#03121A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></Path>
        </Svg>
    )
}