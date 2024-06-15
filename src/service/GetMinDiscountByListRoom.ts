interface KeyValueRoomAndDiscount {
    //acturPrice: number;
    maxDiscount: number;
    // typeRoomId: string;
}
export default function GetMinDiscountByListRoom(arr: IRoom[]): KeyValueRoomAndDiscount {
    var maxDiscount: number = 0;
    arr.map(item => {
        if (maxDiscount < item.Discount) {
            maxDiscount = item.Discount;
        }
    });
    return { maxDiscount };
}