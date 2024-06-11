interface ITypeRoom {
    id: string;
    HotelId?: string;
    Ban_Cong_San_Hien: number;
    Bon_Tam: number;
    ConvenientBathRoom: string;
    ConvenientRoom: string;
    FloorArea: number;
    Khu_Vuc_Cho: number;
    MaxQuantityMember: number;
    May_Lanh: number;
    Name: string;
    Nuoc_Nong: number;
    Price: number;
    Voi_Tam_Dung: number;
    TenLoaiGiuong: string;
    SoLuongGiuong: number;
    Lo_Vi_Song: number;
    Tu_Lanh: number;
    May_Giat: number;
    No_Moking: number;
    created_at: string | null;
    updated_at: string | null;

    hotel?: IHotel;
    room?: IRoom[];
}