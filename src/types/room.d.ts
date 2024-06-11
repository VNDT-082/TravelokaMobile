interface IRoom {
    id: string;
    TypeRoomId: string;
    State: boolean;
    TimeRecive: Date;
    TimeLeave: Date;
    Gift: string;
    Discount: number;
    Breakfast: boolean;
    Wifi: boolean;
    NoMoking: boolean;
    Cancel: boolean;
    ChangeTimeRecive: boolean;
    RoomName: string;
    Hinh_Thuc_Thanh_Toan: string;
    Bao_Gom_Thue_Va_Phi: string;
    created_at: string | null;
    updated_at: string | null;

    typeroom?: ITypeRoom;
}