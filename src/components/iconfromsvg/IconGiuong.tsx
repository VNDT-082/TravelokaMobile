import { G, Path, Svg } from "react-native-Svg";

interface IPops {
    width: string;
    height: string;
}
export default function IconGiuong(props: IPops) {
    const { height, width } = props
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none"
            data-id="IcHotelRoomMeasure"><G fill="none" fill-rule="evenodd"><rect width="24" height="24"></rect>
                <Path stroke="#03121A" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2,21 L13,21 L13,19.5 C13,16.4624339 10.5375661,14 7.5,14 L7.5,14 C4.46243388,14 2,16.4624339 2,19.5 L2,21 Z M7,4 L8,4 C9.65685425,4 11,5.34314575 11,7 L11,8.5 C11,10.4329966 9.43299662,12 7.5,12 L7.5,12 C5.56700338,12 4,10.4329966 4,8.5 L4,7 C4,5.34314575 5.34314575,4 7,4 Z"></Path>
                <Path stroke="#0194F3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16,19 L22,19 L22,18 C22,14.4624339 19.5581561,12 17,12 C15.6264236,12 14.7600111,12.2294943 14,13 M16,2 L16.3162278,2.9486833 C16.7245699,4.17370972 17.8709864,5 19.1622777,5 L21,5"></Path>
                <Path stroke="#0194F3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16,2 L17,2 C18.6568542,2 20,3.34314575 20,5 L20,6.5 C20,8.43299662 18.4329966,10 16.5,10 L16.5,10 C14.5670034,10 13,8.43299662 13,6.5 L13,5 C13,3.34314575 14.3431458,2 16,2 Z"></Path></G>
        </Svg>
    )
}