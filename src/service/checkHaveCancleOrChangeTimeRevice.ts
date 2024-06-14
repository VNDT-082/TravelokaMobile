import HinhThucThanhToan_Enum from "../axios/HinhThucThanhToan";

interface KeyValueCheckHaveCanle {
    haveCancle: boolean;
    haveChangeTimeRevice: boolean;
    roomID: string;
    roomName: string;
    typeRoomName: string;
    typePay: string;
    nonePolicy: boolean;
}
export default function checkHaveCancleOrChangeTimeRevice(arr: ITypeRoom[]): KeyValueCheckHaveCanle {
    let haveCancle = false;
    let haveChangeTimeRevice = false;
    let roomID = '';
    let roomName = '';
    let typeRoomName = '';
    let typePay = HinhThucThanhToan_Enum.ThanhToanOnline;
    let nonePolicy = false;
    arr.map(item => {
        if (item.room != undefined) {
            item.room.map(fitem => {
                if (fitem.State == false && fitem.Cancel == true && fitem.ChangeTimeRecive == true) {
                    haveCancle = true;
                    haveChangeTimeRevice = true;
                    roomID = fitem.id;
                    roomName = fitem.RoomName != undefined && fitem.RoomName != null ? fitem.RoomName : '';
                    typeRoomName = item.Name;
                    typePay = fitem.Hinh_Thuc_Thanh_Toan ? HinhThucThanhToan_Enum.ThanhToanOnline : HinhThucThanhToan_Enum.ThanhToanTrucTiep;
                    nonePolicy = true;
                    return { haveCancle, haveChangeTimeRevice, roomID, roomName, typeRoomName, typePay, nonePolicy };
                } else if (fitem.State == false && (fitem.Cancel == true || fitem.ChangeTimeRecive == true)) {
                    haveCancle = fitem.Cancel;
                    haveChangeTimeRevice = fitem.ChangeTimeRecive;
                    roomID = fitem.id;
                    roomName = fitem.RoomName != undefined && fitem.RoomName != null ? fitem.RoomName : '';
                    typeRoomName = item.Name;
                    nonePolicy = true;
                }
                typePay = fitem.Hinh_Thuc_Thanh_Toan ? HinhThucThanhToan_Enum.ThanhToanOnline : HinhThucThanhToan_Enum.ThanhToanTrucTiep;
            });
        }

    });
    return { haveCancle, haveChangeTimeRevice, roomID, roomName, typeRoomName, typePay, nonePolicy };
}