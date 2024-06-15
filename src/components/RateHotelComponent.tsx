import { useState } from "react";
import { View } from "react-native";
import FormRateHotel from "./form/FormRateHotel";

interface IProps {
    listRate?: IRate[];
    setListRate: (listRate: IRate[]) => void;
    avgRate: number;
    avgRateText: string;
    //targetElementRefTongQuan: React.RefObject<HTMLDivElement>;
    hotelId: string;
}
interface MucDoHaiLong {
    soLuong: number;
    tile: number;
    text: 'Kém' | 'Trung bình' | 'Hài lòng' | 'Rất tốt' | 'Tuyệt vời';
}
interface DichVu {
    soLuong: number; //dai dien cho muc do vd:1,2,3,4,5
    tile: number;
    text: 'Dịch vụ' | 'Thoải mái' | 'Sạch sẽ';
}
export default function RateHotelComponent(props: IProps) {
    const [rateStar, setRateStar] = useState<number>(0);
    const [rateConvenient, setRateConvenient] = useState<number>(0);
    const [rateService, setRateService] = useState<number>(0);
    const [rateClearnUp, setRateClearnUp] = useState<number>(0);


    const [modalImageRateState, setModalImageRateState] = useState<boolean>(false);
    const [filterRateExistImage, setFilterRateExistImage] = useState<boolean>(true);
    const { listRate, avgRate, avgRateText, hotelId, setListRate } = props;//targetElementRefTongQuan
    const [listRateTemp, setListRateTemp] = useState<IRate[]>(listRate ? listRate.slice(0, 3) : []);
    const [haiLong, setHaiLong] = useState<MucDoHaiLong[]>([]);
    const [dichVu, setDichVu] = useState<DichVu[]>([]);
    const arrFilterRate = ['Tất cả', 'Top 3', 'Gần đây nhất', 'Điểm (Từ cao đến thấp)', 'Điểm (từ thấp đến cao)']
    const [hienFilterRate, setHienFilterRate] = useState<string>('Top 3');
    const [dsFilterRateState, setDsFilterRateState] = useState<boolean>(false);//mac dinh an danh sach 
    const [listImageRateP, setListImageRateP] = useState<string[]>([]);
    const TinhMucDoDichVu = () => {
        var dvSachSe: DichVu = { soLuong: 0, tile: 0, text: 'Sạch sẽ' };
        var dvThoaiMai: DichVu = { soLuong: 0, tile: 0, text: 'Thoải mái' };
        var dvDichVu: DichVu = { soLuong: 0, tile: 0, text: 'Dịch vụ' };
        listRate?.map((item) => {
            dvSachSe.soLuong += item.Sach_Se;
            dvThoaiMai.soLuong += item.Thoai_Mai;
            dvDichVu.soLuong += item.Dich_Vu;
        });
        dvSachSe.tile = dvSachSe.soLuong / (listRate?.length || 1);
        dvThoaiMai.tile = dvThoaiMai.soLuong / (listRate?.length || 1);
        dvDichVu.tile = dvDichVu.soLuong / (listRate?.length || 1);
        dichVu.push(dvSachSe);
        dichVu.push(dvThoaiMai);
        dichVu.push(dvDichVu);
    }
    TinhMucDoDichVu();
    const TinhMucDoHaiLong = () => {
        var mucDoHaiLongKem: MucDoHaiLong = { soLuong: 0, tile: 0, text: 'Kém' };
        var mucDoHaiLongTB: MucDoHaiLong = { soLuong: 0, tile: 0, text: 'Trung bình' };
        var mucDoHaiLongHL: MucDoHaiLong = { soLuong: 0, tile: 0, text: 'Hài lòng' };
        var mucDoHaiLongRT: MucDoHaiLong = { soLuong: 0, tile: 0, text: 'Rất tốt' };
        var mucDoHaiLongTV: MucDoHaiLong = { soLuong: 0, tile: 0, text: 'Tuyệt vời' };
        listRate?.map((item) => {
            if (item.Rating < 5) {
                mucDoHaiLongKem.soLuong += 1;
            }
            else if (item.Rating < 7) {
                mucDoHaiLongTB.soLuong += 1;
            }
            else if (item.Rating < 8) {
                mucDoHaiLongHL.soLuong += 1;
            }
            else if (item.Rating < 9) {
                mucDoHaiLongRT.soLuong += 1;
            }
            else {
                mucDoHaiLongTV.soLuong += 1;
            }
        });
        mucDoHaiLongKem.tile = Number((mucDoHaiLongKem.soLuong / (listRate?.length || 1)).toFixed(1)) * 100;
        mucDoHaiLongTB.tile = Number((mucDoHaiLongTB.soLuong / (listRate?.length || 1)).toFixed(1)) * 100;
        mucDoHaiLongHL.tile = Number((mucDoHaiLongHL.soLuong / (listRate?.length || 1)).toFixed(1)) * 100;
        mucDoHaiLongRT.tile = Number((mucDoHaiLongRT.soLuong / (listRate?.length || 1)).toFixed(1)) * 100;
        mucDoHaiLongTV.tile = Number((mucDoHaiLongTV.soLuong / (listRate?.length || 1)).toFixed(1)) * 100;
        haiLong.push(mucDoHaiLongKem);
        haiLong.push(mucDoHaiLongTB);
        haiLong.push(mucDoHaiLongHL);
        haiLong.push(mucDoHaiLongRT);
        haiLong.push(mucDoHaiLongTV);
    }
    TinhMucDoHaiLong();

    const handleClickFilterRate = (filter: string, existImage: boolean) => {
        if (listRate != undefined) {
            if (filter == 'Gần đây nhất') {
                setListRateTemp(
                    existImage ? listRate.filter((item) => {
                        return item.HinhAnh != null;
                    }).sort((a, b) => {
                        const dateA = new Date(a.created_at);
                        const dateB = new Date(b.created_at);
                        return dateB.getTime() - dateA.getTime();
                    })
                        : listRate.sort((a, b) => {
                            const dateA = new Date(a.created_at);
                            const dateB = new Date(b.created_at);
                            return dateB.getTime() - dateA.getTime();
                        })
                );
            }
            else if (filter == 'Điểm (Từ cao đến thấp)') {
                existImage ? setListRateTemp(
                    listRate.filter((item) => {
                        return item.HinhAnh != null;
                    }).sort((a, b) => b.Rating - a.Rating)
                )
                    : setListRateTemp(
                        listRate.sort((a, b) => b.Rating - a.Rating)
                    );
            }
            else if (filter == 'Điểm (từ thấp đến cao)') {
                setListRateTemp(
                    existImage ? listRate.filter((item) => {
                        return item.HinhAnh != null;
                    }).sort((a, b) => a.Rating - b.Rating)
                        : listRate.sort((a, b) => a.Rating - b.Rating)
                );

            }
            else if (filter == 'Tất cả') {
                setListRateTemp(listRate ? listRate : []);
            }
            else {
                setListRateTemp(
                    existImage ? listRate : listRate.filter((item) => {
                        return item.HinhAnh != null;
                    }));
            }
        }

    }
    return (
        <View>
            <FormRateHotel rateStar={rateStar} setRateStar={setRateStar}
                rateConvenient={rateConvenient} setRateConvenient={setRateConvenient}
                rateService={rateService} setRateService={setRateService}
                rateClearnUp={rateClearnUp} setRateClearnUp={setRateClearnUp}
                hotelId={`${hotelId}`} listRate={listRate}
                setListRate={setListRate} setListRateTemp={setListRateTemp} />
        </View>
    )
}