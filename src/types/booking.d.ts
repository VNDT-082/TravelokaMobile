interface IBooking {
    id: string,
    GuestId: string,
    RoomId: string,
    ConfirmBy: string | null,
    CreateDate: Date,
    Price: number,
    Gift: string,
    Discount: number,
    State: boolean,
    Notes: string,
    TimeRecive: Date,
    TimeLeave: Date,
    ConfirmAt: Date | null,
    created_at: Date | null,
    updated_at: Date | null,
    GiftCode: string,
    GiftCodePrice: number,
    VAT: number,
    TypePay: string,

    members: IMemberBooking[],
    room: IRoom | null
}

interface IMemberBooking {
    id: string,
    BookHotelId: string,
    FullName: string,
    DateOfBirth: Date | null,
    Sex: boolean,
    created_at: Date | null,
    updated_at: Date | null

}